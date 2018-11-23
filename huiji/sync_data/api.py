import json
from configparser import ConfigParser

import mwclient
import requests

conf = ConfigParser()
conf.read('conf.ini')

username = conf.get('WIKI', 'username')
password = conf.get('WIKI', 'password')


class WikiBot():
    def __init__(self):
        self.site = mwclient.Site('gw2.huijiwiki.com')
        self.site.login(username, password)
        self.need_sync_item_ids = set()
        self.need_sync_skill_ids = set()
        self.need_sync_achievement_ids = set()

    def get_wiki_last_id(self, data_type):
        url = 'https://gw2.huijiwiki.com/api/rest_v1/namespace/data?filter=%7B%22_id%22%3A%7B%22%24regex%22%3A%22%5EData%3A{}%22%7D%7D&sort_by=-id&page=1&pagesize=1'.format(
            data_type.title())
        last_info = requests.get(url).json()
        last_id = last_info['_embedded'][0]["id"]
        return last_id

    def get_sync_ids(self, data_type, init=False):
        if init:
            all_data_ids = requests.get("https://api.guildwars2.com/v2/{}s".format(data_type)).json()
            return all_data_ids
        else:
            all_data_ids = requests.get("https://api.guildwars2.com/v2/{}s".format(data_type)).json()
            last_id = self.get_wiki_last_id(data_type)
            index_of_last = all_data_ids.index(last_id)
            need_sync_data_ids = sorted(set(all_data_ids[index_of_last + 1:]))
            self.need_sync_skill_ids = need_sync_data_ids
            self.__setattr__('need_sync_{}_ids'.format(data_type), need_sync_data_ids)
            return need_sync_data_ids

    def get_and_upload_data(self, data_type, data_id):
        wiki_name = 'Data:{}/{}.json'.format(data_type.title(), data_id)

        # 获取skill data en
        data_en = requests.get("https://api.guildwars2.com/v2/{}s/{}".format(data_type, data_id)).json()
        # 获取skill data zh
        data = requests.get("https://api.guildwars2.com/v2/{}s/{}?lang=zh".format(data_type, data_id)).json()
        # 组合skill data

        # 拥有name属性的data处理
        if 'name' in data:
            data.update({
                "name_en": data_en["name"]
            })

        self.upload_data(wiki_name, data)

    def upload_data(self, wiki_name, data):
        wiki_content = json.dumps(data, ensure_ascii=False)
        page = self.site.pages[wiki_name]
        if not page.exists:
            page.save(wiki_content, 'upload data by bot')
            print('{}-上传成功'.format(wiki_name))
        else:
            print('{}-已经存在'.format(wiki_name))

    def get_wiki_last_skill(self):
        url = 'https://gw2.huijiwiki.com/api/rest_v1/namespace/data?filter=%7B%22_id%22%3A%7B%22%24regex%22%3A%22%5EData%3ASkill%22%7D%7D&sort_by=-id&page=1&pagesize=1'
        last_skill_info = requests.get(url).json()
        try:
            last_skill_id = last_skill_info['_embedded'][0]["id"]
        except:
            last_skill_id = 13120
        return last_skill_id

    def get_sync_skills(self):
        all_skills = requests.get("https://api.guildwars2.com/v2/skills").json()
        last_skill_id = self.get_wiki_last_skill()
        index_of_last = all_skills.index(last_skill_id)
        need_sync_skills = sorted(set(all_skills[index_of_last + 1:]))
        self.need_sync_skill_ids = need_sync_skills

    def sync_skill(self, skill_id):
        wiki_name = 'Data:Skill/{}.json'.format(skill_id)

        # 获取skill data en
        skill_en = requests.get("https://api.guildwars2.com/v2/skills/{}".format(skill_id)).json()
        # 获取skill data zh
        skill = requests.get("https://api.guildwars2.com/v2/skills/{}?lang=zh".format(skill_id)).json()
        # 组合skill data
        skill.update({
            "name_en": skill_en["name"]
        })
        wiki_content = json.dumps(skill, ensure_ascii=False)
        page = self.site.pages[wiki_name]
        if not page.exists:
            page.save(wiki_content, 'upload skill data by bot')
            print('skill:{}-{}上传完毕'.format(skill['id'], skill['name']))
        else:
            print('skill:{}-{}已经存在'.format(skill['id'], skill['name']))

    def get_wiki_last_item(self):
        last_item_info = requests.get(
            "https://gw2.huijiwiki.com/api/rest_v1/namespace/data?sort_by=-id&page=1&pagesize=1").json()
        last_item_id = last_item_info['_embedded'][0]["id"]
        return last_item_id

    def get_sync_items(self):
        all_items = requests.get("https://api.guildwars2.com/v2/items").json()
        last_item_id = self.get_wiki_last_item()
        index_of_last = all_items.index(last_item_id)
        need_sync_items = sorted(set(all_items[index_of_last + 1:]))
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
    # bot.get_sync_items()
    # for item_id in bot.need_sync_item_ids:
    #     bot.sync_item(item_id)

    # bot.get_sync_skills()
    # for skill_id in bot.need_sync_skill_ids:
    #     bot.sync_skill(skill_id)
    need_sync_data_ids = bot.get_sync_ids(data_type='trait', init=True)

    for i in need_sync_data_ids:
        bot.get_and_upload_data(data_type='trait', data_id=i)
