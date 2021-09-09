const Discord = require(`discord.js`)
const db = require(`quick.db`)
const diclok = require(`../conlok.json`)
exports.run = async (client, message, args) => {
    if(![diclok.roller.registerer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission(`ADMINISTRATOR`)) 
    return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
 
 let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
 
if(!kullanıcı) {

let masculin = db.fetch(`yetkili.${message.author.id}.masculin`);
let ban = db.fetch(`yetkili.${message.author.id}.ban`);
let jail = db.fetch(`yetkili.${message.author.id}.jail`);
let mute = db.fetch(`yetkili.${message.author.id}.mute`);
let vmute = db.fetch(`yetkili.${message.author.id}.vmute`);
let nickd = db.fetch(`yetkili.${message.author.id}.nickd`);
let kayıtsıza = db.fetch(`yetkili.${message.author.id}.kayıtsıza`);
let rolal = db.fetch(`yetkili.${message.author.id}.rolal`);
let rolver = db.fetch(`yetkili.${message.author.id}.rolver`);
let vip = db.fetch(`yetkili.${message.author.id}.vip`);
let kadın = db.fetch(`yetkili.${message.author.id}.kadın`);
let icraatler = db.fetch(`yetkili.${message.author.id}.toplam`); 

if(masculin === null) masculin = "0"  
if(masculin === undefined) masculin = "0"

if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"

if(icraatler === null) icraatler = "0"
if(icraatler === undefined) icraatler = "0"

if(ban === null) ban = "0"
if(ban === undefined) ban = "0"

if(jail === null) jail = "0"
if(jail === undefined) jail = "0"

if(mute === null) mute = "0"
if(mute === undefined) mute = "0"

if(vmute === null) vmute = "0"
if(vmute === undefined) vmute = "0"

if(nickd === null) nickd = "0"
if(nickd === undefined) nickd = "0"

if(kayıtsıza === null) kayıtsıza = "0"
if(kayıtsıza === undefined) kayıtsıza = "0"

if(rolal === null) rolal = "0"
if(rolal === undefined) rolal = "0"

if(rolver === null) rolver = "0"
if(rolver === undefined) rolver = "0"

if(vip === null) vip = "0"
if(vip === undefined) vip = "0"
  
const sorgu1 = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL({ dynamic: true}))
.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
.addField(`Kadın kayıt` , `\`${kadın}\``, true)
.addField(`Erkek kayıt` , `\`${masculin}\``,  true)
.addField(`İsim değiştirme` , `\`${nickd}\``,  true)
.addField(`Kayıtsıza atma` , `\`${kayıtsıza}\``,  true)
.addField(`Banlama` , `\`${ban}\``,  true)
.addField(`Cezalıya atma` , `\`${jail}\``,  true)
.addField(`Metin susturma` , `\`${mute}\``,  true)
.addField(`Ses susturma` , `\`${vmute}\``,  true)
.addField(`Rol alma` , `\`${rolal}\``, true)
.addField(`Rol verme` , `\`${rolver}\``, true)
.addField(`Vip` , `\`${vip}\``, true)
.setColor(`BLACK`)
 return message.channel.send(sorgu1).then(x => x.delete({ timeout: 8000}))  
};
  
if(kullanıcı) {  
  let masculin1 = db.fetch(`yetkili.${kullanıcı.id}.masculin`);
  let ban1 = db.fetch(`yetkili.${kullanıcı.id}.ban`);
  let jail1 = db.fetch(`yetkili.${kullanıcı.id}.jail`);
  let mute1 = db.fetch(`yetkili.${kullanıcı.id}.mute`);
  let vmute1 = db.fetch(`yetkili.${kullanıcı.id}.vmute`);
  let nickd1 = db.fetch(`yetkili.${kullanıcı.id}.nickd`);
  let kayıtsıza1 = db.fetch(`yetkili.${kullanıcı.id}.kayıtsıza`);
  let rolal1 = db.fetch(`yetkili.${kullanıcı.id}.rolal`);
  let rolver1 = db.fetch(`yetkili.${kullanıcı.id}.rolver`);
  let vip1 = db.fetch(`yetkili.${kullanıcı.id}.vip`);
  let kadın1 = db.fetch(`yetkili.${kullanıcı.id}.kadın`);
  let icraatler1 = db.fetch(`yetkili.${kullanıcı.id}.toplam`); 
  
  if(masculin1 === null) masculin1 = "0"  
  if(masculin1 === undefined) masculin1 = "0"
  
  if(kadın1 === null) kadın1 = "0"
  if(kadın1 === undefined) kadın1 = "0"
  
  if(icraatler1 === null) icraatler1 = "0"
  if(icraatler1 === undefined) icraatler1 = "0"
  
  if(ban1 === null) ban1 = "0"
  if(ban1 === undefined) ban1 = "0"
  
  if(jail1 === null) jail1 = "0"
  if(jail1 === undefined) jail1 = "0"
  
  if(mute1 === null) mute1 = "0"
  if(mute1 === undefined) mute1 = "0"
  
  if(vmute1 === null) vmute1 = "0"
  if(vmute1 === undefined) vmute1 = "0"
  
  if(nickd1 === null) nickd1 = "0"
  if(nickd1 === undefined) nickd1 = "0"
  
  if(kayıtsıza1 === null) kayıtsıza1 = "0"
  if(kayıtsıza1 === undefined) kayıtsıza1 = "0"
  
  if(rolal1 === null) rolal1 = "0"
  if(rolal1 === undefined) rolal1 = "0"
  
  if(rolver1 === null) rolver1 = "0"
  if(rolver1 === undefined) rolver1 = "0"
  
  if(vip1 === null) vip1 = "0"
  if(vip1 === undefined) vip1 = "0"
  
const sorgu2 = new Discord.MessageEmbed()
.setAuthor(`${kullanıcı.user.username}`, kullanıcı.user.avatarURL({ dynamic: true}))
.addFields(
  { name: `Erkek kayıt` , value:`\`${masculin1}\``, inline: true },
  { name: `Kadın kayıt` , value:`\`${kadın1}\``, inline: true },
  )
  .addFields(
    { name: `İsim değiştirme` , value: `\`${nickd1}\``, inline: true },
    { name: `Kayıtsıza atma` , value: `\`${kayıtsıza1}\``, inline: true },
    )
    .addFields(
      { name:  `Banlama` , value: `\`${ban1}\``, inline: true },
      { name: `Cezalıya atma` , value: `\`${jail1}\``, inline: true },
      )
      .addFields(
        { name: `Metin susturma` ,value: `\`${mute1}\``, inline: true },
        { name: `Ses susturma` , value:`\`${vmute1}\``, inline: true },
        )
        .addFields(
          { name: `Rol alma` , value:`\`${rolal1}\``, inline: true },
          { name: `Rol verme` , value:`\`${rolver1}\``, inline: true },
          )


.setColor(`BLACK`)
 return message.channel.send(sorgu2).then(x => x.delete({ timeout: 8000}))  
  
};
  
     }

exports.conf = {
  aliases: ["icraatler"],
  usage: "icraatler",
  description: "Belirtilen mesaj sayısı kadar mesaj temizler."
};

exports.help = {
  name: "icraatler"
};