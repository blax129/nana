"""Generate responsive WebP images and intrinsic dimensions (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps
import json
root = Path(__file__).resolve().parents[1]
assets = root / 'public/assets'
files = list((assets/'portfolio').glob('*.jpg')) + list((assets/'nails').glob('*.jpeg')) + list((assets/'inspirations').glob('*.jpeg')) + [assets/'nana-brand-portrait.jpeg']
manifest = {}
original_bytes = optimized_bytes = 0
for path in files:
    with Image.open(path) as source:
        image = ImageOps.exif_transpose(source).convert('RGB')
        manifest['/assets/'+str(path.relative_to(assets))] = {'width': image.width, 'height': image.height}
        for width in (640, 1080):
            copy = image.copy()
            copy.thumbnail((width, 2400))
            destination = assets/'optimized'/path.relative_to(assets).with_suffix('')
            destination = destination.with_name(destination.name+f'-{width}.webp')
            destination.parent.mkdir(parents=True, exist_ok=True)
            copy.save(destination, 'WEBP', quality=80, method=6)
            if width == 640: optimized_bytes += destination.stat().st_size
        original_bytes += path.stat().st_size
(root/'src/imageDimensions.json').write_text(json.dumps(manifest, indent=2)+'\n')
print(f'{len(files)} images: original {original_bytes:,} bytes; 640px versions {optimized_bytes:,} bytes')
