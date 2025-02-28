from django.shortcuts import render
from .models import *
# Create your views here.

def index(request):
    return render(request, 'examen/index.html')

def eventosView(request):
    eventos = evento.objects.all()

    data = {
        "evento" : eventos
    }
    
    return render(request, 'examen/eventos.html', data)

def boletosView(request):
    boletos = boleto.objects.all()

    data = {
        "boleto" : boletos
    }
    return render(request, 'examen/boletos.html', data)