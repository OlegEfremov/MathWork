# Generated by Django 2.0.2 on 2018-09-30 18:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0022_auto_20180930_1839'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mathattribute',
            name='mathtype',
        ),
    ]
