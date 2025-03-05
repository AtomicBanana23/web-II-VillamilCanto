from django.urls import path

from . import views

urlpatterns = [
    path("index", views.index, name="index"),
    path("indexUsers", views.indexUsers, name="indexUsers"),
    path("create", views.create, name="create"),
    path("createUser", views.createUser, name="createUser"),
    path("detail/<int:id>", views.userDetail, name="userDetail"),
    path("createUserByFetch", views.createUserByFetch, name="createUserByFetch"),
    path("updateUserByFetch/<int:id>", views.updateUserByFetch, name="updateUserByFetch")

]