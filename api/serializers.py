from rest_framework import serializers
from .models import Choice, Question


class ChoiceSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(required=False)
    class Meta:
        model = Choice
        fields = ['pk', 'text']


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['pk', 'text', 'choices']

    def create(self, validated_data):
        choices_data = validated_data.pop('choices')
        question = Question.objects.create(**validated_data)
        for choice in choices_data:
            Choice.objects.create(question=question, **choice)
        return question

                    #old       #new
    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()

        choice_items = validated_data.get('choices')

        # get all nested objects related with this instance and make a dict(id, object)
        choice_items_dict = dict((i.id, i) for i in instance.choices.all())

        for choice_data in choice_items:
            if 'id' in choice_data:
                choice_item = choice_items_dict.pop(choice_data['pk'])
                choice_data.pop('pk')
                for key in choice_data.keys():
                    setattr(choice_item, key, choice_data[key])
                choice_item.save()
            else:
                Choice.objects.create(question=instance, **choice_data)
        if len(choice_items_dict) > 0:
            for choice in choice_items_dict.values():
                choice.delete()

        return instance
