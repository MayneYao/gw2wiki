from configparser import ConfigParser

conf = ConfigParser()
conf.read('conf.ini')


class BaseConf():
    def __init__(self):
        self.token = conf.get("INFO", "TOKEN")


conf = BaseConf()
