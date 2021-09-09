const Discord = require("discord.js");
const diclog = require('../conlok.json')

exports.run = async (client, message, args) => {


    const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentioned) return message.channel.send(new Discord.MessageEmbed().setDescription(`${emojis.get("kullaniciyok").value()} Kullanıcı bulunamadı!`).setColor('#2f3136'));
    let desu = ``;
    if (!mentioned.voice.channel) {
        desu = `Belirtilen kullanıcı hiçbir kanalda bulunmamaktadır.`;
    } else {
        let asd = await mentioned.voice.channel.createInvite({maxUses: 1});
        desu = `${mentioned.voice.channel.name}        [▶️](https://discord.gg/${asd.code}) \`${mentioned.voice.channel.members.size}/${mentioned.voice.channel.userLimit}\``;
    }
    let lmc = message.guild.channels.cache.get(mentioned.lastMessageChannelID);
    if (!lmc) lmc = `Bulunamadı`;
    const embedi = new Discord.MessageEmbed().setDescription(`${mentioned} Anlık olarak\n\n**${desu}**\n\nEn son yazdığı kanal: ${lmc}`).setFooter("Sadece emojiye bas :)")
    message.channel.send(embedi);

}


exports.conf = {
    enabled: true,
    aliases: ['nerede'],
    guildOnly: false,
    cooldown: 1000,
    permLevel: 0
  };
  
  exports.help = {
    name: 'nerede',
    usage: 'nerede'
};