"""
URL routing for Kartik Paver Industries API.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, GalleryViewSet, InquiryViewSet,
    TestimonialViewSet, ServiceViewSet, SiteSettingsViewSet,
    CustomTokenObtainPairView
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'settings', SiteSettingsViewSet, basename='settings')

urlpatterns = [
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
