from ReactDjango.cookbookapi.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.
class featureslist1(APIView):
    def get(self,request):
        features1 = Feature.objects.all()
        serializer= featurelistSerializer(features1, many=True)
        return Response(serializer.data)