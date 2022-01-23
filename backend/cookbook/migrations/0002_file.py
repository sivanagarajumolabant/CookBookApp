# Generated by Django 3.2.11 on 2022-01-23 11:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, upload_to='files')),
                ('Feature_Id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.feature')),
            ],
        ),
    ]