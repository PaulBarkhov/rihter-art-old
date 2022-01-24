from django.db import models

# Create your models here.


class Course(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=512)
    preview = models.ImageField(upload_to='uploads/previews')

    def __str__(self):
        return f"{self.id}: {self.name}"


class Photo(models.Model):
    name = models.CharField(max_length=64)
    file = models.ImageField(upload_to='uploads/photos')

    def __str__(self):
        return f"{self.id}: {self.name}"


class Lesson(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=512)
    photos = models.ManyToManyField(Photo, blank=True, related_name='photos')
    video = models.FileField(upload_to='uploads/videos')
    excersize = models.CharField(max_length=512)
    courses = models.ManyToManyField(
        Course, blank=True, related_name='lessons')

    def __str__(self):
        return f"{self.id}: {self.name}. {self.courses}"
