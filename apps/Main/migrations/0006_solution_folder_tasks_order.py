# Generated by Django 2.0.2 on 2018-06-19 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0005_remove_solution_folder_task_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='solution_folder',
            name='tasks_order',
            field=models.TextField(blank=True, default=''),
        ),
    ]
