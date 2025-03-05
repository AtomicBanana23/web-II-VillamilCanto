from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    age = models.IntegerField()
    rfc = models.CharField(max_length=13)
    photo = models.CharField(max_length=1000)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class User_addres(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=200)
    zip_code = models.CharField(max_length=5)
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.street
