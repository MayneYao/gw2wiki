import requests
import requests_cache
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

    @staticmethod
    def get_daily_by_type(daily, _type):
        ids = ",".join([str(item['id']) for item in daily[_type]])

        json = requests.get('https://api.guildwars2.com/v2/achievements', params={
            'ids': ids,
            'lang': 'zh'
        }).json()

        res = "\n".join([item['name'] for item in json])
        return res

    def handle_msg(self, message):
        msg = message.content
        if msg.startswith("$"):
            action, *arg = msg[1:].split(" ")
            print(msg[1:].split(" "))
            print(action, *arg)

            func = self.__getattribute__(action)
            if func:
                return func(arg)
        else:
            return False

    def test(self, *args):
        return ("test is ok", None)

    def item(self, item_id):
        # todo 通过 中英文名称，聊天代码来检索
        url = "http://gw2.wiki/api/items/{}".format(*item_id)
        res = requests.get(url).json()
        item = res['data']
        em = discord.Embed(title="{}({})".format(item['name'], item['name_en']),
                           description=item['description'] if 'description' in item else None,
                           colour=color_map.get(item['rarity']),
                           # url="htttp://gw2.wiki/#/recipe/{}".format(*item_id) if len(res['recipe']) else None
                           )
        em.set_image(url=item['icon'])
        return (None, em)

    def recipe(self, arg):
        pass

    def meta(self):
        pass

    def daily(self, arg):
        # todo 缓存过期处理
        requests_cache.install_cache('.daily.cache')
        daily = requests.get("https://api.guildwars2.com/v2/achievements/daily").json()
        res = []
        if arg:
            for _type in arg:
                res.append({
                               "pve": self.get_daily_by_type(daily, 'pve'),
                               "pvp": self.get_daily_by_type(daily, 'pvp'),
                               "wvw": self.get_daily_by_type(daily, 'wvw'),
                               "fractals": self.get_daily_by_type(daily, 'fractals'),
                           }.get(_type))
        else:
            pve = self.get_daily_by_type(daily, 'pve')
            pvp = self.get_daily_by_type(daily, 'pvp')
            wvw = self.get_daily_by_type(daily, 'wvw')
            fractals = self.get_daily_by_type(daily, 'fractals')
            res = [pve, pvp, wvw, fractals]

        return ('\n-------\n'.join(res), None)

    def rm_cache(self, arg):
        pass



    # todo 契约团
