from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("boletos", views.boletosView, name="boletos"),
    path("eventos", views.eventosView, name="eventos"),
    path("crearEvento", views.crear, name="crearEvento"),
    path("createEventos", views.createEventosByFetch, name="createEventos"),
    path("borrarEvento", views.borrarEventosByFetch, name="borrarEvento"),
    path("crearProducto", views.crearProducto, name="crearProducto"),
    path("createProducto", views.createProductoByFetch, name="createProducto"),
    path("borrarProducto", views.borrarProductoByFetch, name="borrarProducto"),
    path("verBoletos/<int:id>", views.verBoletosbyFetch, name="verBoletos"),

]