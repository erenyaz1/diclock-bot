const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const diclok = require('../conlok.json');

exports.run =  async (client, message, args) => {

if(![diclok.roller.registerer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
    
var dicrol1 = diclok.roller.kadınrol1;
var dicrol2 = diclok.roller.kadınrol2;
var otorol = diclok.roller.otorol;
var otorol2 = diclok.roller.otorol2;
var kayıtlogg = diclok.kanallar.kayıtlog;
var viprolü = diclok.roller.vip
var booster = diclok.roller.booster
var tag = diclok.server.tag
var etiket = diclok.server.etiket

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({ timeout: 12000})) 
if(member.id === message.author.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Kendini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === client.user.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Botu kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === message.guild.OwnerID) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({ timeout: 12000})) 
if(db.fetch(`taglıAlım.${message.guild.id}`)) {
  if(!member.user.username.includes(diclok.server.tag) && !member.roles.cache.has(viprolü) && !member.roles.cache.has(booster)) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${member}, Adlı Kullanıcı Tagımızı Almadıgı İcin Kayıt Tamamlanamadı!`))
   
   }

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
 
 let name = args[1]
 let yas = Number(args[2])
 if(yas < 13) return message.channel.send('13 yaş altı kayıt yapmak discord kurallarını ihlal etmektedir!').then(x => x.delete({ timeout: 12000})) 
 if(!name) return message.channel.send('Kullanıcının ismini belirtmelisin!').then(x => x.delete({ timeout: 12000})) 
 if(!yas) return message.channel.send('Kullanıcın yaşını belirtmelisin!').then(x => x.delete({ timeout: 12000})) 

 db.add(`yetkili.${message.author.id}.kadın`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)


if(!member.user.username.includes(diclok.server.tag)) {
  member.setNickname(`• ${name}  ${yas}`)
  
} else {
  member.setNickname(`• ${name}  ${yas}`)
}
member.roles.add(dicrol1)
member.roles.add(dicrol2)
member.roles.remove(otorol)
member.roles.remove(otorol2)


var footer = diclok.server.footer
const kayıt = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**- ${member} Adlı kullanıcı kayıt edildi.
- Verilen roller (<@&${dicrol1}>, <@&${dicrol2}>)
- Kullanıcı'nın önceki adlarını görmek için .isimler\`\`@Diclok/İD\`\`**`)
.setFooter(footer, message.author.avatarURL({dynamic:true}))  
.setColor('#5e0a0a')
message.channel.send(kayıt).then(x => x.delete({ timeout: 12000}))
message.react(diclok.emojiler.onay).then(() => {
  setTimeout(function () {

  message.delete()
  },5000);
})  

client.channels.cache.get(diclok.kanallar.genelchat).send(`${member} Adlı kişi sunucumuza katıldı, sunucumuza hoşgeldin.`).then(x => x.delete({ timeout: 12000}))  

db.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: name,
  yas: yas,
  kayıts: kayıtsaat,
  role: `<@&${dicrol1}>`,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['k', 'kadın'],
    permLevel: 0
  }

  exports.help = {
    name: 'kadın',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'k @etiket/id İsim Yaş'
  }
