#!/usr/bin/env bash
# Full-length 9:16 lyric/visualiser video from one portrait photo + one track.
#
#   ./make-lyric-video.sh <image> <audio> <out.mp4> [lyrics.txt|lyrics.lrc]
#
# Needs ffmpeg (or FFMPEG=/path/to/ffmpeg) plus python3 with numpy and pillow.
# Work files land in a temp dir and are removed on exit.
set -euo pipefail

IMG=${1:?usage: make-lyric-video.sh <image> <audio> <out.mp4> [lyrics]}
AUD=${2:?missing audio}
OUT=${3:?missing output path}
LYR=${4:-}

FFMPEG=${FFMPEG:-ffmpeg}
HERE=$(cd "$(dirname "$0")" && pwd)
WORK=$(mktemp -d); trap 'rm -rf "$WORK"' EXIT
FPS=30 SR=22050 W=1080 H=1920

echo "[1/4] analysing audio"
"$FFMPEG" -v error -y -i "$AUD" -ac 1 -ar $SR -f s16le "$WORK/a.raw"

# Duration from the decoded sample count, not the container header: an MP3 cut
# with `-c copy` keeps the original Xing header and would report the wrong length.
DUR=$(python3 -c "import os;print('%.2f'%(os.path.getsize('$WORK/a.raw')/2/$SR))")
NF=$(python3 -c "print(int($DUR*$FPS))")
if [ "$NF" -lt 2 ]; then echo "audio too short or undecodable" >&2; exit 1; fi
echo "track ${DUR}s -> ${NF} frames"

python3 "$HERE/analyze_audio.py" "$WORK/a.raw" --sr $SR --fps $FPS --outdir "$WORK"

echo "[2/4] building overlays"
python3 - "$WORK" "$W" "$H" <<'PY'
import sys, numpy as np
from PIL import Image
work, W, H = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
y = np.arange(H)[:, None]
# darken the bottom for the bars and lyrics, and the very top so the frame reads as framed
a = np.clip((y - H * 0.53) / (H - H * 0.53), 0, 1) ** 1.55 * 0.90
a += np.clip((150 - y) / 150, 0, 1) ** 1.6 * 0.42
rgba = np.zeros((H, W, 4), np.uint8)
rgba[..., 3] = (np.clip(a, 0, 1) * 255).astype(np.uint8)
Image.fromarray(rgba, "RGBA").save(work + "/scrim.png")
PY

python3 "$HERE/spectrum.py" "$WORK/a.raw" $SR | \
  "$FFMPEG" -v error -y -f rawvideo -pix_fmt rgb24 -s 1080x520 -r $FPS -i - \
  -c:v libx264 -crf 15 -preset veryfast -pix_fmt yuv444p "$WORK/spectrum.mp4"

SUBF=""
if [ -n "$LYR" ]; then
  echo "[3/4] timing lyrics"
  python3 "$HERE/lyrics_to_ass.py" "$LYR" "$WORK/lyrics.ass" "$WORK/env$FPS.npy"
  SUBF=",subtitles='$WORK/lyrics.ass':fontsdir=/usr/share/fonts"
else
  echo "[3/4] no lyrics file given, skipping"
fi

# beat-driven expressions: a zoom pulse and a brightness lift on each onset
read -r Z FL < <(python3 - "$WORK" $FPS $NF <<'PY'
import json, sys
work, fps, nf = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
b = json.load(open(work + "/beats.json"))["beats"]
z = "1+0.115*on/%d+0.020*(%s)" % (
    nf - 1, "+".join(r"exp(-pow((on/%d-%.2f)*8.5\,2))" % (fps, t) for t in b))
fl = "0.015+0.020*(%s)" % "+".join(r"exp(-pow((t-%.2f)*13\,2))" % t for t in b)
print(z, fl)
PY
)

echo "[4/4] rendering"
"$FFMPEG" -v error -stats -stats_period 30 -y \
 -loop 1 -framerate $FPS -i "$IMG" -i "$AUD" \
 -loop 1 -framerate $FPS -i "$WORK/scrim.png" -i "$WORK/spectrum.mp4" \
 -filter_complex "\
[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,setsar=1[base];\
[base]zoompan=z='$Z':x='iw/2-(iw/zoom/2)+34*sin(on/$FPS*0.19)':y='ih/2-(ih/zoom/2)-26*sin(on/$FPS*0.13)':d=$NF:s=${W}x${H}:fps=$FPS[kb];\
[kb]eq=contrast=1.08:brightness='$FL':eval=frame,format=gbrp[graded];\
[graded]split=2[g1][g2];\
[g2]eq=brightness=-0.42:contrast=2.2,gblur=sigma=26[glow];\
[g1][glow]blend=all_mode=screen:all_opacity=0.30,format=gbrp[bloom];\
[bloom][2:v]overlay=0:0,format=gbrp[scrimmed];\
[3:v]format=gbrp,pad=${W}:${H}:0:1220:black[spec];\
[scrimmed][spec]blend=all_mode=screen[v1];\
[v1]drawbox=x=40:y=1560:w=1000:h=2:color=white@0.22:t=fill,\
vignette=angle=PI/4.6,noise=alls=2:allf=t+u,\
fade=t=in:st=0:d=1.4,fade=t=out:st=$(python3 -c "print(round($DUR-1.8,2))"):d=1.8${SUBF},format=yuv420p[v];\
[1:a]afade=t=in:st=0:d=1.6,afade=t=out:st=$(python3 -c "print(round($DUR-2.5,2))"):d=2.5,\
loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[a]" \
 -map "[v]" -map "[a]" -t "$DUR" -shortest \
 -c:v libx264 -preset medium -crf 24 -maxrate 1000k -bufsize 2000k \
 -profile:v high -level 4.0 -pix_fmt yuv420p -g 60 -r $FPS \
 -c:a aac -b:a 112k -ar 44100 -ac 2 -movflags +faststart \
 "$OUT"

ls -lh "$OUT"
