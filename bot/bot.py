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
    res = api.handle_msg(message)
    print(res)
    return_msg = api.handle_msg(message)
    await client.send_message(message.channel, embed=return_msg)


client.run(conf.token)
