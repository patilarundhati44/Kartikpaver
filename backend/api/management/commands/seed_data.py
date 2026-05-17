"""
Management command to seed initial data for Kartik Paver Industries.
Usage: python manage.py seed_data
"""
from django.core.management.base import BaseCommand
from api.models import Product, Gallery, Testimonial, Service, SiteSettings


class Command(BaseCommand):
    help = 'Seed initial data for Kartik Paver Industries website'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')
        self._seed_products()
        self._seed_gallery()
        self._seed_testimonials()
        self._seed_services()
        self._seed_settings()
        self.stdout.write(self.style.SUCCESS('✅ Data seeded successfully!'))

    def _seed_products(self):
        products = [
            {
                'name': 'I Shape Paver Block',
                'category': 'Standard',
                'description': 'The classic I-shape interlocking paver block is the most widely used paving solution for roads, driveways, footpaths, and industrial floors. Its unique shape provides excellent interlocking and load distribution.',
                'sizes': ['200×100×60mm', '200×100×80mm', '200×100×100mm'],
                'thickness': ['60mm', '80mm', '100mm'],
                'strength': '35 N/mm²',
                'applications': ['Roads & Driveways', 'Footpaths', 'Industrial Floors', 'Parking Areas'],
                'colors': ['Grey', 'Red', 'Yellow', 'Black'],
                'weight': '2.8 kg (60mm)',
                'features': ['High load-bearing capacity', 'Easy installation & replacement', 'Slip-resistant surface', 'Low maintenance'],
                'order': 1,
            },
            {
                'name': 'Zig Zag Paver Block',
                'category': 'Decorative',
                'description': 'The Zig Zag paver block offers superior interlocking with its unique angular design. Ideal for commercial spaces, plazas, and areas requiring high aesthetic appeal combined with structural strength.',
                'sizes': ['225×112×60mm', '225×112×80mm'],
                'thickness': ['60mm', '80mm'],
                'strength': '35 N/mm²',
                'applications': ['Commercial Plazas', 'Shopping Centers', 'Pedestrian Zones', 'Garden Paths'],
                'colors': ['Grey', 'Red', 'Yellow', 'Green', 'Blue'],
                'weight': '3.2 kg (60mm)',
                'features': ['Superior interlocking', 'Decorative appeal', 'High stability', 'Multiple color options'],
                'order': 2,
            },
            {
                'name': 'Rectangular Paver Block',
                'category': 'Standard',
                'description': 'The versatile rectangular paver block is suitable for all types of paving applications. Its simple yet effective design makes it the preferred choice for residential, commercial, and industrial projects.',
                'sizes': ['200×100×60mm', '200×100×80mm', '300×150×80mm'],
                'thickness': ['60mm', '80mm'],
                'strength': '40 N/mm²',
                'applications': ['Residential Areas', 'Commercial Spaces', 'Industrial Zones', 'Public Areas'],
                'colors': ['Grey', 'Red', 'Yellow', 'Black', 'White'],
                'weight': '2.6 kg (60mm)',
                'features': ['Versatile application', 'High compressive strength', 'Uniform dimensions', 'Cost-effective'],
                'order': 3,
            },
            {
                'name': 'Grass Paver Block',
                'category': 'Eco',
                'description': 'The eco-friendly grass paver block features an open-cell design that allows grass to grow through while providing structural support. Perfect for sustainable parking solutions and green spaces.',
                'sizes': ['400×200×80mm', '600×400×80mm'],
                'thickness': ['80mm'],
                'strength': '30 N/mm²',
                'applications': ['Eco Parking', 'Garden Paths', 'Slope Stabilization', 'Fire Access Roads'],
                'colors': ['Grey'],
                'weight': '8.5 kg',
                'features': ['Eco-friendly design', 'Allows grass growth', 'Reduces runoff', 'Natural aesthetics'],
                'order': 4,
            },
            {
                'name': 'Kerb Stone',
                'category': 'Boundary',
                'description': 'Heavy-duty kerb stones for road edging, garden borders, and traffic channeling. Precision manufactured with high compressive strength to withstand vehicle impact and weather conditions.',
                'sizes': ['500×200×200mm', '1000×200×200mm', '500×150×300mm'],
                'thickness': ['200mm', '300mm'],
                'strength': '45 N/mm²',
                'applications': ['Road Edging', 'Garden Borders', 'Traffic Channeling', 'Drainage Channels'],
                'colors': ['Grey', 'Red'],
                'weight': '25 kg (500mm)',
                'features': ['Heavy-duty construction', 'Impact resistant', 'Precision dimensions', 'Long lifespan'],
                'order': 5,
            },
            {
                'name': 'Color Paver Block',
                'category': 'Decorative',
                'description': 'Vibrant colored paver blocks for decorative applications. Available in multiple colors with UV-resistant pigments that maintain their vibrancy for years. Perfect for creating attractive patterns and designs.',
                'sizes': ['200×100×60mm', '225×112×60mm'],
                'thickness': ['60mm'],
                'strength': '35 N/mm²',
                'applications': ['Decorative Pathways', 'Residential Driveways', 'Theme Parks', 'Landscaping'],
                'colors': ['Red', 'Yellow', 'Blue', 'Green', 'Black', 'Custom'],
                'weight': '2.8 kg',
                'features': ['UV-resistant colors', 'Premium finish', 'Custom color options', 'Decorative patterns'],
                'order': 6,
            },
        ]
        for p in products:
            Product.objects.get_or_create(name=p['name'], defaults=p)
        self.stdout.write(f'  ✓ {len(products)} products seeded')

    def _seed_gallery(self):
        items = [
            {'title': 'Hydraulic Press Machine', 'category': 'Factory', 'description': 'State-of-the-art hydraulic press for uniform block production', 'order': 1},
            {'title': 'I Shape Paver Blocks', 'category': 'Products', 'description': 'Premium I-shape blocks ready for dispatch', 'order': 2},
            {'title': 'Road Paving - Latur City', 'category': 'Projects', 'description': 'Municipal road project completed with our paver blocks', 'order': 3},
            {'title': 'Concrete Mixing Plant', 'category': 'Factory', 'description': 'Automated batching plant for consistent quality', 'order': 4},
            {'title': 'Color Paver Collection', 'category': 'Products', 'description': 'Vibrant color paver blocks in multiple shades', 'order': 5},
            {'title': 'Commercial Plaza - Osmanabad', 'category': 'Projects', 'description': 'Zig Zag paver installation for commercial complex', 'order': 6},
            {'title': 'Curing Yard', 'category': 'Factory', 'description': '28-day water curing process for maximum strength', 'order': 7},
            {'title': 'Kerb Stone Range', 'category': 'Products', 'description': 'Heavy-duty kerb stones for road edging', 'order': 8},
        ]
        for item in items:
            Gallery.objects.get_or_create(title=item['title'], defaults=item)
        self.stdout.write(f'  ✓ {len(items)} gallery items seeded')

    def _seed_testimonials(self):
        testimonials = [
            {'name': 'Pratap Pawar', 'role': 'Satisfied Customer', 'location': 'Latur', 'rating': 5, 'review': 'I had a great experience with Kartik Paver Industries. The products are of good quality. They offer many options, and I found what I needed easily. The service was excellent and delivery was on time.', 'project': 'Residential Project, Latur', 'order': 1},
            {'name': 'Ajinkya', 'role': 'Regular Customer', 'location': 'Latur', 'rating': 5, 'review': 'High quality products, durable, experienced staff, polite professional, timely delivery, reliable delivery partner, reasonably priced with discounts available. I had a great experience with Kartik Paver Industries!', 'project': 'Commercial Project, Latur', 'order': 2},
            {'name': 'VITTHAL', 'role': 'Satisfied Customer', 'location': 'Latur', 'rating': 5, 'review': 'Customizable products, timely delivery, reliable delivery partner, good quality. I had a great experience with Kartik Paver Industries! Their products are of excellent quality and very durable.', 'project': 'Residential Project, Latur', 'order': 3},
            {'name': 'Rushi Patil', 'role': 'Happy Customer', 'location': 'Latur', 'rating': 5, 'review': 'Timely delivery, reasonably priced, good quality. I am very happy with Kartik Paver Industries! Their products are of good quality and look great. The prices are reasonable, which makes them a great choice.', 'project': 'Home Construction, Latur', 'order': 4},
            {'name': 'Sharad Patil', 'role': 'Satisfied Customer', 'location': 'Latur', 'rating': 5, 'review': 'Timely delivery, good quality. I had a great experience with Kartik Paver Industries. They delivered my products on time, which was very important to me. The quality of the products is excellent.', 'project': 'Commercial Project, Latur', 'order': 5},
            {'name': 'Arati Angadi', 'role': 'Regular Customer', 'location': 'Latur', 'rating': 5, 'review': 'Customizable products, timely delivery, reliable delivery partner, good quality. Kartik Paver Industries is excellent! Their products are of good quality and very strong. I always get my orders on time.', 'project': 'Residential Project, Latur', 'order': 6},
            {'name': 'Sagr', 'role': 'Satisfied Customer', 'location': 'Latur', 'rating': 5, 'review': 'High quality products, environment-friendly, experienced staff, polite professional, timely delivery, good quality. Kartik Paver Industries truly stands out in the market with its high-quality products.', 'project': 'Eco-friendly Project, Latur', 'order': 7},
            {'name': 'SAINATH', 'role': 'Happy Customer', 'location': 'Latur', 'rating': 5, 'review': 'High quality products. Kartik Paver Industries truly stands out in the market with its exceptional range of high-quality products. Their pavers are not only aesthetically pleasing but also extremely durable.', 'project': 'Commercial Complex, Latur', 'order': 8},
            {'name': 'Akash Jadhav', 'role': 'Eco-conscious Customer', 'location': 'Latur', 'rating': 5, 'review': 'High quality products, environment-friendly, experienced staff, good quality. Kartik Paver Industries makes great products! They care about the environment and use eco-friendly materials in their manufacturing.', 'project': 'Green Building Project, Latur', 'order': 9},
            {'name': 'Shekhar Mali', 'role': 'Satisfied Customer', 'location': 'Latur', 'rating': 5, 'review': 'Polite professional staff, discounts available, refund available, good quality. My experience with Kartik Paver Industries was excellent. The products were of good quality, which made me very satisfied.', 'project': 'Residential Project, Latur', 'order': 10},
        ]
        for t in testimonials:
            Testimonial.objects.get_or_create(name=t['name'], defaults=t)
        self.stdout.write(f'  ✓ {len(testimonials)} testimonials seeded')

    def _seed_services(self):
        services = [
            {'title': 'Paver Block Installation', 'subtitle': 'Professional Installation Services', 'description': 'Our expert installation team ensures your paver blocks are laid perfectly with proper base preparation, leveling, and finishing. We handle projects of all sizes — from residential driveways to large commercial complexes.', 'features': ['Site assessment and planning', 'Sub-base preparation and compaction', 'Precision block laying and leveling', 'Edge restraint installation', 'Joint filling and sealing', 'Post-installation inspection'], 'applications': ['Driveways', 'Footpaths', 'Parking Areas', 'Commercial Plazas', 'Industrial Floors'], 'order': 1},
            {'title': 'Bulk Supply', 'subtitle': 'Large Volume Orders', 'description': 'We specialize in bulk supply of paver blocks for large-scale projects. With a daily production capacity of 50,000+ blocks, we can fulfill even the most demanding orders on schedule. Special pricing available for bulk orders.', 'features': ['Minimum order: 500 blocks', 'Bulk discount pricing', 'Priority production scheduling', 'Quality certificate with each batch', 'Flexible payment terms', 'Dedicated account manager'], 'applications': ['Municipal Projects', 'Real Estate Developers', 'Government Contracts', 'Large Contractors'], 'order': 2},
            {'title': 'Transportation', 'subtitle': 'Pan-Maharashtra Delivery', 'description': 'Our dedicated logistics fleet ensures safe and timely delivery of paver blocks across Maharashtra. We have experience delivering to remote locations and can coordinate with your project schedule for just-in-time delivery.', 'features': ['Dedicated delivery fleet', 'Pan-Maharashtra coverage', 'GPS-tracked vehicles', 'Safe loading and unloading', 'On-time delivery guarantee', 'Delivery scheduling flexibility'], 'applications': ['Latur District', 'Osmanabad', 'Nanded', 'Solapur', 'Pune', 'All Maharashtra'], 'order': 3},
            {'title': 'Custom Design Solutions', 'subtitle': 'Bespoke Paving Designs', 'description': 'Have a unique vision for your project? Our design team works with you to create custom paving patterns, color combinations, and layouts. We can manufacture blocks in custom sizes and colors to match your specific requirements.', 'features': ['Custom color mixing', 'Unique pattern design', 'Logo and branding integration', 'Custom size manufacturing', 'Design consultation', '3D layout visualization'], 'applications': ['Theme Parks', 'Corporate Campuses', 'Luxury Residences', 'Heritage Projects', 'Branded Spaces'], 'order': 4},
        ]
        for s in services:
            Service.objects.get_or_create(title=s['title'], defaults=s)
        self.stdout.write(f'  ✓ {len(services)} services seeded')

    def _seed_settings(self):
        SiteSettings.objects.get_or_create(pk=1, defaults={
            'company_name': 'Kartik Paver Industries',
            'tagline': 'Premium Quality Paver Block Solutions',
            'phone_primary': '+91 90548 39964',
            'phone_secondary': '',
            'email_primary': 'kartikpaverindustries@gmail.com',
            'email_secondary': '',
            'address': 'Plot No C10, Near Atul Metal Latur, 1 No MIDC, Latur - 413531, Maharashtra',
            'whatsapp_number': '919054839964',
        })
        self.stdout.write('  ✓ Site settings seeded')
