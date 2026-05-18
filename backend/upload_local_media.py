import os
import sys
import django
from pathlib import Path

# Setup Django environment
sys.path.append(str(Path(__file__).resolve().parent))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kartik_paver.settings')
django.setup()

import cloudinary
import cloudinary.uploader
from django.conf import settings
from api.models import Product, Gallery

def upload_local_media():
    print("🚀 Cloudinary Local Media Uploader started...")
    
    # Check if Cloudinary is configured
    cloudinary_cloud_name = settings.CLOUDINARY_STORAGE.get('CLOUD_NAME')
    if not cloudinary_cloud_name:
        print("❌ Cloudinary is not configured in settings.py or .env!")
        return

    print(f"Connected to Cloudinary account: {cloudinary_cloud_name}")
    media_root = Path(settings.MEDIA_ROOT)
    
    # 1. Upload Product Images
    print("\n--- 📦 Uploading Product Images ---")
    products = Product.objects.all()
    uploaded_products_count = 0
    
    for p in products:
        if p.image:
            image_name = p.image.name  # e.g., 'products/concrete-paver-block-ab6432ob.jpg'
            local_path = media_root / image_name
            
            if local_path.exists():
                # Extract filename without extension for the public ID
                filename_without_ext = Path(image_name).stem
                # Public ID format expected by django-cloudinary-storage: 'media/products/filename'
                public_id = f"media/products/{filename_without_ext}"
                
                print(f"Uploading local image for '{p.name}': {image_name} ...")
                try:
                    cloudinary.uploader.upload(
                        str(local_path),
                        public_id=public_id,
                        overwrite=True,
                        resource_type="image"
                    )
                    print(f"✅ Successfully uploaded '{p.name}' -> Public ID: {public_id}")
                    uploaded_products_count += 1
                except Exception as e:
                    print(f"❌ Failed to upload '{p.name}': {e}")
            else:
                print(f"⚠️ Local file not found for '{p.name}': {local_path}")
                
    # 2. Upload Gallery Images
    print("\n--- 🖼️ Uploading Gallery Images ---")
    gallery_items = Gallery.objects.all()
    uploaded_gallery_count = 0
    
    for item in gallery_items:
        if item.image:
            image_name = item.image.name  # e.g., 'gallery/WhatsApp_Image_...jpeg'
            local_path = media_root / image_name
            
            if local_path.exists():
                filename_without_ext = Path(image_name).stem
                public_id = f"media/gallery/{filename_without_ext}"
                
                print(f"Uploading gallery image '{item.title}': {image_name} ...")
                try:
                    cloudinary.uploader.upload(
                        str(local_path),
                        public_id=public_id,
                        overwrite=True,
                        resource_type="image"
                    )
                    print(f"✅ Successfully uploaded '{item.title}' -> Public ID: {public_id}")
                    uploaded_gallery_count += 1
                except Exception as e:
                    print(f"❌ Failed to upload '{item.title}': {e}")
            else:
                print(f"⚠️ Local file not found for '{item.title}': {local_path}")

    print("\n==========================================")
    print(f"🎉 Upload Complete!")
    print(f"📦 Products uploaded: {uploaded_products_count}/{products.count()}")
    print(f"🖼️ Gallery items uploaded: {uploaded_gallery_count}/{gallery_items.count()}")
    print("==========================================")
    print("तुम्ही आता डिप्लॉय केलेल्या वेबसाईटवर जाऊन जुने फोटो तपासू शकता! ते आता व्यवस्थित दिसतील. ✅")

if __name__ == "__main__":
    upload_local_media()
