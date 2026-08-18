# WhatsApp Status clip generator

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
