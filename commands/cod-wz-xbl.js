const API = require('call-of-duty-api')();
const {apiauth} = require('../config/settings.json')
const Discord = require('discord.js');

module.exports = {
	name: 'cod-wz-xbl',
	description: 'cod-wz-xbl',
	args: true,
	execute(message, args) {
        let gamertag = args[0];
		API.login(apiauth.codemail, apiauth.codpass).then(()=>{
			API.MWwzstats(gamertag, API.platforms.xbl).then((data)=>{
				let username = data.username;
				let games = data.lifetime.mode.br_all.properties.gamesPlayed;
				let wins = data.lifetime.mode.br_all.properties.wins;
				let topten = data.lifetime.mode.br_all.properties.topTen;
				let topfive = data.lifetime.mode.br_all.properties.topFive;
				let revives = data.lifetime.mode.br_all.properties.revives;
				let kills = data.lifetime.mode.br_all.properties.kills;
				let downs = data.lifetime.mode.br_all.properties.downs;
				let deaths = data.lifetime.mode.br_all.properties.deaths;
				let contracts = data.lifetime.mode.br_all.properties.contracts;
				let prestige = data.prestige;
				let prestigeMaster = data.maxLevel;
				let rank = data.level;
				const wzembed = new Discord.MessageEmbed()
					.setTitle(`${username}'s Warzone stats`)
					.addFields(
						{name:':video_game: Games played', value:games, inline:true},
						{name:':newspaper: contracts completed', value:contracts, inline:true},
						{name:':crown: Wins', value:wins, inline:true},
						{name:':military_medal: times in the top 5', value:topfive, inline:true},
						{name:':medal: times in the top 10', value:topten, inline:true},
					)

					.addFields(
						{name:':knife: Kills', value:kills, inline:true},
						{name:':syringe: Downs', value:downs, inline:true},
						{name:':x: Deaths', value:deaths, inline:true},
						{name:':medical_symbol: revives', value:revives, inline:true},
					)
				
				message.channel.send(wzembed)
			}).catch((err)=>{
				console.log(err)
				message.channel.send(`there was an error searching for yourstats`);
			})
		})
    }
};