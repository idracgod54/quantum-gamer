const logger = require('./logger');
path = require('path')
var Datastore = require('nedb'); 
module.exports.userdb = new Datastore('user.db'); 
