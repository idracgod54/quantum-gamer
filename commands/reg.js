const {userdb} = require('../config/db')
const logger = require('../config/logger');
module.exports = {
	name: 'reg',
	description: 'register your discord name with gamertag',
	args: true,
	execute(message, args) {
        const {author } = message
        const {id } = author
        let usereg ={
            discordid: id,
            gertag: args[0],
            platform: args[1],
            Game: args[2]
        }
        userdb.insert(usereg, function(err, newDoc){
            logger.success(`${newDoc}`);
            message.channel.send(`user registered ${usereg.gertag} platform ${usereg.platform}, game: ${usereg.Game}`)
        })
	},
};