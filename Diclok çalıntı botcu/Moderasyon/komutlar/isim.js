const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const materyal = require('../conlok.json');

exports.run =  async (client, message, args) => {

if(![materyal.roller.registerer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
    

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({ timeout: 12000})) 
if(member.id === message.author.id) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Kendini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === client.user.id) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Botu kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === message.guild.OwnerID) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({ timeout: 12000})) 


if(!args[0]) return message.channel.send('Bir kullanıcı belirt')  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
 db.add('case', 1)
 const sadxstg = await db.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
 
 let name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
 let yas = Number(args[2])
 if(!name) return message.channel.send('Kullanıcının ismini belirtmelisin!')
 if(!yas) return message.channel.send('Kullanıcın yaşını belirtmelisin!')




if(!member.user.username.includes(materyal.server.tag)) {
  member.setNickname(`• ${name}  ${yas}`)
  
} else {
  member.setNickname(`• ${name}  ${yas}`)
}

db.add(`yetkili.${message.author.id}.nickd`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
var footer = materyal.server.footer
const erkekEmbed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
**-${member} Kullanıcısının ismi \`${name} | ${yas}\` olarak değiştirildi.
- Kullanıcı'nın önceki adlarını görmek için .isimler\`\`@Diclok/İD\`\`**`)
.setFooter(footer, message.author.avatarURL({dynamic:true}))  
.setColor('#5e0a0a')
message.channel.send(erkekEmbed).then(x => x.delete({ timeout: 12000}))
message.react(materyal.emojiler.onay).then(() => {
  setTimeout(function () {

  message.delete()
  },5000);
})  


db.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  kayıts: kayıtsaat,
  isim: name,
  yas: yas,
  role: 'İsim Değiştirme',
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['isim', 'name'],
    permLevel: 0
  }

  exports.help = {
    name: 'name',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'name @etiket/id İsim Yaş'
  }
