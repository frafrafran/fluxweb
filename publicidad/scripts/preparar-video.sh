#!/usr/bin/env bash
# Prepara la toma original del iPhone para el reel.
#
# El iPhone graba en HDR (HLG, BT.2020, 10 bits) y en 4K. Remotion y las
# redes esperan SDR BT.709, así que acá se mapea el tono (Hable), se baja a
# 1080×1920 desde el 4K y se corrige el balance de blancos para que la pared
# quede en la crema de la marca (#f0e9d6) en vez de amarilla.
#
# Uso: bash scripts/preparar-video.sh "ruta/al/video.MOV"
set -euo pipefail

entrada="${1:?Pasá la ruta del video original}"
salida="$(dirname "$0")/../public/media/francisco.mp4"
mkdir -p "$(dirname "$salida")"

tono="zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p"
color="colorchannelmixer=rr=0.95:gg=1.0:bb=1.11,eq=gamma=1.15:saturation=0.93:contrast=1.03"

# El reel usa la toma hasta que la mano tapa la lente (~5,6 s): 6,1 s alcanzan.
ffmpeg -v error -y -i "$entrada" -t 6.1 -an \
  -vf "$tono,scale=1080:1920:flags=lanczos,$color,unsharp=5:5:0.3:5:5:0" \
  -c:v libx264 -preset slow -crf 10 -pix_fmt yuv420p -r 60 \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  "$salida"

echo "listo: $salida"
