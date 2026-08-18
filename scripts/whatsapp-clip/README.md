# WhatsApp Status clip generator

Two tools live here:

- **`make-clip.sh`** — a 30 s still-photo clip with a Ken Burns push-in. Simple,
  fast, no dependencies beyond ffmpeg.
- **`make-lyric-video.sh`** — a full-length music video: audio-reactive bar
  spectrum, beat-driven motion, and optional burned-in lyrics. Needs python3
  with numpy and pillow. See [Lyric video](#lyric-video) below.

Turns one portrait photo + one audio track into a 9:16 clip that WhatsApp
Status (and Instagram Reels / TikTok / YouTube Shorts) accepts as-is.

## Usage

```bash
scripts/whatsapp-clip/make-clip.sh <image> <audio> <output.mp4> [start_s] [duration_s]

# example: 30 seconds of the song starting at 0:48
scripts/whatsapp-clip/make-clip.sh photo.jpg song.mp3 status.mp4 48 30
```

`FFMPEG=/path/to/ffmpeg` overrides the binary if ffmpeg isn't on `PATH`.
A quick way to get one without touching the system packages:

```bash
pip install imageio-ffmpeg
export FFMPEG=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
```

## What it produces

| | |
|---|---|
| Resolution | 1080×1920 (9:16), 30 fps |
| Video | H.264 High @ level 4.0, yuv420p, CRF 23, `+faststart` |
| Audio | AAC-LC 128 kbps, 44.1 kHz stereo, normalised to −14 LUFS |
| Size | ≈ 5–6 MB for 30 s — well under WhatsApp's limits |

Look: the photo is upscaled to 2160×3840 and centre-cropped to 9:16, then a
Ken Burns push-in (1.00 → 1.12) runs off the supersampled copy so the motion
stays smooth instead of stair-stepping. A light contrast lift, a vignette and
fine temporal grain keep it from looking like a static JPEG; video fades in
over 1.2 s and out over 1.8 s, audio over 1.5 s / 2.5 s.

## Picking the excerpt

`start_s` is worth choosing rather than defaulting to 0. To find the loudest
(usually the most carried) stretch of a track:

```bash
ffmpeg -v error -i song.mp3 -ac 1 -ar 8000 -f s16le audio.raw -y
python3 - <<'PY'
import numpy as np
x = np.fromfile("audio.raw", dtype=np.int16).astype(np.float32) / 32768
sr, W = 8000, 30
db = np.array([20*np.log10(np.sqrt((x[i*sr:(i+1)*sr]**2).mean()) + 1e-9)
               for i in range(len(x)//sr)])
print("best %ds window starts at %ds" % (W, np.argmax([db[i:i+W].mean()
      for i in range(len(db)-W+1)])))
PY
```

## Tuning

- **Longer/shorter** — change `duration_s`. WhatsApp splits Status posts
  longer than 30 s into segments, so 30 is the safe maximum for one card.
- **Stronger or gentler motion** — `ZOOM_END` in the script (0.12 = 12 %).
  Above ~0.20 the push-in starts to feel restless.
- **Pull-back instead of push-in** — swap the zoom expression for
  `z='1.12-0.12*on/N'`.
- **Off-centre framing** — the `x`/`y` expressions in `zoompan` are centred;
  bias them (e.g. `y='ih/3-(ih/zoom/2)'`) to hold a face higher in frame.
- **No grain** — drop the `noise=` filter; it costs roughly 15 % of the file
  size because grain is expensive to compress.


## Lyric video

```bash
scripts/whatsapp-clip/make-lyric-video.sh <image> <audio> <out.mp4> [lyrics.txt|.lrc]
```

Runs in four stages, all from the audio itself:

1. **Analyse** (`analyze_audio.py`) — spectral-flux onset detection against a
   local median baseline, giving beat times and a tempo estimate, plus a
   per-frame RMS envelope.
2. **Overlays** — a bottom scrim for text legibility, and the spectrum strip
   from `spectrum.py`: 56 log-spaced bands (60 Hz–6 kHz), fast-attack /
   slow-release smoothing, gold gradient bars with rounded caps, falling
   peak-hold markers, a glow pass and a fading reflection. It writes rawvideo
   to stdout on a black field, because the strip is screen-blended over the
   video and `screen(x, black) == x` — so no alpha channel is needed.
3. **Lyrics** (`lyrics_to_ass.py`) — see below. Skipped if no file is given.
4. **Render** — Ken Burns with a beat-synced zoom pulse and brightness lift,
   highlight bloom, vignette, grain, fades.

### Why not ffmpeg's own visualisers

`showfreqs` maps linearly-spaced FFT bins across the width, so a sung vocal
piles into the left edge and the rest of the frame stays flat. `showcqt` spaces
by pitch but rendered far too dim here, and its brightness controls fight the
tint. Computing the bands directly is both easier to reason about and gives
control over bar shape, peak-hold and glow.

### Lyrics input

Either an `.lrc` with explicit timings, which are used as-is:

```
[00:32.30] first line
[00:39.20] second line
```

…or plain text, one line per displayed line, which gets auto-placed against
sung passages detected from the energy envelope. Auto-placement is a starting
point to nudge, not a finished timing — convert to `.lrc` once it's close.

Styling lives in the `HEAD` block of `lyrics_to_ass.py` (font, size, colours,
margin). Lines fade in with a slight scale-up so each one lands rather than
blinks.

### Gotchas worth knowing

- **Blend in RGB, not YUV.** `blend=all_mode=screen` runs per-plane, so on
  yuv420p it screens the chroma planes too — U/V are centred at 128, and
  `screen(128,128) ≈ 192`, which tints the whole frame magenta. The filter
  chain converts to `gbrp` before any blend and back to `yuv420p` at the end.
- **Don't trust container duration.** An MP3 sliced with `-c copy` keeps the
  original Xing header and reports the original length. The script derives
  duration from the decoded sample count instead.
- **Size.** Capped at ~1 Mbps video + 112 kbps audio, which lands a 2-minute
  clip near 14 MB — under WhatsApp's 16 MB send limit. Longer tracks need a
  lower `-maxrate`.
