from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import User
from .models import User_addres
import json
from django.http import JsonResponse


def index(request):
    return HttpResponse("Hello, world. You're at the users index.")

def indexUsers(request):
    users = User.objects.all()

    data = {
        "users": users
    }

    return render(request, 'users/index.html', data)

def create(request):
    return render(request, 'users/create.html')

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode) 
    user = User(name=body.get("name"), email=body.get("email"), age=body.get("age"), rfc=body.get("rfc"), photo=body.get("photo"))
    user.save()
    return JsonResponse({
        "NOMBRE_RECIBIDO":body.get("name"),
        "EMAIL_RECIBIDO":body.get("email"),
        "EDAD_RECIBIDO":body.get("age"),
        "RFC_RECIBIDO":body.get("rfc"),
    })

def updateUserByFetch(request, id):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user = User.objects.get(id=id)
    user.name = body.get("name")
    user.email = body.get("email")
    user.age = body.get("age")
    user.rfc = body.get("rfc")
    user.photo = body.get("photo")
    user.save()
    return JsonResponse({
        "message": "Usuario actualizado",
            "updated_user": {
                "name": user.name,
                "email": user.email,
                "age": user.age,
                "rfc": user.rfc
            }
    })

def createUser(request):
    data={}
    try:
        name = request.POST["name"]
        email = request.POST["email"]
        age = request.POST["age"]
        rfc = request.POST["rfc"]
        photo = request.POST["photo"]
        user = User(name=name, email=email, age=age, rfc=rfc, photo=photo)
        user.save()
        data["message"] = "User created successfully"
        return render(request, 'users/create.html',data)
    except:
        data["message"] = "Error creating user"
        return render(request, 'users/create.html')
    
def userDetail(request, id):
    try:
        user_addres = User_addres.objects.filter(user_id=id)
    except:
        user_addres = None
    user = User.objects.get(id=id)
    data = {
        "user": user,
        "user_addres": user_addres
    }
    return render(request, 'users/detail.html', data)