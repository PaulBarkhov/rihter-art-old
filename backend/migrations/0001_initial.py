# Generated by Django 4.0 on 2022-01-23 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.TextField(max_length=512)),
                ('preview', models.ImageField(upload_to='uploads/previews')),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('file', models.ImageField(upload_to='uploads/photos')),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.TextField(max_length=512)),
                ('video', models.FileField(upload_to='uploads/videos')),
                ('excersize', models.CharField(max_length=512)),
                ('courses', models.ManyToManyField(blank=True, related_name='lessons', to='backend.Course')),
                ('photos', models.ManyToManyField(blank=True, related_name='photos', to='backend.Photo')),
            ],
        ),
    ]