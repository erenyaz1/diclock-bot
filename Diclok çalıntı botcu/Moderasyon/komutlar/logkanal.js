const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');

exports.run =  async (client, message, args) => {
  let guild = message.guild;
	if(args[0] === "kur" || args[0] === "kurulum") {
    if (message.author.id != conf.developer) return;
        message.guild.channels.create('DICLOK MODERASYON', {type: 'category'}).then(parent => { 
            guild.channels.create(`tag-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`ban-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`jail-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`mute-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`kayıtsız-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`şüpheli-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`taşıma-information`, {type: 'text'}).then(a => a.setParent(parent.id)); 
            guild.channels.create(`bot-commands`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`mesaj-information`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`mesaj-edit`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`ses-giriş-log`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`ses-çıkış-log`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`susturma-log`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`sağırlaştırma-log`, {type: 'text'}).then(a => a.setParent(parent.id));
            guild.channels.create(`oda-değiştirme-log`, {type: 'text'}).then(a => a.setParent(parent.id));
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
    aliases: ['logkanal'],
    permLevel: 0
  }

  exports.help = {
    name: 'logkanal',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'logkanal @etiket/id İsim Yaş'
}; 