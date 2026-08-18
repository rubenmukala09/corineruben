#!/usr/bin/env bash
# Build a 9:16 WhatsApp Status clip from one portrait photo + one audio track.
#
#   ./make-clip.sh <image> <audio> <output.mp4> [audio_start_seconds] [duration_seconds]
#
# Requires ffmpeg on PATH (or set FFMPEG=/path/to/ffmpeg).
# Output: 1080x1920, 30 fps, H.264 High/yuv420p + AAC 128k, faststart —
# the profile WhatsApp accepts without re-encoding the video into mush.

set -euo pipefail

IMG=${1:?usage: make-clip.sh <image> <audio> <output.mp4> [start] [duration]}
AUD=${2:?missing audio}
OUT=${3:?missing output path}
START=${4:-0}
DUR=${5:-30}

FFMPEG=${FFMPEG:-ffmpeg}
FPS=30
FRAMES=$(( DUR * FPS ))
ZOOM_END=0.12                      # Ken Burns push-in: 1.00 -> 1.12 over the clip
VFADE_OUT=$(python3 -c "print(max(0,$DUR-1.8))")
AFADE_OUT=$(python3 -c "print(max(0,$DUR-2.5))")

"$FFMPEG" -v error -stats -stats_period 10 -y \
  -loop 1 -framerate "$FPS" -i "$IMG" \
  -ss "$START" -t "$DUR" -i "$AUD" \
  -filter_complex "\
[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,setsar=1[base];\
[base]zoompan=z='1+${ZOOM_END}*on/$((FRAMES-1))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${FRAMES}:s=1080x1920:fps=${FPS}[kb];\
[kb]eq=contrast=1.07:brightness=0.012:saturation=1.0,\
vignette=angle=PI/4.6,\
noise=alls=4:allf=t+u,\
fade=t=in:st=0:d=1.2,fade=t=out:st=${VFADE_OUT}:d=1.8,format=yuv420p[v];\
[1:a]afade=t=in:st=0:d=1.5,afade=t=out:st=${AFADE_OUT}:d=2.5,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[a]" \
  -map "[v]" -map "[a]" \
  -c:v libx264 -preset medium -crf 23 -profile:v high -level 4.0 -pix_fmt yuv420p -g 60 -r "$FPS" \
  -c:a aac -b:a 128k -ar 44100 -ac 2 \
  -movflags +faststart -shortest \
  "$OUT"

ls -lh "$OUT"
