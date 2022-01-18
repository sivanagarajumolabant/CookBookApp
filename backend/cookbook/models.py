from django.db import models

# Create your models here.
class Feature(models.Model):
    # choices = [
    #     ('Function', 'function'),
    #     ('Procedure', 'procedure'),
    #     ('Package', 'package')
    # ]
    # migration_type = [
    #     ('1', 'oracle'),
    #     ('2', 'ssql'),
    #     ('3', 'mysql')
    # ]
    # object_type = models.CharField(max_length=50, choices=choices, default='function')
    # feature_name = models.CharField(max_length=100)
    # Oracle_FeatureDescription = models.TextField()
    # Oracle_Attachment = models.FileField(upload_to='media/', blank=True, null=True)
    # Oracle_Code = models.TextField()
    # Postgres_FeatureDescription = models.TextField()
    # Postgres_Attachment = models.FileField(upload_to='media/', blank=True, null=True)
    # Postgres_Expected_Output = models.TextField()
    # Conversion_Code = models.TextField()
    # Conversion_Code_text = models.FileField(upload_to='media/', blank=True, null=True)
    # Postgres_ActualCode = models.TextField()
    #
    #
    choices = [
        ('Programlevel', 'programlevel'),
        ('Statementlevel', 'statementlevel'),
    ]
    Migration_TypeId = models.CharField(max_length=50)
    Level = models.CharField(max_length=50, choices=choices, null=True, blank=True)
    Version_Id = models.SmallIntegerField(default=0)
    Feature_Version = models.SmallIntegerField(default=0)
    Object_Type = models.CharField(max_length=50)
    Feature_Id = models.BigAutoField(primary_key=True)
    Feature_Name = models.CharField(max_length=100, unique=True)
    Sequence_Number = models.SmallIntegerField(null=True, blank=True)
    Source_FeatureDescription = models.TextField()
    Source_Code = models.TextField()
    Conversion_Description = models.TextField()
    Conversion_Code = models.TextField()
    Target_FeatureDescription = models.TextField()
    Target_Expected_Output = models.TextField()
    Target_ActualCode = models.TextField()

    def save(self, *args, **kwargs):
        self.Version_Id = self.Version_Id + 1
        self.Feature_Version = self.Feature_Version + 1
        super().save(*args, **kwargs)

    @property
    def upload_files(self):
        return self.upload_file_set.all()

class Upload_file(models.Model):
    # Feature_Id = models.ForeignKey(Feature, on_delete=models.CASCADE, related_name='feature', null=True)
    Feature_Id = models.ForeignKey(Feature, on_delete=models.CASCADE, null=True)
    Source_Attachment = models.FileField(upload_to='media/', blank=True, null=True)
    Conversion_Attachment = models.FileField(upload_to='media/', blank=True, null=True)
    Target_Attachment = models.FileField(upload_to='media/', blank=True, null=True)
