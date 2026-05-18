"""
URL configuration for Kartik Paver Industries backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import CustomTokenObtainPairView
urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('api.urls')),
]

# ADD THIS 👇 (VERY IMPORTANT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Admin customization
admin.site.site_header = 'Kartik Paver Industries Admin'
admin.site.site_title = 'KPI Admin'
admin.site.index_title = 'Welcome to Kartik Paver Industries Admin Panel'