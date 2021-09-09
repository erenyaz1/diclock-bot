const Discord = require('discord.js');
const db = require("quick.db");
const diclok = require('../conlok.json');

exports.run =   async(client, message, args) => {
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter('🎄Developed by Niwren🎄');
    if(![diclok.roller.muteyt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) .then(x => x.delete({ timeout: 12000}))  

    var register = diclok.roller.registerer
    
    let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has(register)).filter(s => !s.voice.channel).map(s => s).join(' ')
    let sesteolan = message.guild.members.cache.filter(s => s.roles.cache.has(register)).filter(s => s.voice.channel).map(s => s).join(', ')
    if(!sesteolmayan) return message.channel.send('Seste olmayan yetkili bulunamıyor')
    if(!sesteolan) return message.channel.send('Ses kanallarında yetkililer bulunamıyor!')
    let embedsss = new Discord.MessageEmbed()
    .setColor('#5e0a0a')
    .setTitle("• Yetkili Sistemi")
    .setDescription(`${message.guild.name} adlı sunucunun toplam seste **${sesteolan}** Kişi Bulunmaktadır.`)
    .addField("Toplam Seste Olmayan Yetkililer:",`${sesteolmayan}`)
    message.channel.send(embedsss)
    

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ytsay', 'yetkili-say'],
    permLevel: 0
  }

  exports.help = {
    name: 'yetkili-say',
    description: "yetlilisay",
    usage: 'yetlili-ses'
  }
