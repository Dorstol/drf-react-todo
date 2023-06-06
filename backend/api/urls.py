from django.urls import path
from .views import TodoListCreate, TodoListUpdate, TodoToggleComplete, signup, login

urlpatterns = [
    path('todos/', TodoListCreate.as_view()),
    path('todos/<int:pk>', TodoListUpdate.as_view()),
    path('todos/<int:pk>/complete', TodoToggleComplete.as_view()),
    path('signup/', signup),
    path('login/', login),
]
