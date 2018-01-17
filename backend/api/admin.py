from django.contrib import admin

# Register your models here.
import os
import mwclient
import json
from configparser import ConfigParser

from django.conf import settings
from api.models import Item

conf = ConfigParser()
conf.read(os.path.join(settings.BASE_DIR, 'conf.ini'))

username = conf.get('WIKI', 'username')
password = conf.get('WIKI', 'password')


class WikiBot():
    def __init__(self):
        self.site = mwclient.Site('gw2.huijiwiki.com')
        self.site.login(username, password)
        self.done_items = []
        self.failed_items = []

    def upload_all_items(self):
        all_items = Item.objects.filter(api_id__gt=38996)

        try:
            for item in all_items:
                wiki_name = 'Data:item/{}.json'.format(item.api_id or item.data['id'])
                wiki_content = json.dumps(item.data, ensure_ascii=False)

                page = self.site.pages[wiki_name]
                if not page.exists:
                    page.save(wiki_content, 'upload item data by bot')
                    print('item:{}-{}上传完毕'.format(item.data['id'], item.data['name']))
                else:
                    print('item:{}-{}已经存在'.format(item.data['id'], item.data['name']))

                self.done_items.append(item.id)
        except Exception as e:
            print(e)
            with open('a.txt', 'w') as f:
                f.write(','.join(self.done_items))
            print("未知错误")
