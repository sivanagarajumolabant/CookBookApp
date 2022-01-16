# Generated by Django 3.2.11 on 2022-01-16 10:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('Migration_TypeId', models.CharField(max_length=50)),
                ('Version_Id', models.SmallIntegerField(blank=True, null=True)),
                ('Object_Type', models.CharField(max_length=50)),
                ('Feature_Id', models.BigAutoField(primary_key=True, serialize=False)),
                ('Feature_Name', models.CharField(max_length=100)),
                ('Source_FeatureDescription', models.TextField()),
                ('Source_Code', models.TextField()),
                ('Conversion_Description', models.TextField()),
                ('Conversion_Code', models.TextField()),
                ('Target_FeatureDescription', models.TextField()),
                ('Target_Expected_Output', models.TextField()),
                ('Target_ActualCode', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Upload_file',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Source_Attachment', models.FileField(blank=True, null=True, upload_to='media/')),
                ('Conversion_Attachment', models.FileField(blank=True, null=True, upload_to='media/')),
                ('Target_Attachment', models.FileField(blank=True, null=True, upload_to='media/')),
                ('Feature_Id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.feature')),
            ],
        ),
    ]
