# Generated by Django 2.0.4 on 2018-04-15 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reader', '0034_licensee'),
    ]

    operations = [
        migrations.AddField(
            model_name='comic',
            name='licenses',
            field=models.ManyToManyField(blank=True, to='reader.Licensee'),
        ),
    ]
