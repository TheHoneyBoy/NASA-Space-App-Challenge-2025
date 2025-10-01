from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('idUser', 'userName', 'email', 'passEncrypted')
        extra_kwargs = {
            'passEncrypted': {'write_only': True}
        }

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, max_length=200)
    password2 = serializers.CharField(write_only=True, required=True, max_length=200)

    class Meta:
        model = User
        fields = ('userName', 'email', 'password', 'password2')

    def validate(self, attrs):
        # Check if passwords match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Check if email already exists
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
        
        return attrs

    def create(self, validated_data):
        # Remove password confirmation field
        password = validated_data.pop('password')
        validated_data.pop('password2')
        
        # Create user with the pre-hashed password
        user = User.objects.create_user(
            email=validated_data['email'],
            userName=validated_data.get('userName', ''),  # userName is optional
            password=password  # This is the already-hashed password from frontend
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)  # Login with email
    password = serializers.CharField(required=True, write_only=True, max_length=200)

    def validate(self, attrs):
        email = attrs.get('email')
        password_hash = attrs.get('password')  # This is the hashed password from frontend

        if email and password_hash:
            try:
                user = User.objects.get(email=email)
                # Compare the hashed passwords directly
                if user.check_password(password_hash):
                    if not user.is_active:
                        raise serializers.ValidationError("User account is disabled.")
                    attrs['user'] = user
                    return attrs
                else:
                    raise serializers.ValidationError("Unable to log in with provided credentials.")
            except User.DoesNotExist:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")