"""Generate lightweight video posters using imageio-ffmpeg (optional media tooling)."""
from pathlib import Path
import subprocess
import imageio_ffmpeg
root = Path(__file__).resolve().parents[1]
files = list((root/'public/assets/nails').glob('video-*.mp4')) + [root/'public/assets/studio/finished-tattoos.mp4']
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
for path in files:
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-ss', '0.2', '-i', str(path), '-frames:v', '1', '-vf', 'scale=640:-2', str(path.with_name(path.stem+'-poster.webp'))], check=True)
print(f'Created {len(files)} video posters')
