import discord
import asyncio
from conf import conf
from api import Api

client = discord.Client()


@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')


@client.event
async def on_message(message):
    api = Api(client=client)
    if api.handle_msg(message):
        content, embed = api.handle_msg(message)
        if embed is None:
            # 将embed消息为空的消息默认转换成embed
            embed = discord.Embed(title="", description=content, colour=0x000000)
        await client.send_message(message.channel, content=None, embed=embed)


client.run(conf.token)
