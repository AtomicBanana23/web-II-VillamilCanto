from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import User


def index(request):
    return HttpResponse("Hello, world. You're at the users index.")

def indexUsers(request):
    users = User.objects.all()

    data = {
        "users": users
    }

    return render(request, 'users/index.html', data)