"""
Serializers for Kartik Paver Industries API.
"""
from rest_framework import serializers
from .models import Product, Gallery, Inquiry, Testimonial, Service, SiteSettings


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def get_image_url(self, obj):
        """Return absolute URL for uploaded product image."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_video_url(self, obj):
        """Return absolute URL for uploaded product video."""
        if obj.video:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video.url)
            return obj.video.url
        return None


class GallerySerializer(serializers.ModelSerializer):
    image_src = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = '__all__'
        read_only_fields = ('created_at',)

    def get_image_src(self, obj):
        """Return absolute URL for the gallery image."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or None

    def get_video_url(self, obj):
        """Return absolute URL for the gallery video."""
        if obj.video:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video.url)
            return obj.video.url
        return None


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ('created_at', 'is_read')

    def validate_phone(self, value):
        # Basic phone validation
        cleaned = ''.join(filter(str.isdigit, value))
        if len(cleaned) < 10:
            raise serializers.ValidationError('Please enter a valid phone number.')
        return value


class InquiryCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating inquiries (public endpoint)."""
    class Meta:
        model = Inquiry
        fields = ('name', 'email', 'phone', 'subject', 'product_interest', 'message')

    def validate_phone(self, value):
        cleaned = ''.join(filter(str.isdigit, value))
        if len(cleaned) < 10:
            raise serializers.ValidationError('Please enter a valid phone number.')
        return value


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'
        read_only_fields = ('created_at',)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ('created_at',)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'
        read_only_fields = ('updated_at',)
