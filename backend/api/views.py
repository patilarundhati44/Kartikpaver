"""
API views for Kartik Paver Industries.
"""
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django_filters.rest_framework import DjangoFilterBackend

from .models import Product, Gallery, Inquiry, Testimonial, Service, SiteSettings
from .serializers import (
    ProductSerializer, GallerySerializer, InquirySerializer,
    InquiryCreateSerializer, TestimonialSerializer, ServiceSerializer,
    SiteSettingsSerializer
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    CRUD for paver block products.
    Public: list, retrieve (active only)
    Admin: full CRUD
    """
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_active']
    search_fields = ['name', 'description', 'category']
    ordering_fields = ['order', 'name', 'created_at']

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Product.objects.all()
        return Product.objects.filter(is_active=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]


class GalleryViewSet(viewsets.ModelViewSet):
    """
    CRUD for gallery images.
    Public: list, retrieve (active only)
    Admin: full CRUD
    """
    serializer_class = GallerySerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'is_active']
    ordering_fields = ['order', 'created_at']

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Gallery.objects.all()
        return Gallery.objects.filter(is_active=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]


class InquiryViewSet(viewsets.ModelViewSet):
    """
    Inquiry management.
    Public: create only
    Admin: full CRUD + mark as read
    """
    queryset = Inquiry.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_read', 'product_interest']
    search_fields = ['name', 'phone', 'email', 'message']
    ordering_fields = ['created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return InquiryCreateSerializer
        return InquirySerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        inquiry = serializer.save()
        # Send email notification
        self._send_notification_email(inquiry)

    def _send_notification_email(self, inquiry):
        """Send email notification to admin when new inquiry is received."""
        try:
            subject = f'New Inquiry from {inquiry.name} - Kartik Paver Industries'
            message = f"""
New inquiry received on Kartik Paver Industries website:

Name: {inquiry.name}
Phone: {inquiry.phone}
Email: {inquiry.email or 'Not provided'}
Product Interest: {inquiry.product_interest or 'Not specified'}
Subject: {inquiry.subject or 'Not specified'}

Message:
{inquiry.message}

---
Received at: {inquiry.created_at.strftime('%d %B %Y, %I:%M %p IST')}
            """
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass  # Don't fail the request if email fails

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def mark_read(self, request, pk=None):
        inquiry = self.get_object()
        inquiry.is_read = True
        inquiry.save()
        return Response({'status': 'marked as read'})


class TestimonialViewSet(viewsets.ModelViewSet):
    """
    CRUD for customer testimonials.
    Public: list, retrieve (active and approved only)
    Admin: full CRUD + approve/delete/hide
    """
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_active', 'is_approved', 'rating']
    ordering_fields = ['order', 'created_at', 'rating']

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Testimonial.objects.all()
        return Testimonial.objects.filter(is_active=True, is_approved=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'create']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def approve(self, request, pk=None):
        """Approve a testimonial to display on website."""
        testimonial = self.get_object()
        testimonial.is_approved = True
        testimonial.save()
        return Response({'status': 'approved'})

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def hide(self, request, pk=None):
        """Hide a testimonial from website."""
        testimonial = self.get_object()
        testimonial.is_active = False
        testimonial.save()
        return Response({'status': 'hidden'})


class ServiceViewSet(viewsets.ModelViewSet):
    """
    CRUD for services.
    Public: list, retrieve (active only)
    Admin: full CRUD
    """
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_active']
    ordering_fields = ['order', 'title']

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Service.objects.all()
        return Service.objects.filter(is_active=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]


class SiteSettingsViewSet(viewsets.ModelViewSet):
    """
    Site settings (singleton).
    Public: retrieve
    Admin: update
    """
    serializer_class = SiteSettingsSerializer

    def get_queryset(self):
        return SiteSettings.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        settings_obj = SiteSettings.get_settings()
        serializer = self.get_serializer(settings_obj)
        return Response(serializer.data)
