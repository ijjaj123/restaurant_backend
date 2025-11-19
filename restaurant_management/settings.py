"""
Django settings for restaurant_management project.
"""

from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-&#^_7(1hmfre9s=f0_%ds2j)0xrk368ti-tjvyr6+f)zm#*=io'

DEBUG = True

ALLOWED_HOSTS = ["*"]


# --------------------------------------------------------
# APPLICATIONS
# --------------------------------------------------------

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party apps
    "rest_framework",
    "corsheaders",              # <-- ADD THIS
    "drf_yasg",
]

# Your local apps
INSTALLED_APPS += [
    "account",
    "home",
    "orders",
    "products",
]


# --------------------------------------------------------
# MIDDLEWARE
# --------------------------------------------------------

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",

    "corsheaders.middleware.CorsMiddleware",   # <-- MUST BE HERE BEFORE CommonMiddleware

    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "restaurant_management.urls"


# --------------------------------------------------------
# TEMPLATES
# --------------------------------------------------------

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "restaurant_management.wsgi.application"


# --------------------------------------------------------
# DATABASE
# --------------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# --------------------------------------------------------
# PASSWORD VALIDATION
# --------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# --------------------------------------------------------
# INTERNATIONALIZATION
# --------------------------------------------------------

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True


# --------------------------------------------------------
# STATIC & MEDIA FILES
# --------------------------------------------------------

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# --------------------------------------------------------
# REST FRAMEWORK CONFIG
# --------------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    )
}


# --------------------------------------------------------
# JWT CONFIG
# --------------------------------------------------------

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}


# --------------------------------------------------------
# CORS CONFIG
# --------------------------------------------------------

CORS_ALLOW_ALL_ORIGINS = True      # <-- ALLOWS REACT TO ACCESS DJANGO
# CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]   # optional stricter rule


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
