from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout

import json

from .models import Course, Lesson, Photo
from .serializers import CourseSerializer


# Create your views here.

def front(request):
    context = {}
    return render(request, "index.html", context)


@csrf_exempt
def registration_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            email = data["email"]
            password = data["password"]

            user = User.objects.create_user(email, email, password)
            if user is not None:
                # user.email = email
                # user.password = password
                user.save()
                print("Success")
                return JsonResponse({"isRegistered": True})
            else:
                print("Failure")
                return JsonResponse({"isRegistered": False})
        except Exception as e:
            print(str(e))
            return JsonResponse({"isRegistered": False, "error": str(e)})


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        username = data["email"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print("Success")
            return JsonResponse({"isAuthenticated": True})
        else:
            print("Failure")
            return JsonResponse({"isAuthenticated": False, "error": "Неверный Email или Пароль"})


def logout_view(request):
    logout(request)
    return JsonResponse({"isLoggedOut": True})
