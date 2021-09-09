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

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Bir kullanıcı belirt.`).setColor('#5e0a0a'))
var sayi = 1
let data = db.get(`isim.${message.guild.id}`)
var footer = diclok.server.footer

if(!data) return message.react(`${diclok.emojiler.onaylanmamıs}`), message.channel.send(new MessageEmbed()
.setAuthor(`Veritabanına Kayıtlı İsim Bulunamadı`)  
.setDescription(`**Bu kullanıcı daha önce hiç kayıt olmamış!**`)
.setFooter(footer, message.author.avatarURL({dynamic:true}))  
.setColor('#5e0a0a')).then(x => x.delete({ timeout: 12000})) 
else{
let isimler = data.filter(x => x.userID === user.id).map(x => `→ \`${x.isim} | ${x.yas}\`   (**<@&${x.role}>**)  ${x.kayıts}`).join("\n")
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"
let yazı = 'tarafından istendi'
const embed = new MessageEmbed()
.setAuthor(`Veritabanına kayıtlı isimler`)  
.setDescription(`**Kişi önceden bu isimler ile kayıt olmuş:**  \n\n${isimler}`)
.setFooter(footer, message.author.avatarURL({dynamic:true}))  
.setColor('#5e0a0a')
message.react(diclok.emojiler.onay), message.channel.send(embed).then(x => x.delete({ timeout: 12000}))}}

  
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimler', 'eski-isim'],
    permLevel: 0,
  }
  
  exports.help = {
        name: "isimler"
    
  }