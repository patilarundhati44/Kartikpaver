"""
Management command: ensure_admin
Creates the default admin superuser if it does not already exist.
This is safe to run on every server start — it will NEVER overwrite
an existing user's password.

Usage:
    python manage.py ensure_admin
    python manage.py ensure_admin --username=myuser --password=mypass --email=me@example.com
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Ensure the default admin superuser exists (idempotent — safe to run on every start)'

    def add_arguments(self, parser):
        parser.add_argument('--username', default='kartikpaver', help='Admin username (default: kartikpaver)')
        parser.add_argument('--password', default='admin123', help='Admin password (default: admin123)')
        parser.add_argument('--email', default='admin@kartikpaver.com', help='Admin email')

    def handle(self, *args, **options):
        User = get_user_model()
        username = options['username']
        password = options['password']
        email = options['email']

        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.SUCCESS(f'✅ Admin user "{username}" already exists — credentials unchanged.')
            )
        else:
            User.objects.create_superuser(
                username=username,
                password=password,
                email=email,
            )
            self.stdout.write(self.style.SUCCESS(''))
            self.stdout.write(self.style.SUCCESS('━' * 50))
            self.stdout.write(self.style.SUCCESS('✅ Admin user created successfully!'))
            self.stdout.write(self.style.SUCCESS(f'   Username : {username}'))
            self.stdout.write(self.style.SUCCESS(f'   Password : {password}'))
            self.stdout.write(self.style.SUCCESS(f'   Panel    : http://localhost:8000/django-admin/'))
            self.stdout.write(self.style.SUCCESS('━' * 50))
            self.stdout.write(self.style.SUCCESS(''))
