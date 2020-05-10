from django.forms import ModelForm, Textarea, TextInput, HiddenInput
from apps.Main.models import Test_Template


# Класс формы шаблона тестов задач
class TestTemplateForm(ModelForm):
    class Meta:
        model = Test_Template
        fields = ('name', 'comment', 'folders_and_numbers')
        widgets = {
            'comment': Textarea(attrs={'cols': 40, 'rows': 3}),
            'name': TextInput(attrs={'size': '40'}),
            'folders_and_numbers': HiddenInput(),
        }
