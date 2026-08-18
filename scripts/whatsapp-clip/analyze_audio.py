#!/usr/bin/env python3
"""Extract beat onsets and a per-frame energy envelope from a track.

Writes <outdir>/beats.json and <outdir>/env<fps>.npy, which the renderer uses
to drive the beat pulse and the lyric auto-timing.

    analyze_audio.py <audio.raw|mono s16le> --sr 22050 --fps 30 --outdir DIR
"""
import argparse, json, os
import numpy as np

p = argparse.ArgumentParser()
p.add_argument("raw", help="mono s16le PCM (see make-lyric-video.sh for the decode)")
p.add_argument("--sr", type=int, default=22050)
p.add_argument("--fps", type=int, default=30)
p.add_argument("--outdir", default=".")
p.add_argument("--max-beats", type=int, default=90)
a = p.parse_args()

x = np.fromfile(a.raw, dtype=np.int16).astype(np.float32) / 32768
sr, hop, n_fft = a.sr, 256, 1024
w = np.hanning(n_fft).astype(np.float32)
frames = 1 + (len(x) - n_fft) // hop
S = np.empty((frames, n_fft // 2 + 1), np.float32)
for i in range(frames):
    S[i] = np.abs(np.fft.rfft(x[i * hop:i * hop + n_fft] * w))
S = np.log1p(S * 10)

# spectral flux, flattened against a local median so quiet passages still register
flux = np.concatenate([[0], np.maximum(0, np.diff(S, axis=0)).sum(1)])
pad = np.pad(flux, (40, 40), mode="edge")
base = np.array([np.median(pad[i:i + 81]) for i in range(len(flux))])
od = np.maximum(0, flux - base)
od /= od.max() + 1e-9
t = np.arange(len(od)) * hop / sr

peaks, minsep, i = [], int(0.28 * sr / hop), 1
while i < len(od) - 1:
    if od[i] > od[i - 1] and od[i] >= od[i + 1] and od[i] > 0.16:
        if not peaks or i - peaks[-1] >= minsep:
            peaks.append(i)
        elif od[i] > od[peaks[-1]]:
            peaks[-1] = i
    i += 1

pt, ps = t[peaks], od[peaks]
keep = np.sort(pt[np.argsort(-ps)[:a.max_beats]])
ioi = np.diff(pt); ioi = ioi[(ioi > 0.25) & (ioi < 1.2)]
bpm = 60 / np.median(ioi) if len(ioi) else 0

os.makedirs(a.outdir, exist_ok=True)
json.dump({"beats": [round(float(v), 3) for v in keep], "bpm": round(float(bpm), 1)},
          open(os.path.join(a.outdir, "beats.json"), "w"))

env = np.array([np.sqrt((x[int(f * sr / a.fps):int((f + 1) * sr / a.fps)] ** 2).mean() + 0.0)
                for f in range(int(len(x) / sr * a.fps))], np.float32)
env /= env.max() + 1e-9
np.save(os.path.join(a.outdir, "env%d.npy" % a.fps), env)
print("%d onsets kept, ~%.0f BPM, %d envelope frames" % (len(keep), bpm, len(env)))
