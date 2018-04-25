# Generated by Django 2.0.2 on 2018-03-12 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reader', '0012_auto_20180312_0111'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='joint',
            name='members',
        ),
        migrations.RemoveField(
            model_name='chapter',
            name='joint',
        ),
        migrations.AlterField(
            model_name='chapter',
            name='slug',
            field=models.SlugField(help_text='Changing this could potentially break image paths and other URLs', unique=True),
        ),
        migrations.RemoveField(
            model_name='chapter',
            name='team',
        ),
        migrations.AddField(
            model_name='chapter',
            name='team',
            field=models.ManyToManyField(blank=True, to='reader.Team'),
        ),
        migrations.AddField(
            model_name='comic',
            name='language',
            field=models.CharField(default='en', max_length=3),
        ),
        migrations.AlterField(
            model_name='comic',
            name='slug',
            field=models.SlugField(help_text='Changing this could potentially break image paths and other URLs', unique=True),
        ),
        migrations.AlterField(
            model_name='page',
            name='height',
            field=models.PositiveSmallIntegerField(editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='page',
            name='mime',
            field=models.CharField(editable=False, max_length=16, null=True),
        ),
        migrations.AlterField(
            model_name='page',
            name='size',
            field=models.PositiveIntegerField(editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='page',
            name='width',
            field=models.PositiveSmallIntegerField(editable=False, null=True),
        ),
        migrations.DeleteModel(
            name='Joint',
        ),
    ]
