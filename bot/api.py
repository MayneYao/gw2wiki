import requests
import discord

# 每个method对应一条指令，返回关于指令的结果。
# method name 即指令名



color_map = {
    'Junk': 0xAAAAAA,
    'Basic': 0x000000,
    'Fine': 0x62A4DA,
    'Masterwork': 0x1a9306,
    'Rare': 0xfcd00b,
    'Exotic': 0xffa405,
    'Ascended': 0xfb3e8d,
    'Legendary': 0x4C139D

}


class Api():
    def __init__(self, client):
        self.client = client

    def handle_msg(self, message):
        msg = message.content
        if msg.startswith("$"):
            action, *arg = msg[1:].split(" ")
            print(msg[1:].split(" "))
            print(action, *arg)

            func = self.__getattribute__(action)
            if func:
                return func(arg)

    def test(self, *args):
        return "test is ok"

    def item(self, item_id):
        url = "http://gw2.wiki/api/items/{}".format(*item_id)
        res = requests.get(url).json()
        item = res['data']
        em = discord.Embed(title="{}({})".format(item['name'], item['name_en']),
                           description=item['description'] if 'description' in item else None,
                           colour=color_map.get(item['rarity']))
        em.set_image(url=item['icon'])
        # em.set_author(name=sl, icon_url=self.client.user.default_avatar_url)
        # em.add_field(name="测试", value="测试卡片", inline=True)
        # return res['data']['name']
        return em

    def recipe(self, item):
        pass

    def meta(self):
        pass
