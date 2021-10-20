//Requirements
const fs = require('fs');
const Discord = require('discord.js');
const DisTube = require('distube');
const config = require('./config.json');
const prefix = config.prefix;
const token = config.token;
const client = new Discord.Client({
	intents: [
		'GUILDS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
	],
})

//const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.once('ready', () => {
	console.log('Ready at Your Service!')
})
client.on('ready', function() {
	client.user.setActivity(config.activity, { type: config.activityType });
  });

//Use Your Command Here
client.on('message', async(message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(command == 'ping'){
		client.commands.get('ping').execute(message, args)
	}
}) 

client.login(token)