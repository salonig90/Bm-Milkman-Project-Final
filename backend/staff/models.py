from django.db import models

class StaffProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50, default='Milkman')

    def __str__(self):
        return f"{self.name} - {self.role}"
