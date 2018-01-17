import requests
import requests_cache
import discord
import json
from  datetime import datetime

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
    def get_daily_qyt():
        data_dict = {
            0: "[&BIgHAAA=][&BEwDAAA=][&BKYBAAA=] [&BA8CAAA=][&BNIEAAA=][&BIMCAAA=]",
            1: "[&BKgCAAA=][&BEgAAAA=][&BGQCAAA=] [&BIMBAAA=][&BH8HAAA=][&BBkAAAA=]",
            2: "[&BCEDAAA=][&BLQDAAA=][&BLQAAAA=] [&BPEBAAA=][&BH4HAAA=][&BKYAAAA=]",
            3: "[&BO4CAAA=][&BE8AAAA=][&BF0GAAA=] [&BOQBAAA=][&BK8HAAA=][&BIMAAAA=]",
            4: "[&BNMAAAA=][&BHsBAAA=][&BKgCAAA=] [&BNUGAAA=][&BJQHAAA=][&BMwCAAA=]",
            5: "[&BNMCAAA=][&BJIBAAA=][&BF8BAAA=] [&BFMCAAA=][&BB8DAAA=][&BH8HAAA=]",
            6: "[&BIYHAAA=][&BO4CAAA=][&BCECAAA=] [&BIUCAAA=][&BDoBAAA=][&BC0AAAA=]",
        }
        today = datetime.today()
        return "今日补给官传送点\n{}".format(data_dict.get(today.weekday()))

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

    def areyouok(self, *args):
        """
        if you are ok i will get you mi band
        """
        return ("i'm ok,give me mi band", None)

    def help(self, arg):
        """
        返回关于机器人的指令
        """
        if arg:
            try:
                action = self.__getattribute__(*arg)
                return (action.__doc__, None)
            except:
                return ("没有这个指令", None)

        else:
            method_list = [func for func in dir(self) if callable(getattr(self, func)) and not func.startswith("__")]

            docs = []

            for method in method_list:
                action = self.__getattribute__(method)
                if action.__doc__:
                    docs.append("{}:\n{}".format(action.__name__, action.__doc__))
            help_info = "\n".join(docs)
            return (help_info, None)


    def update(self):
        """
        更新gw2.wiki数据
        """
        url = "http://gw2.wiki/update/"
        res = requests.get(url).json()
        if res['msg'] == "success":
            return ("数据更新完毕", None)
        else:
            return ("数据更新失败", None)

    def item(self, item_id):
        """
        返回物品信息
        """

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
        """
        返回关于物品的配方信息
        """
        pass

    def meta(self):
        """
        返回当前主流meta build
        """
        pass

    def daily(self, arg):
        """
        返回日常信息
            pve 返回当天pve日常任务
            pvp 返回当天pvp日常任务
            wvw 返回当天wvw日常任务
            fractals/碎层 返回当天迷雾碎层任务
            契约团 返回当天补给官就近传送点
        """
        now = datetime.now()
        end = datetime(now.year, now.month, now.day, 23, 59, 59)
        expire_after = end - now
        requests_cache.install_cache('.daily.cache', expire_after=expire_after)
        daily = requests.get("https://api.guildwars2.com/v2/achievements/daily").json()
        res = []
        if arg:
            for _type in arg:
                res.append({
                               "pve": self.get_daily_by_type(daily, 'pve'),
                               "pvp": self.get_daily_by_type(daily, 'pvp'),
                               "wvw": self.get_daily_by_type(daily, 'wvw'),
                               "碎层": self.get_daily_by_type(daily, 'fractals'),
                               "fractals": self.get_daily_by_type(daily, 'fractals'),
                               "契约团": self.get_daily_qyt()
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

    def wiki(self, arg):
        """
        wiki xxx 返回wiki内关于xxx的词条
        """
        pass

    def boss(self, arg):
        """
        返回当前时间段世界boss的刷新情况
        """
        with open("data/data.json", 'r', encoding="utf-8") as f:
            boss_data = json.load(f)
            if arg:
                pass
            else:
                now = datetime.now()
                cur_boss = []
                pass_boss = []
                year = now.year
                month = now.month
                day = now.day
                for name, boss_data in boss_data.items():
                    for dtime in boss_data["time"]:
                        boss_time = dtime.split(":")
                        hour = int(boss_time[0])
                        minu = int(boss_time[1])
                        sencond = int(boss_time[2])
                        time_delta = (datetime(year, month, day, hour, minu,
                                               sencond) - datetime.now()).total_seconds() // 60
                        time_delta = int(time_delta)

                        if 0 < time_delta < 30:
                            cur_boss.append("距离{0}开始，还有{1}分钟——{2}{3}".format(boss_data["c_name"], time_delta,
                                                                             boss_data['waypoint']['name'],
                                                                             boss_data['waypoint']['chat_link']))
                        elif -15 < time_delta < 0:
                            pass_boss.append("{0}已经刷新{1}分钟啦——{2}{3}".format(boss_data["c_name"], abs(time_delta),
                                                                            boss_data['waypoint']['name'],
                                                                            boss_data['waypoint']['chat_link']))
                cur_boss.extend(pass_boss)
                return ("\n".join(cur_boss), None)
