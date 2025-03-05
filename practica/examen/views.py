from django.shortcuts import render
from .models import localidad, boleto, evento, producto
import json
from datetime import datetime, timedelta
from django.http import JsonResponse

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

def crear(request):
    localidades = localidad.objects.all()
    eventos = evento.objects.all()
    data ={
        "localidad":localidades,
        "evento":eventos,
    }
    return render(request, 'examen/crearEvento.html',data)

def createEventosByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode) 
    objeto_localidad = localidad.objects.get(id=body.get("localidad"))
    last_evento = evento.objects.last()
    fecha_inicio = datetime.strptime(body.get("fecha_inicio"), "%Y-%m-%dT%H:%M")
    fecha_fin = datetime.strptime(body.get("fecha_fin"), "%Y-%m-%dT%H:%M")
    nuevo_evento = evento(name=body.get("name"), fecha_inicio=fecha_inicio, fecha_fin=fecha_fin, localidad_id=objeto_localidad)
    if( nuevo_evento.fecha_inicio < datetime.today() + timedelta(days=1 ) or nuevo_evento.fecha_inicio > nuevo_evento.fecha_fin):
        return JsonResponse({
            "error": "La fecha de inicio no puede ser menor a la fecha actual o menor a la fecha de fin"
        })
    if(nuevo_evento.localidad_id == last_evento.localidad_id):
        return JsonResponse({
            "error": "La localidad no puede ser la misma que la ultima"
        })
    nuevo_evento.save()
    return JsonResponse({"success":"Datos guardados exitosamente"})

def borrarEventosByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    evento.objects.filter(id=body.get("id")).delete()
    return JsonResponse({"success":"Datos borrados exitosamente"})

def crearProducto(request):
    productos = producto.objects.all()
    localidades = localidad.objects.all()
    data={
        "producto" : productos,
        "localidad" : localidades
    }
    return render(request, 'examen/crearProducto.html', data)

def createProductoByFetch(request):
    productos_hoy = producto.objects.filter(created_at__date=datetime.today())
    if(len(productos_hoy) >= 10):
        return JsonResponse({
            "error": "No se pueden agregar mas productos hoy"
        })
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    objeto_localidad = localidad.objects.get(id=body.get("localidad"))
    nuevo_producto = producto(name=body.get("name"), precio=body.get("precio"), localidad_id=objeto_localidad)
    nuevo_producto.save()
    return JsonResponse({"success":"Datos guardados exitosamente"})

def borrarProductoByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    producto.objects.filter(id=body.get("id")).delete()
    return JsonResponse({"success":"Datos borrados exitosamente"})

def verBoletosbyFetch(request, id):
    boletos = boleto.objects.filter(evento_id=id)
    if boletos:    
        data = {
            "boleto" : boletos
        }
        
        return render(request, 'examen/verBoletos.html', data)

    data = {
        "error" : "No hay boletos para este evento"
    }
    
    return render(request, 'examen/verBoletos.html', data)