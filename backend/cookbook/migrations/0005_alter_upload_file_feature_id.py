# Generated by Django 4.0 on 2022-01-12 07:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0004_auto_20220110_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload_file',
            name='Feature_Id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='feature', to='cookbook.feature'),
        ),
    ]
