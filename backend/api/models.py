"""
Database models for Kartik Paver Industries.
All data is persisted in SQLite (db.sqlite3). Images are saved permanently
to the /media/ directory on disk via Django's ImageField.
"""
from django.db import models


class Product(models.Model):
    """Paver block product model."""
    CATEGORY_CHOICES = [
        ('Standard', 'Standard'),
        ('Decorative', 'Decorative'),
        ('Eco', 'Eco'),
        ('Boundary', 'Boundary'),
    ]

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Standard')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text='Price per unit')
    description = models.TextField()
    
    # Specification fields
    material = models.CharField(max_length=100, blank=True, help_text='e.g. Clay, Concrete')
    color = models.CharField(max_length=50, blank=True, help_text='Primary color')
    shape = models.CharField(max_length=50, blank=True, help_text='e.g. Rectangle, Square')
    type = models.CharField(max_length=100, blank=True, help_text='e.g. Hollow bricks, Solid blocks')
    product_dimensions = models.CharField(max_length=100, blank=True, help_text='e.g. 295 x 92 x 92 Mm')
    availability = models.CharField(max_length=50, default='In Stock', help_text='Stock status')
    
    sizes = models.JSONField(default=list, help_text='List of available sizes e.g. ["200×100×60mm"]')
    thickness = models.JSONField(default=list, help_text='List of thickness options e.g. ["60mm", "80mm"]')
    strength = models.CharField(max_length=50, help_text='Compressive strength e.g. 35 N/mm²')
    applications = models.JSONField(default=list, help_text='List of applications')
    colors = models.JSONField(default=list, help_text='Available colors')
    weight = models.CharField(max_length=100, blank=True)
    features = models.JSONField(default=list, help_text='Key features list')
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    video = models.FileField(upload_to='products/videos/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0, help_text='Display order')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.name


class Gallery(models.Model):
    """Gallery image model."""
    CATEGORY_CHOICES = [
        ('Factory', 'Factory'),
        ('Products', 'Products'),
        ('Projects', 'Projects'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Factory')
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    video = models.FileField(upload_to='gallery/videos/', blank=True, null=True)
    image_url = models.URLField(blank=True, help_text='Cloudinary or external image URL')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Gallery Image'
        verbose_name_plural = 'Gallery Images'

    def __str__(self):
        return self.title

    @property
    def image_src(self):
        """Return the best available image source."""
        if self.image:
            return self.image.url
        return self.image_url or ''


class Inquiry(models.Model):
    """Customer inquiry / contact form submission."""
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=300, blank=True)
    product_interest = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Inquiry'
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        return f"{self.name} - {self.phone} ({self.created_at.strftime('%d %b %Y')})"


class Testimonial(models.Model):
    """Customer testimonial / review."""
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, blank=True, help_text='e.g. Civil Contractor')
    location = models.CharField(max_length=100, blank=True)
    rating = models.PositiveSmallIntegerField(default=5, choices=[(i, i) for i in range(1, 6)])
    review = models.TextField()
    project = models.CharField(max_length=300, blank=True, help_text='Project name/description')
    is_active = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False, help_text='Admin approval required to display on website')
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'

    def __str__(self):
        return f"{self.name} - {self.rating}★"


class Service(models.Model):
    """Service offering model."""
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    features = models.JSONField(default=list, help_text='List of service features')
    applications = models.JSONField(default=list, help_text='List of applicable areas')
    icon_name = models.CharField(max_length=100, blank=True, help_text='Icon identifier')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self):
        return self.title


class SiteSettings(models.Model):
    """Singleton model for site-wide settings."""
    company_name = models.CharField(max_length=200, default='Kartik Paver Industries')
    tagline = models.CharField(max_length=300, default='Premium Quality Paver Block Solutions')
    phone_primary = models.CharField(max_length=20, default='+91 90548 39964')
    phone_secondary = models.CharField(max_length=20, blank=True)
    email_primary = models.EmailField(default='kartikpaverindustries@gmail.com')
    email_secondary = models.EmailField(blank=True)
    address = models.TextField(default='Plot No C10, Near Atul Metal Latur, 1 No MIDC, Latur - 413531, Maharashtra')
    whatsapp_number = models.CharField(max_length=20, default='919054839964')
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    google_maps_embed = models.TextField(blank=True, help_text='Google Maps embed URL')
    hero_banner_title = models.CharField(max_length=300, default='Premium Quality Paver Block Solutions')
    hero_banner_subtitle = models.CharField(max_length=500, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return 'Site Settings'

    def save(self, *args, **kwargs):
        # Ensure only one instance
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
