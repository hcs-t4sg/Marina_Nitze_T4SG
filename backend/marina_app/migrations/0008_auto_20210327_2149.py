# Generated by Django 3.1.7 on 2021-03-27 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marina_app', '0007_implementationguidance'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConclusionText',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='IntroductionText',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('text', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='implementationguidance',
            name='quote',
            field=models.TextField(blank=True),
        ),
    ]