const Discord = require('discord.js')
const DisTube = require('distube')
const { prefix, token } = require('./config.json')
const client = new Discord.Client({
	intents: [
		'GUILDS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
	],
})

client.once('ready', () => {
	console.log('Logged in!')
})

client.login(process.env.BOT_TOKEN);
