# Generated by Django 3.1.7 on 2021-03-01 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marina_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BestPractice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='issuearea',
            name='fee',
        ),
        migrations.RemoveField(
            model_name='issuearea',
            name='state',
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('population', models.IntegerField()),
                ('bestPractices', models.ManyToManyField(to='marina_app.BestPractice')),
            ],
        ),
        migrations.AddField(
            model_name='issuearea',
            name='states',
            field=models.ManyToManyField(to='marina_app.State'),
        ),
    ]
