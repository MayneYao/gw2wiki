from django.db import models, transaction
from  django.contrib.postgres.fields import JSONField
import requests

import logging

_logger = logging.getLogger(__name__)


# Create your models here.

class Item(models.Model):
    api_id = models.IntegerField(verbose_name='物品id', db_index=True, unique=True)
    name = models.CharField(verbose_name='物品名', max_length=64)
    data = JSONField(verbose_name='物品详细信息')

    def __str__(self):
        return self.name

    def pull_data(self):
        local_item_ids = [item.api_id for item in Item.objects.all()]
        origin_item_ids = requests.get("https://api.guildwars2.com/v2/items").json()
        item_need_pull = [str(i) for i in set(origin_item_ids).difference(set(local_item_ids))]
        item_need_pull_all = len(item_need_pull)
        item_had_pull = 0
        while len(item_need_pull) > 0:
            i_en = requests.get(url='https://api.guildwars2.com/v2/{}'.format('items'),
                                params={'ids': ",".join(item_need_pull[:50]), 'lang': 'en'}).json()
            i_zh = requests.get(url='https://api.guildwars2.com/v2/{}'.format('items'),
                                params={'ids': ",".join(item_need_pull[:50]), 'lang': 'zh'}).json()

            for item in zip(i_zh, i_en):
                item[0]['name_en'] = item[1].get('name', None)

            item_list = []
            for i in i_zh:
                item_list.append(Item(api_id=i["id"], name=i["name"], data=i))
            try:
                with transaction.atomic():
                    Item.objects.bulk_create(item_list)
            except Exception as e:
                _logger.error(e)
                raise
            finally:
                item_had_pull += 50
                item_need_pull = item_need_pull[50:]
                _logger.info('==={}/{}'.format(item_had_pull, item_need_pull_all))
                print('==={}/{}'.format(item_had_pull, item_need_pull_all))

    def update_data(self):
        try:
            new_data = requests.get("https://api.guildwars2.com/v2/items/{}".format(self.api_id),
                                    params={'lang': 'zh'}).json()
            if new_data.get('name') != self.name:
                self.name = new_data.get('name')
            self.data = new_data
            self.save()
        except Exception as e:
            _logger.error(e)


class Recipe(models.Model):
    api_id = models.IntegerField(verbose_name='配方id')
    output_item = models.ForeignKey(to="Item", verbose_name='配方产出物品', related_name='recipe', null=True, blank=True)
    data = JSONField(verbose_name='配方详细信息')

    def __str__(self):
        return self.output_item.name

    def pull_data(self):
        local_recipe_ids = [recipe.api_id for recipe in Recipe.objects.all()]
        origin_recipe_ids = requests.get("https://api.guildwars2.com/v2/recipes").json()
        recipe_need_pull = [str(i) for i in set(origin_recipe_ids).difference(set(local_recipe_ids))]
        recipe_need_pull_all = len(recipe_need_pull)
        recipe_had_pull = 0
        while len(recipe_need_pull) > 0:
            recipes = requests.get(url='https://api.guildwars2.com/v2/{}'.format('recipes'),
                                   params={'ids': ",".join(recipe_need_pull[:50])}).json()
            recipe_list = []
            for i in recipes:
                try:
                    output_item = Item.objects.get(api_id=i["output_item_id"])
                    recipe_list.append(Recipe(api_id=i["id"], output_item=output_item, data=i))
                except Exception as e:
                    _logger.error(e)
                    recipe_list.append(Recipe(api_id=i["id"], data=i))
                    continue
            try:
                Recipe.objects.bulk_create(recipe_list)
            except Exception as e:
                _logger.error(e)
            finally:
                recipe_had_pull += 50
                recipe_need_pull = recipe_need_pull[50:]
                _logger.info('{}/{}'.format(recipe_had_pull, recipe_need_pull_all))
                print('{}/{}'.format(recipe_had_pull, recipe_need_pull_all))
