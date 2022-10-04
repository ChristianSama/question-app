from api.serializers import QuestionSerializer
from .models import Question
from rest_framework import viewsets

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer