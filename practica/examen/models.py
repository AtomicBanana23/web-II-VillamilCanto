from django.db import models

# Create your models here.
class localidad(models.Model):
    name = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class producto(models.Model):
    name = models.CharField(max_length=100)
    precio = models.FloatField()
    localidad_id = models.ForeignKey(localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class evento(models.Model):
    name = models.CharField(max_length=100)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    localidad_id = models.ForeignKey(localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class boletoTipo(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class boleto(models.Model):
    precio = models.FloatField()
    boletoTipo_id = models.ForeignKey(boletoTipo, on_delete=models.CASCADE)
    evento_id = models.ForeignKey(evento, on_delete=models.CASCADE)
    fecha = models.DateField()
    