const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');

exports.run =  async (client, message, args) => {
  let guild = message.guild;
	if(args[0] === "kur" || args[0] === "kurulum") {
    if (message.author.id != conf.developer) return;
        message.guild.channels.create('DICLOK Shield', {type: 'category'}).then(parent => { 
            guild.channels.create(`Database-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`Shield-information`, {type: 'text'}).then(a => a.setParent(parent.id));

            parent.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone"), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
               })
        


             //////////////////////////////////////////////////////////////////////////////

             //////////////////////////////////////////////////////////////////////////////

    return;



});


    }}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['guardlog'],
    permLevel: 0
  }

  exports.help = {
    name: 'guardlog',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'guardlog @etiket/id İsim Yaş'
}; 