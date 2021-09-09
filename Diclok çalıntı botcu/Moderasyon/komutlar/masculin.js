const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const materyal = require('../conlok.json');

exports.run =  async (client, message, args) => {

if(![materyal.roller.registerer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
    
var dicrol1 = materyal.roller.erkekrol1;
var dicrol2 = materyal.roller.erkekrol2;
var otorol = materyal.roller.otorol;
var otorol2 = materyal.roller.otorol2;
var kayıtlogg = materyal.kanallar.kayıtlog;
var viprolü = materyal.roller.vip
var booster = materyal.roller.booster
var tag = materyal.server.tag
var etiket = '5512'

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({ timeout: 12000})) 
if(member.id === message.author.id) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Kendini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === client.user.id) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Botu kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === message.guild.OwnerID) return message.react(materyal.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({ timeout: 12000})) 
if(db.fetch(`taglıAlım.${message.guild.id}`)) {
  if(!member.user.username.includes(materyal.server.tag) && !member.roles.cache.has(viprolü) && !member.roles.cache.has(booster)) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${member}, Adlı Kullanıcı Tagımızı Almadıgı İcin Kayıt Tamamlanamadı!`))
   
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

 db.add(`yetkili.${message.author.id}.masculin`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)


if(!member.user.username.includes(materyal.server.tag)) {
  member.setNickname(`• ${name}  ${yas}`)
  
} else {
  member.setNickname(`• ${name}  ${yas}`)
}
member.roles.add(dicrol1)
member.roles.add(dicrol2)
member.roles.remove(otorol)
member.roles.remove(otorol2)


var footer = materyal.server.footer
const erkekEmbed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**- ${member} Adlı kullanıcı kayıt edildi.
- Verilen roller (<@&${dicrol1}>, <@&${dicrol2}>)
- Kullanıcı'nın önceki adlarını görmek için .isimler\`\`@Diclok/İD\`\`**`)
.setFooter(footer, message.author.avatarURL({dynamic:true}))  
.setColor('#5e0a0a')
message.channel.send(erkekEmbed).then(x => x.delete({ timeout: 12000}))
message.react(materyal.emojiler.onay).then(() => {
  setTimeout(function () {

  message.delete()
  },5000);
})  

client.channels.cache.get(materyal.kanallar.genelchat).send(`${member} Adlı kişi sunucumuza katıldı, sunucumuza hoşgeldin`).then(x => x.delete({ timeout: 12000}))  

db.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  kayıts: kayıtsaat,
  isim: name,
  yas: yas,
  role: `<@&${dicrol1}>`,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['e', 'erkek'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'e @etiket/id İsim Yaş'
  }
