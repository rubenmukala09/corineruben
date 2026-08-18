"""Render an audio-reactive bar spectrum strip to stdout as rawvideo rgb24.

Black background on purpose: the strip is screen-blended over the video, and
screen(x, black) == x, so black costs nothing and we avoid an alpha channel.
"""
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter

RAW, SR, FPS = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 22050, 30
W, H = 1080, 520
BASE = 340                    # baseline y: bars grow up, reflection falls below
NB   = 56                     # bar count
FMIN, FMAX = 60.0, 6000.0
N_FFT = 2048
HOP = SR // FPS

x = np.fromfile(RAW, dtype=np.int16).astype(np.float32) / 32768
nframes = int(len(x) / SR * FPS)
win = np.hanning(N_FFT).astype(np.float32)
freqs = np.fft.rfftfreq(N_FFT, 1 / SR)

# log-spaced band edges -> index ranges into the rfft bins
edges = np.geomspace(FMIN, FMAX, NB + 1)
bands = []
for i in range(NB):
    lo, hi = np.searchsorted(freqs, edges[i]), np.searchsorted(freqs, edges[i + 1])
    bands.append((lo, max(hi, lo + 1)))

mag = np.zeros((nframes, NB), np.float32)
for f in range(nframes):
    s = f * HOP
    seg = x[s:s + N_FFT]
    if len(seg) < N_FFT:
        seg = np.pad(seg, (0, N_FFT - len(seg)))
    sp = np.abs(np.fft.rfft(seg * win))
    for i, (lo, hi) in enumerate(bands):
        mag[f, i] = sp[lo:hi].max()

db = 20 * np.log10(mag + 1e-6)
# tilt upward with frequency: highs are quieter, but should still read on screen
db += np.linspace(0, 16, NB)[None, :]
lo_db, hi_db = np.percentile(db, 12), np.percentile(db, 99.4)
lev = np.clip((db - lo_db) / (hi_db - lo_db), 0, 1) ** 0.92

# fast attack, slow release — how bars are expected to move
sm = np.zeros_like(lev); prev = np.zeros(NB, np.float32)
A, R = 0.62, 0.14
for f in range(nframes):
    tgt = lev[f]
    prev = np.where(tgt > prev, prev + (tgt - prev) * A, prev + (tgt - prev) * R)
    sm[f] = prev

BW, GAP = 13, int(round(W / NB)) - 13
X0 = (W - (NB * (BW + GAP) - GAP)) // 2
MAXH = 300

def bar_gradient(h):
    """Warm gold, brighter toward the tip."""
    g = Image.new("RGB", (1, h))
    d = ImageDraw.Draw(g)
    for y in range(h):
        t = y / max(h - 1, 1)                      # 0 = tip, 1 = base
        r = int(255 - 22 * t); gg = int(243 - 70 * t); b = int(208 - 130 * t)
        d.point((0, y), (r, gg, b))
    return g

GRAD = [bar_gradient(h) if h > 0 else None for h in range(MAXH + 1)]

peak = np.zeros(NB, np.float32)
out = sys.stdout.buffer
for f in range(nframes):
    img = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(img)
    v = sm[f]
    peak[:] = np.maximum(peak - 0.011, v)
    for i in range(NB):
        h = int(v[i] * MAXH)
        px = X0 + i * (BW + GAP)
        if h > 2:
            img.paste(GRAD[h].resize((BW, h)), (px, BASE - h))
            d.ellipse([px, BASE - h - BW // 2, px + BW - 1, BASE - h + BW // 2 - 1],
                      fill=(255, 246, 220))
        ph = int(peak[i] * MAXH)
        if ph > 4:
            d.rectangle([px, BASE - ph - 4, px + BW - 1, BASE - ph - 1], fill=(255, 252, 240))
    glow = img.filter(ImageFilter.GaussianBlur(11))
    img = Image.blend(img, Image.fromarray(
        np.maximum(np.asarray(img, np.int16), np.asarray(glow, np.int16) * 3 // 4
                   ).clip(0, 255).astype(np.uint8)), 1.0)
    # reflection: flip the bar region, dim it, fade it out downward
    ref = img.crop((0, BASE - 170, W, BASE)).transpose(Image.FLIP_TOP_BOTTOM)
    a = np.asarray(ref, np.float32) * (np.linspace(0.34, 0.0, 170)[:, None, None] ** 1.3)
    img.paste(Image.fromarray(a.astype(np.uint8)), (0, BASE + 2))
    out.write(img.tobytes())
    if f % 600 == 0:
        print("frame %d/%d" % (f, nframes), file=sys.stderr, flush=True)
print("done %d frames" % nframes, file=sys.stderr)
