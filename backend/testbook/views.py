import io

from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
# from ReactDjango.cookbook.models import *
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
# Create your views here.

from django.contrib.auth.models import User
from rest_framework import viewsets
# from .serializers import RegisterSerializer
from django.views.decorators.csrf import csrf_exempt


# from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.http import Http404
from rest_framework import status, permissions

from collections import namedtuple
class Files_APIView_Detail(APIView):
    #
    # def get_object(self, pk):
    #     try:
    #         return Feature.objects.get(pk=pk)
    #     except Feature.DoesNotExist:
    #         raise Http404
    #
    # def get(self, request, pk, format=None):
    #     file = self.get_object(pk)
    #     serializer = FileSerializer(file)
    #     return Response(serializer.data)
    #
    def put(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = FileSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk, format=None):
    #     file = self.get_object(pk)
    #     file.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
# from drf_multiple_model.views import ObjectMultipleModelAPIView
#
# class TextAPIView(ObjectMultipleModelAPIView):
#     querylist = [
#         {'queryset': {'Feature', 'upload_files'},'serializer_class': FeatureSerializer},
#         # {'queryset': Poem.objects.filter(style='Sonnet'), 'serializer_class': PoemSerializer},
#         # ....
#     ]

# class FeatureListView(generics.CreateAPIView):
#     # queryset = Feature.objects.prefetch_related('feature').all()
#     queryset = Feature.objects.prefetch_related('upload_files').all()
#     serializer_class = commonSerializer

# class VehiclesListView(generics.ListAPIView):
#     def list(self, request, *args, **kwargs):
#         feature = Feature.objects.values('Migration_TypeId', 'Version_Id', 'Object_Type',
#                                          'Feature_Id', 'Feature_Name', 'Source_FeatureDescription',
#                                          'Source_Code', 'Conversion_Description', 'Conversion_Code',
#                                          'Target_FeatureDescription', 'Target_Expected_Output',
#                                          'Target_ActualCode')
#         upload = Upload_file.objects.values('Feature_Id', 'Source_Attachment',
#                                                    'Conversion_Attachment', 'Target_Attachment')
#
#         out = {
#             'feature': feature,
#             'upload': upload,
#             # 'bikes': bikes,
#         }
#         return Response(out)
#
#
# class VehiclesListView1(generics.RetrieveDestroyAPIView):
#     queryset = Feature.objects.all()
#     # queryset = Upload_file.objects.all()
#     serializer_class = commonSerializer


# @api_view(['GET'])
# def multiplemodels(request):
#     features= Feature.objects.all()
#     feature_uplaods= Upload_file.objects.all()
#     features_serializer = featurelistSerializer(features,many=True)
#     uplaodfile_serializer= upload_fileSerializer(feature_uplaods,many=True)
#     total_ser = features_serializer.data+uplaodfile_serializer.data
#     return Response(total_ser)

# class upload_files(generics.ListAPIView):
#     queryset = Upload_file.objects.all()
#     serializer_class = upload_fileSerializer

# @csrf_exempt
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

#
# @api_view(['GET'])
# def featuresobjectlevel(request):
#     features1 = Feature.objects.filter(Object_Type='Procedure', Migration_TypeId='1')
#     serializer1 = migrationlevelfeatures(features1,many=True)
#     features1 = Feature.objects.filter(Object_Type='Function', Migration_TypeId='1')
#     serializer2 = migrationlevelfeatures(features1,many=True)
#     features1 = Feature.objects.filter(Object_Type='Package', Migration_TypeId='1')
#     serializer3 = migrationlevelfeatures(features1,many=True)
#     dict1 = {1:{'Label':'Procedures','subMenu':serializer1.data},2:{'Label':'Functions','subMenu':serializer2.data},3:{'Label':'Packages','subMenu':serializer3.data}}
#     return Response(dict1.values())



# @api_view(['GET'])
# def featuresobjectlevel(request):
#     features1 = Feature.objects.filter(Object_Type='Procedure', Migration_TypeId='1')
#     serializer1 = migrationlevelfeatures(features1,many=True)
#     features1 = Feature.objects.filter(Object_Type='Function', Migration_TypeId='1')
#     serializer2 = migrationlevelfeatures(features1,many=True)
#     features1 = Feature.objects.filter(Object_Type='Package', Migration_TypeId='1')
#     serializer3 = migrationlevelfeatures(features1,many=True)
#     return Response({'procedures':serializer1.data,'functions':serializer2.data,'Packages':serializer3.data})

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
def Featuredetail(request,id):
    features = Feature.objects.get(Feature_Id=id)
    # serializer1 = PostSerializer(features1)
    serializer = FeatureSerializer(features)
    dict1 = [serializer.data]
    return Response(dict1)

