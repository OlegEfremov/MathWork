# Generated by Django 2.0.2 on 2018-09-14 13:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0011_tasknumber_chapter'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tasknumber',
            name='chapter',
        ),
    ]
