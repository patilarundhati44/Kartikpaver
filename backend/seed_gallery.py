import os
import django
from django.core.files.base import ContentFile

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kartik_paver.settings')
django.setup()

from api.models import Gallery

# We'll check both common Document locations
FOLDER_PATHS = [
    r"C:\Users\patil\Documents\p",
    r"C:\Users\patil\OneDrive\Documents\p",
    r"C:\Users\patil\OneDrive\Desktop\Bhya\p"
]

def run_seed():
    target_folder = None
    for path in FOLDER_PATHS:
        if os.path.exists(path):
            target_folder = path
            break
            
    if not target_folder:
        print("Could not find the 'p' folder. Make sure you created it in Documents or inside your project folder!")
        return
        
    print(f"Scanning folder: {target_folder}")

    added_count = 0
    for filename in os.listdir(target_folder):
        # We look for .jpg or .png images that are likely from the gallery
        # avoiding small icons or js downloads
        if filename.endswith('.jpg') or filename.endswith('.png') or filename.endswith('.jpeg'):
            filepath = os.path.join(target_folder, filename)
            
            # Skip very small files (< 10KB) to avoid icons/logos
            if os.path.getsize(filepath) < 10000:
                continue
                
            # Skip product images we might have already downloaded (often start with mtc)
            # though JustDial local save might have different names.
            # We will just add the 'kartik-paver-industries...' and other large images
            
            # Create a title from the filename
            title = filename.split('.')[0].replace('-', ' ').title()
            # Clean up the title a bit
            title = title.replace('Kartik Paver Industries Latur Midc Latur Paver Block Manufacturers ', 'Factory View ')
            if len(title) > 50:
                title = title[:50]
                
            print(f"Processing: {title} ({filename})")
            
            # Check if it already exists by title, if so, append a random string or let it pass
            base_title = title
            counter = 1
            while Gallery.objects.filter(title=title).exists():
                title = f"{base_title} ({counter})"
                counter += 1
                
            # Create gallery item
            gallery_item = Gallery(
                title=title,
                category="Projects" if "Paver Block" in title else "Factory",
                description="Imported from JustDial profile"
            )
            
            # Read and save the image
            with open(filepath, 'rb') as f:
                image_content = f.read()
                gallery_item.image.save(filename, ContentFile(image_content), save=False)
                
            gallery_item.save()
            added_count += 1
            print(f"Successfully added gallery image: '{title}'")

    print(f"\n--- Gallery Import Complete ---")
    print(f"Total new gallery images added: {added_count}")

if __name__ == '__main__':
    run_seed()
