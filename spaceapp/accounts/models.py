from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        
        # Store the pre-hashed password from frontend
        if password is not None:
            user.passEncrypted = password
            
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    idUser = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=50, null=True, blank=True)
    email = models.CharField(max_length=200, unique=True)
    passEncrypted = models.CharField(max_length=200)  
    
    # Required fields for custom user model
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # userName is optional

    def __str__(self):
        return self.userName or self.email

    def set_password(self, raw_password):
        # Store the pre-hashed password from frontend
        self.passEncrypted = raw_password
    
    def check_password(self, raw_password):
        # Compare the pre-hashed passwords directly
        return raw_password == self.passEncrypted

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser