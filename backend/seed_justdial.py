import os
import django
import json
import re
import urllib.request
from django.core.files.base import ContentFile

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kartik_paver.settings')
django.setup()

from api.models import Product

HTML_FILE_PATH = r"C:\Users\patil\OneDrive\Desktop\Bhya\Kartik Paver Industries in Latur MIDC, Latur - Best Paver Block Manufacturers in Latur - Justdial_files\justdial_product.html"

def run_seed():
    # Since reading the file failed, we'll use the exact JSON data extracted from the IDE
    print("Using extracted Product Data...")
    item_list = [{"@type":"ListItem","position":1,"url":"https://www.justdial.com/jdmart/Latur/Red-Brick-Floor-Design/pid-2231876645/9999P2382-2382-250903132033-P3W4","name":"Red Brick Floor Design","image":["https://images.jdmagicbox.com/quickquotes/images_main/mtc1nza3nta0mw-1757075043-af0c4c2c.jpg"]},{"@type":"ListItem","position":2,"url":"https://www.justdial.com/jdmart/Latur/I-Shape-Cement-Interlocking-Brick-Grey-60-MM/pid-2231881943/9999P2382-2382-250903132033-P3W4","name":"I Shape Cement Interlocking Brick Grey 60 MM","image":["https://images.jdmagicbox.com/quickquotes/images_main/i-shape-cement-interlocking-brick-grey-60-mm-eq7j1mn1.jpg"]},{"@type":"ListItem","position":3,"url":"https://www.justdial.com/jdmart/Latur/Bull-Nose-Brick/pid-2231882167/9999P2382-2382-250903132033-P3W4","name":"Bull Nose Brick","image":["https://images.jdmagicbox.com/quickquotes/images_main/mtc1nzezodqzmw-1757138433-r3hcuheg.jpg"]},{"@type":"ListItem","position":4,"url":"https://www.justdial.com/jdmart/Latur/Unburnt-Clay-Bricks/pid-2231882688/9999P2382-2382-250903132033-P3W4","name":"Unburnt Clay Bricks","image":["https://images.jdmagicbox.com/quickquotes/images_main/mtc1nze0mtm0nq-1757141345-9hd44so2.jpg"]},{"@type":"ListItem","position":5,"url":"https://www.justdial.com/jdmart/Latur/Pavements-Concrete-Paver-Block/pid-2231882980/9999P2382-2382-250903132033-P3W4","name":"Pavements Concrete Paver Block","image":["https://images.jdmagicbox.com/quickquotes/images_main/concrete-paver-block-zseo9ygh.jpg"]},{"@type":"ListItem","position":6,"url":"https://www.justdial.com/jdmart/Latur/Stone-Paver-Blocks/pid-2231884269/9999P2382-2382-250903132033-P3W4","name":"Stone Paver Blocks","image":["https://images.jdmagicbox.com/quickquotes/images_main/stone-paver-blocks-p70ujd6l.jpg"]},{"@type":"ListItem","position":7,"url":"https://www.justdial.com/jdmart/Latur/Paver-Block-Fixing-Contractors/pid-2231883793/9999P2382-2382-250903132033-P3W4","name":"Paver Block Fixing Contractors","image":["https://images.jdmagicbox.com/quickquotes/images_main/paver-block-fixing-contractors-de3zwbvy.jpg"]},{"@type":"ListItem","position":8,"url":"https://www.justdial.com/jdmart/Latur/Rubber-Paver-Blocks/pid-2231884484/9999P2382-2382-250903132033-P3W4","name":"Rubber Paver Blocks","image":["https://images.jdmagicbox.com/quickquotes/images_main/mtc1nze1mtq4nq-1757151485-qdq8wle0.jpg"]},{"@type":"ListItem","position":9,"url":"https://www.justdial.com/jdmart/Latur/Rectangular-Fire-Clay-Brick-Red-197-x-95-x-80-Mm/pid-2231884671/9999P2382-2382-250903132033-P3W4","name":"Rectangular Fire Clay Brick Red 197 x 95 x 80 Mm","image":["https://images.jdmagicbox.com/quickquotes/images_main/mtc1nze1mjcxnq-1757152715-63n9d3x9.jpg"]},{"@type":"ListItem","position":10,"url":"https://www.justdial.com/jdmart/Latur/Concrete-Brick-Paving/pid-2231876619/9999P2382-2382-250903132033-P3W4","name":"Concrete Brick Paving","image":["https://images.jdmagicbox.com/quickquotes/images_main/concrete-brick-paving-3wqr06n0.jpg"]},{"@type":"ListItem","position":11,"url":"https://www.justdial.com/jdmart/Latur/Hollow-Clay-Brick-Red-295-x-92-x-92-Mm/pid-2231885051/9999P2382-2382-250903132033-P3W4","name":"Hollow Clay Brick Red 295 x 92 x 92 Mm","image":["https://images.jdmagicbox.com/quickquotes/images_main/mtc1nze1ndq1na-1757154454-w35uux2x.jpg"]},{"@type":"ListItem","position":12,"url":"https://www.justdial.com/jdmart/Latur/Rectangle-Concrete-Hollow-Brick-Grey-8x2x5-Inch/pid-2231885256/9999P2382-2382-250903132033-P3W4","name":"Rectangle Concrete Hollow Brick Grey 8x2x5 Inch","image":["https://images.jdmagicbox.com/quickquotes/images_main/mtc1nze1ntuxmg-1757155512-r7ldwm36.jpg"]},{"@type":"ListItem","position":13,"url":"https://www.justdial.com/jdmart/Latur/PVC-Cover-Blocks/pid-2231875576/9999P2382-2382-250903132033-P3W4","name":"PVC Cover Blocks","image":["https://images.jdmagicbox.com/quickquotes/images_main/pvc-cover-blocks-2f4q5pm1.jpg"]},{"@type":"ListItem","position":14,"url":"https://www.justdial.com/jdmart/Latur/Concrete-Paver-Block/pid-2231875227/9999P2382-2382-250903132033-P3W4","name":"Concrete Paver Block","image":["https://images.jdmagicbox.com/quickquotes/images_main/concrete-paver-block-ab6432ob.jpg"]},{"@type":"ListItem","position":15,"url":"https://www.justdial.com/jdmart/Latur/Concrete-Cover-Blocks/pid-2231875438/9999P2382-2382-250903132033-P3W4","name":"Concrete Cover Blocks","image":["https://images.jdmagicbox.com/quickquotes/images_main/concrete-cover-blocks-vegagy3z.png"]}]
    print(f"Found {len(item_list)} products. Starting import...")

    added_count = 0
    for item in item_list:
        product_name = item.get('name')
        images = item.get('image', [])
        
        if not product_name:
            continue
            
        print(f"\nProcessing: {product_name}")
        
        # Check if already exists
        if Product.objects.filter(name=product_name).exists():
            print(f"Product '{product_name}' already exists. Skipping.")
            continue
            
        # Create product
        product = Product(
            name=product_name,
            description=f"High quality {product_name} manufactured by Kartik Paver Industries.",
            category="Paver Block" # Default category
        )
        
        # Handle Image
        if images and len(images) > 0:
            image_url = images[0]
            image_url = image_url.replace('\\/', '/') # clean escaped slashes
            print(f"Downloading image: {image_url}")
            
            try:
                # Add a realistic user agent
                req = urllib.request.Request(
                    image_url, 
                    data=None, 
                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
                )
                response = urllib.request.urlopen(req)
                image_content = response.read()
                
                # Extract filename from URL or make one
                filename = image_url.split('/')[-1]
                if not filename.endswith(('.jpg', '.png', '.jpeg')):
                    filename += '.jpg'
                    
                product.image.save(filename, ContentFile(image_content), save=False)
                print("Image downloaded and attached.")
            except Exception as e:
                print(f"Failed to download image: {e}")
                
        # Save product to database
        product.save()
        added_count += 1
        print(f"Successfully added '{product_name}'.")

    print(f"\n--- Import Complete ---")
    print(f"Total new products added: {added_count}")

if __name__ == '__main__':
    run_seed()
