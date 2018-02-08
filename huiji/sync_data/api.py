import os
import mwclient
import json
import requests
from configparser import ConfigParser

conf = ConfigParser()
conf.read('conf.ini')

username = conf.get('WIKI', 'username')
password = conf.get('WIKI', 'password')


class WikiBot():
    def __init__(self):
        self.site = mwclient.Site('gw2.huijiwiki.com')
        self.site.login(username, password)
        self.need_sync_item_ids = set()

    def get_wiki_last_item(self):
        last_item_info = requests.get(
            "https://gw2.huijiwiki.com/api/rest_v1/namespace/data?sort_by=-id&page=1&pagesize=1").json()
        last_item_id = last_item_info['_embedded'][0]["id"]
        return last_item_id

    def get_sync_items(self):
        all_items = requests.get("https://api.guildwars2.com/v2/items").json()
        last_item_id = self.get_wiki_last_item()
        index_of_last = all_items.index(last_item_id)
        need_sync_items = set(all_items[index_of_last + 1:])
        self.need_sync_item_ids = need_sync_items

    def sync_item(self, item_id):
        wiki_name = 'Data:item/{}.json'.format(item_id)

        # 获取item data en
        item_en = requests.get("https://api.guildwars2.com/v2/items/{}".format(item_id)).json()
        # 获取item data zh
        item = requests.get("https://api.guildwars2.com/v2/items/{}?lang=zh".format(item_id)).json()
        # 组合item data
        item.update({
            "name_en": item_en["name"]
        })
        wiki_content = json.dumps(item, ensure_ascii=False)
        page = self.site.pages[wiki_name]
        if not page.exists:
            page.save(wiki_content, 'upload item data by bot')
            print('item:{}-{}上传完毕'.format(item['id'], item['name']))
        else:
            print('item:{}-{}已经存在'.format(item['id'], item['name']))


if __name__ == '__main__':
    bot = WikiBot()
    bot.get_sync_items()
    for item_id in bot.need_sync_item_ids:
        bot.sync_item(item_id)