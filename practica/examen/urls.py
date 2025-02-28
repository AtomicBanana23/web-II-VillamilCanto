from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("boletos", views.boletosView, name="boletos"),
    path("eventos", views.eventosView, name="eventos")

]