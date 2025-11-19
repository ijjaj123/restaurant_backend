from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=120, required=False)
    email = forms.EmailField(required=False)
    message = forms.CharField(widget=forms.Textarea, required=True)