from django.contrib import admin
# Register your models here.


from .models import *

admin.site.register(localidad)
admin.site.register(producto)
admin.site.register(evento)
admin.site.register(boletoTipo)
admin.site.register(boleto)

    
