"""
Django admin configuration for Kartik Paver Industries.
"""
from django.contrib import admin
from django.utils.html import format_html
from .models import Product, Gallery, Inquiry, Testimonial, Service, SiteSettings


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'strength', 'is_active', 'order', 'updated_at')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'description')
    list_editable = ('is_active', 'order')
    ordering = ('order', 'name')
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'category', 'description', 'is_active', 'order')
        }),
        ('Specifications', {
            'fields': ('sizes', 'thickness', 'strength', 'weight', 'colors')
        }),
        ('Details', {
            'fields': ('applications', 'features')
        }),
        ('Media', {
            'fields': ('image',)
        }),
    )


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'image_preview', 'is_active', 'order', 'created_at')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')
    list_editable = ('is_active', 'order')
    ordering = ('order', '-created_at')

    def image_preview(self, obj):
        src = obj.image_src
        if src:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', src)
        return '—'
    image_preview.short_description = 'Preview'


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'product_interest', 'is_read', 'created_at')
    list_filter = ('is_read', 'product_interest', 'created_at')
    search_fields = ('name', 'phone', 'email', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('is_read',)
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs

    actions = ['mark_as_read', 'mark_as_unread']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
        self.message_user(request, f'{queryset.count()} inquiries marked as read.')
    mark_as_read.short_description = 'Mark selected as read'

    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
        self.message_user(request, f'{queryset.count()} inquiries marked as unread.')
    mark_as_unread.short_description = 'Mark selected as unread'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'location', 'rating', 'is_active', 'order', 'created_at')
    list_filter = ('rating', 'is_active')
    search_fields = ('name', 'review', 'location')
    list_editable = ('is_active', 'order')
    ordering = ('order', '-created_at')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    list_editable = ('is_active', 'order')
    ordering = ('order', 'title')


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Company Info', {
            'fields': ('company_name', 'tagline')
        }),
        ('Contact Details', {
            'fields': ('phone_primary', 'phone_secondary', 'email_primary', 'email_secondary', 'whatsapp_number', 'address')
        }),
        ('Social Media', {
            'fields': ('instagram_url', 'linkedin_url')
        }),
        ('Homepage', {
            'fields': ('hero_banner_title', 'hero_banner_subtitle', 'google_maps_embed')
        }),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
