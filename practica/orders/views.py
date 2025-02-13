from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from .models import Question

def indexOrders(request):
    questions = Question.objects.all()

    data = {
        "questions": questions,
        "titulo":"Zzz Zzz",
        "total_orders":100,
        "total_payments":299,
        "orders":[
            {"id": 1, "total":100},
            {"id": 2, "total":532},
            {"id": 3, "total":161},
            {"id": 4, "total":272},
            {"id": 5, "total":694},
        ]
    }
    return render(request, 'orders/index.html', data)

def paymentsByOrder(request):
    return render(request, 'orders/payments.html')

def index(request):
    return HttpResponse("Hello, world. You're at the orders index.")