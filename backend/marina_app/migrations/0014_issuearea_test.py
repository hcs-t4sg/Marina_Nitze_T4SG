# Generated by Django 3.1.7 on 2021-04-08 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marina_app', '0013_merge_20210407_2301'),
    ]

    operations = [
        migrations.AddField(
            model_name='issuearea',
            name='test',
            field=models.CharField(default='', max_length=1000),
        ),
    ]