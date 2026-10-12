"""Extract the original Icons8 APNG into a sprite for state-controlled playback."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(root / 'public/icons/menu-animated.png')
sprite = Image.new('RGBA', (source.width * source.n_frames, source.height))
for index in range(source.n_frames):
    source.seek(index)
    sprite.paste(source.convert('RGBA'), (index * source.width, 0))
sprite.save(root / 'public/icons/menu-sprite.png', optimize=True)
