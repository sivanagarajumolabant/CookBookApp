
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
# from reactdjango.cookbook.models import *
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

import mimetypes

from reactdjango.settings import BASE_DIR, MEDIA_ROOT

from django.http import HttpResponse

import os
from importlib import import_module
import re
import sys


@api_view(['GET'])
def convert_python_code(request):
    # path_backend = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    path_backend = 'C:/projects/django/CookBook/backend'
    path_executable = path_backend + '/executable_modules/'
    sys.path.append(path_executable)
    source_code = """
    CREATE OR REPLACE PACKAGE SCHEMANAME.PACKAGENAME AS
    v1,
    v2,v3
    BEGIN
    procedure procedurename(v1)
    end;
    end;"""

    python_code = """def testdjango(source_code):
                            print("Executing the SOurce Code:",source_code)
                            print("Testing Part1")
                            print("Testing Part2")
                            print("Testing Part3")
                            data = source_code
                            return data"""
    feature_name = "testdjango"

    print('python_code is :', python_code.find("def"))

    with open(path_executable+'/'+feature_name+'.py','w') as f:
        f.write(python_code)
    path_code_main = path_executable
    print('path_code_main : ',path_code_main)
    # os.chdir(path_code_main)
    # print(os.path)

    ax = import_module(feature_name)
    # print('attribute is : ', attribute)
    data = getattr(ax,feature_name)
    print('data is : ', data)
    executableoutput = data(source_code)
    print('executableoutput is : ', executableoutput)
    dict1 = {'data': executableoutput}
    return Response(dict1)

path_backend = 'C:/projects/django/CookBook/backend'
path_executable = path_backend + '/executable_modules/'
sys.path.append(path_executable)

@api_view(['GET'])
def convert_python_code1(request, source_code, python_code, feature_name):
    with open(path_executable+'/'+feature_name+'.py','w') as f:
        f.write(python_code)
    path_code_main = path_executable
    print('path_code_main : ',path_code_main)
    # os.chdir(path_code_main)
    # print(os.path)

    ax = import_module(feature_name)
    # print('attribute is : ', attribute)
    data = getattr(ax,feature_name)
    # print('data is : ', data)
    executableoutput = data(source_code)
    dict1 = {'data': executableoutput}
    # print('executableoutput is : ', executableoutput)
    # return Response(executableoutput)
    return Response(dict1)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def migrationtypes(request):
    dict1 = {'oracle':1,'Mysql':2,'sqlserver':3}
    return Response(dict1)


@api_view(['GET'])
def fol(request,id):
    features1 = Feature.objects.filter(Object_Type='Procedure', Migration_TypeId=id)
    serializer1 = migrationlevelfeatures(features1,many=True)
    features1 = Feature.objects.filter(Object_Type='Function', Migration_TypeId=id)
    serializer2 = migrationlevelfeatures(features1,many=True)
    features1 = Feature.objects.filter(Object_Type='Package', Migration_TypeId=id)
    serializer3 = migrationlevelfeatures(features1,many=True)
    # return Response({'procedures':serializer1.data,'functions':serializer2.data,'Packages':serializer3.data})
    dict1 = {1: {'Label': 'Procedures', 'subMenu': serializer1.data},
             2: {'Label': 'Functions', 'subMenu': serializer2.data},
             3: {'Label': 'Packages', 'subMenu': serializer3.data}}
    return Response(dict1.values())

@api_view(['GET'])
def sequence(request, Object_Type):
# class sequence(generics.ListAPIView, Object_Type):
    features1 = Feature.objects.filter(Object_Type=Object_Type)
    serializer = SequenceSerializer(features1,many=True)
    dict1 = [serializer.data]
    return Response(dict1)

def download_file(request, file_name):
# def download_file(request):
    # fill these variables with real values
    fl_path = MEDIA_ROOT + '/media/'
    # fl_path = MEDIA_ROOT
    # filename = fl_path +'/COOKBOOK.docx'
    filename = fl_path +file_name
    # filename1 = 'test1.txt'
    filename1 = filename
    fl = open(filename, 'r',encoding='cp850')
    mime_type, _ = mimetypes.guess_type(fl_path)
    response = HttpResponse(fl, content_type=mime_type)
    response['Content-Disposition'] = "attachment; filename=%s" % filename1
    return response

@api_view(['GET'])
def Featuredetail(request,id):
    features = Feature.objects.get(Feature_Id=id)
    serializer = FeatureSerializer(features)
    dict1 = [serializer.data]
    return Response(dict1)


class featureslist(generics.ListAPIView):
        queryset = Feature.objects.all()
        serializer_class= FeatureSerializer

class Featurecreate(generics.CreateAPIView):
        queryset = Feature.objects.all()
        serializer_class = commonSerializer

class Featuredelete(generics.RetrieveDestroyAPIView):
        queryset = Feature.objects.all()
        serializer_class = commonSerializer

class Featureupdate(generics.RetrieveUpdateAPIView):
        parser_classes = (MultiPartParser, FormParser, JSONParser)
        queryset = Feature.objects.all()
        serializer_class = commonSerializer
