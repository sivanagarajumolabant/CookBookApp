# Generated by Django 4.0 on 2022-01-12 13:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0005_alter_upload_file_feature_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload_file',
            name='Feature_Id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.feature'),
        ),
    ]