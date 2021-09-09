const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const diclok = require('../conlok.json')
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.get(diclok.roller.registerer) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için <@&${diclok.roller.registerer}> yetkisine sahip olmalısın.`)
.setColor('#5e0a0a'))


let s =  message.member.roles.cache.map(x => x).join('\n ')

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Bir kullanıcı belirt.`).setColor('#5e0a0a'))



const embed = new MessageEmbed()
.setAuthor(`Kullanıcının Rolleri`)  
.setDescription(`**Kişinin rolleri:**  \n${s}`)
.setFooter('Diclok was here', message.author.avatarURL({dynamic:true}))  
.setColor('#5e0a0a')
message.react(diclok.emojiler.onay), message.channel.send(embed).then(x => x.delete({ timeout: 12000}))}

  
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rollerebak'],
    permLevel: 0,
  }
  
  exports.help = {
        name: "Rollers"
    
  }