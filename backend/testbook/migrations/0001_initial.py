# Generated by Django 3.2.11 on 2022-02-02 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('Migration_TypeId', models.CharField(max_length=50)),
                ('Level', models.CharField(blank=True, choices=[('Programlevel', 'programlevel'), ('Statementlevel', 'statementlevel')], max_length=50, null=True)),
                ('Version_Id', models.SmallIntegerField(default=0)),
                ('Feature_Version', models.SmallIntegerField(default=0)),
                ('Object_Type', models.CharField(max_length=50)),
                ('Feature_Id', models.BigAutoField(primary_key=True, serialize=False)),
                ('Feature_Name', models.CharField(max_length=100, unique=True)),
                ('Sequence', models.CharField(max_length=50)),
                ('Source_FeatureDescription', models.TextField()),
                ('Source_Code', models.TextField()),
                ('Source_Attachment', models.FileField(blank=True, null=True, upload_to='media/')),
                ('Conversion_Code', models.TextField(blank=True, null=True)),
                ('Conversion_Attachment', models.FileField(blank=True, null=True, upload_to='media/')),
                ('Target_FeatureDescription', models.TextField(blank=True, null=True)),
                ('Target_Expected_Output', models.TextField(blank=True, null=True)),
                ('Target_ActualCode', models.TextField(blank=True, null=True)),
                ('Target_Attachment', models.FileField(blank=True, null=True, upload_to='media/')),
            ],
        ),
    ]
