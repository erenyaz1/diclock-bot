const Discord = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const materyal = require('../conlok.json');

exports.run =  async (client, message, args) => {

if(![materyal.roller.registerer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[1]));

if(!member) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({ timeout: 12000})) 
if(member.id === message.author.id) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Kendine vip veremezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === message.guild.OwnerID) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibine vip veremezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({ timeout: 12000})) 
const vip = materyal.roller.vip
const footer = materyal.server.footer
let islem = args[0];

if(islem === 'al') {
  if (!member.roles.cache.has(vip)) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send(`Üyede zaten bu rol bulunmamaktadır `).then(x => x.delete({ timeout: 12000}))

  member.roles.remove(vip)
  member.roles.remove(vip)
  datab.add(`yetkili.${message.author.id}.rolal`, 1)
  datab.add(`yetkili.${message.author.id}.toplam`, 1)
  const wtfembed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({ dynamic : true}))
  .setDescription(`**${member} adlı kullanıcıdan <@&${vip}> rolü alındı. **`)
  .setFooter(footer)
  .setColor(vip.hexColor)

  message.react(materyal.emojiler.onay), message.channel.send(wtfembed).then(x => x.delete({ timeout: 8000}))
  .then(() => {
    setTimeout(function () {
  
    message.delete()
    },8000);
  }) 
  
} 
if(islem === 'ver') { 
  if (member.roles.cache.has(vip)) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send(`Üyede zaten bu rol bulunmaktadır`).then(x => x.delete({ timeout: 12000}))  
  member.roles.add(vip)
  member.roles.add(vip)
  datab.add(`yetkili.${message.author.id}.rolver`, 1)
  datab.add(`yetkili.${message.author.id}.toplam`, 1)
  const wtfembeds = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({ dynamic : true}))
  .setDescription(`**${member} adlı kullanıcıya <@&${vip}> rolü verildi. **`)
  .setFooter(footer)
  .setColor(vip.hexColor)
  message.react(materyal.emojiler.onay), message.channel.send(wtfembeds).then(x => x.delete({ timeout: 8000}))  
  .then(() => {
    setTimeout(function () {
  
    message.delete()
    },8000);
  }) 
}

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['vip'],
    permLevel: 0
  }

  exports.help = {
    name: 'vip',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'vip @etiket/id İsim Yaş'
  }
