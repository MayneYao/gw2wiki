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
        await client.send_message(message.channel, content=content, embed=embed)


client.run(conf.token)
