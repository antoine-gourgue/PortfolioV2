#!/usr/bin/env bash
# Re-encodes a render into the most compatible MP4 for uploads and the web:
# H.264 High@4.0, yuv420p, BT.709 limited range, AAC 48 kHz stereo, moov
# atom first. scripts/encode.sh out/Film.mp4 [out/Film-web.mp4]; CRF=24 for
# a lighter file to self-host.
set -euo pipefail
in=${1:?usage: encode.sh input.mp4 [output.mp4]}
out=${2:-${in%.mp4}-web.mp4}
crf=${CRF:-20}

ff=$(command -v ffmpeg || true)
if [ -z "$ff" ]; then
  # Remotion ships an ffmpeg with its compositor; it needs its own libs
  dir=$(ls -d "$(dirname "$0")"/../node_modules/@remotion/compositor-*/ 2>/dev/null | head -1)
  [ -n "$dir" ] || { echo "No ffmpeg found" >&2; exit 1; }
  export LD_LIBRARY_PATH="$dir${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
  ff="$dir/ffmpeg"
fi

"$ff" -loglevel error -y -i "$in" \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -crf "$crf" -preset slow \
  -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -movflags +faststart "$out"
ls -lh "$out"
