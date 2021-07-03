const { botsettings } = require('./config/settings.json');
const logger = require('./config/logger');
const API = require('call-of-duty-api')();
const fs = require('fs');
const path = require('path');
const {userdb} =require('./config/db')
const Discord = require('discord.js');
const { DiscordTogether } = require('discord-together');
const { prefix, token } = botsettings;
const fetch = require('node-fetch')
const client = new Discord.Client();
client.discordTogether = new DiscordTogether(client);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	logger.success('Ready!');
});
//Youtube theater
client.on('message', async message => {
    if (message.content === '!yttheater') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        };
    };
});
//VC Poker
client.on('message', async message => {
    if (message.content === '!vcpoker') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        };
    };
});
//VC Chess
client.on('message', async message => {
    if (message.content === '!vcchess') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        };
    };
});

//VC Fishing
client.on('message', async message => {
    if (message.content === '!vcfishing') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        };
    };
});
//cmdhandler
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
userdb.loadDatabase();
client.login(token);
