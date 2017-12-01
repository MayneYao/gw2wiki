from django.shortcuts import render

from  api.models import Item, Recipe
# Create your views here.

from django_filters.rest_framework import DjangoFilterBackend, filters
from rest_framework import filters
from rest_framework import viewsets, serializers
from rest_framework.decorators import detail_route
from django.contrib.postgres.search import SearchVector


def index(request):
    return render(request, 'index.html')


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ('data', 'recipe')


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-id')
    serializer_class = ItemSerializer

    filter_backends = (filters.SearchFilter,)

    search_fields = ('name',)
    lookup_field = 'api_id'

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """

        qs = self.queryset.order_by('-id')
        ids = self.request.query_params.get('ids', None)
        if ids:
            ids = [int(i) for i in ids.split(",")]
            qs = qs.filter(api_id__in=ids).order_by('-id')

        qword = self.request.query_params.get('q', None)
        if qword:
            qs = qs.filter(data__name_en__icontains=qword) | qs.filter(name__icontains=qword)
            qs = qs.order_by("-id")

        return qs


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        fields = ('data',)


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-id')
    serializer_class = RecipeSerializer