# @api_view(['GET'])
# def FDD(request,id):
#     features1 = Feature.objects.get(Feature_Id=id)
#     serializer1 = PostSerializer(features1)
#     dict1 = [serializer1.data]
#     return Response(dict1)
#
# Timeline = namedtuple('Timeline', ('uploadss', 'features'))
#
# class TimelineViewSet(viewsets.ViewSet):
#     def list(self, request):
#         timeline = Timeline(
#             uploadss=Upload_file.objects.all(),
#             features=Feature.objects.all(),
#         )
#         serializer=commonSerializer(timeline)
#         return Response(serializer.data)

# @api_view(['GET'])
# def FU(generics.RetrieveUpdateAPIView, id):
#     features1 = Feature.objects.get(Feature_Id=id)
#     serializer1 = PostSerializer(features1)
#     if form.is_valid():
#         up_data = form.save()
#         # up_data.status = 0
#         return Response(up_data)

# class migrationtype(generics.ListAPIView):
#         queryset = Feature.objects.all().values('Migration_TypeId').distinct()
#         serializer_class = migrationtype

class featureslist(generics.ListAPIView):
        queryset = Feature.objects.all()
        # queryset = Feature.objects.prefetch_related('upload_files').all()
        # serializer_class= featurelistSerializer
        serializer_class= FeatureSerializer

# class migrationlevelobjects1(generics.ListAPIView):
#         queryset = Feature.objects.filter(Migration_TypeId='1')
#         serializer_class= migrationlevelfeatures1

# class function(generics.ListAPIView):
#         queryset = Feature.objects.filter(Object_Type='Function', Migration_TypeId='1')
#         serializer_class= featurenameSerializer
#
# class package(generics.ListAPIView):
#         queryset = Feature.objects.filter(Object_Type='Package', Migration_TypeId='1')
#         serializer_class= featurenameSerializer
#
# class procedure(generics.ListAPIView):
#         queryset = Feature.objects.filter(Object_Type='Procedure', Migration_TypeId='1')
#         serializer_class= featurenameSerializer

class Featurecreate(generics.CreateAPIView):
        # queryset = Feature.objects.all()
        # serializer_class = PostSerializer
        # serializer_class = FeatureSerializer
        queryset = Feature.objects.all()
        # serializer_class = FeatureSerializer
        serializer_class = commonSerializer

class Featuredelete(generics.RetrieveDestroyAPIView):
        queryset = Feature.objects.all()
        # serializer_class = PostSerializer
        # queryset = Feature.objects.prefetch_related('upload_files').all()
        # serializer_class = FeatureSerializer
        serializer_class = commonSerializer

def convertapi(data):
    data = io.StringIO(data)
    # def convsersion(data):





# class Featurecreate1(generics.CreateAPIView):
#     queryset = Feature.objects.select_related('upload_file')
#     serializer_class = PostSerializer1

# class Featuredetail(generics.RetrieveAPIView):
#         queryset = Feature.objects.all()
#         serializer_class = PostSerializer
#         # dict1 = {serializer_class}


class Featureupdate(generics.RetrieveUpdateAPIView):
        parser_classes = (MultiPartParser, FormParser, JSONParser)
        queryset = Feature.objects.all()
        # queryset = Feature.objects.prefetch_related('upload_files').all()
        # serializer_class = PostSerializer
        # serializer_class = FeatureSerializer
        serializer_class = commonSerializer
#
# def registerPage(request):
#     form = UserCreationForm()
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         print(form)
#         if form.is_valid():
#             form.save()
#             user = form.cleaned_data.get('username')
#             messages.success(request, 'Account was created for ' + user)
#             return redirect('login')
#
#     context = {'form': form}
#     return render(request, 'register.html', context)

#
# def loginPage(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#
#         user = authenticate(request, username=username, password=password)
#         print('entered in to login view')
#         if user is not None:
#             login(request, user)
#             return redirect('features_list')
#         else:
#             messages.info(request, 'Username OR password is incorrect')
#
#     context = {}
#     return render(request, 'login.html', context)


# def logoutpage(request):
#     logout(request)
#     return redirect('login')

# class ModelACreateAPIView(generics.CreateAPIView):
#     """
#     Create a new ModelA entry with ModelB entry
#     """
#     queryset = Feature.objects.all()
#     serializer_class = FSerializer