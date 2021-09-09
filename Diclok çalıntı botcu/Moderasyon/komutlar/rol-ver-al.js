const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const diclok = require('../conlok.json')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if(message.author.id !=`${ayarlar.developer}`) return; 
  let islem = args[0];
  if (!islem) return message.channel.send(`Bu komutu bu işlemler ile gerçekleştirebilirsin (\`${ayarlar.prefix}rol <ver/al>\`)`).then(x => x.delete({ timeout: 12000}))  
  let islemler = ['ver', 'al', 'listele']
  if (!islemler.includes(islem)) return message.channel.send(`**Böyle bir işlem bulunmamaktadır.**`).then(x => x.delete({ timeout: 12000}))  
  
  if (islem === 'ver') {
  let girdi1 = args[1];
  if (!girdi1) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`**Rol ver komutunu kullanmak için (\`${ayarlar.prefix}rol ver <@üye/id/isim> <@rol/id/isim>\`) olarak belirtmelisin**`).then(x => x.delete({ timeout: 12000}))  
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!uye) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Geçerli bir kullanıcı girmelisiniz.`).then(x => x.delete({ timeout: 12000}))  
  let girdi2 = args.slice(2).join(' ')
  if (!girdi2) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`**Rol ver komutunu kullanmak için (\`${ayarlar.prefix}rol ver <@üye/id/isim> <@rol/id/isim>\`) olarak belirtmelisin**`).then(x => x.delete({ timeout: 12000}))  
  let rol = message.mentions.roles.first() || message.guild.roles.cache.find(rol => rol.id === girdi2) || message.guild.roles.cache.find(e => e.name.toLowerCase().includes(girdi2.toLowerCase()))
  if (!rol) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Böyle bir rol bulunamamaktadır.`).then(x => x.delete({ timeout: 12000}))  
  if (uye.roles.cache.has(rol.id)) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Üyede bu rol bulunmakta`).then(x => x.delete({ timeout: 12000}))  
  try {
  message.delete(5000)
  uye.roles.add(rol.id)
  uye.roles.add(rol.id)
  uye.roles.add(rol.id)
  message.react(diclok.emojiler.onay)
  db.add(`yetkili.${message.author.id}.rolver`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
  let embed = new Discord.MessageEmbed()
  .setColor(rol.hexColor)
  .setDescription(` <@${uye.user.id}> **üyesine** ${rol} **rolü verildi.** `)
  .setFooter(` ${message.author.tag} tarafından verildi`)
  message.channel.send(embed).then(x => x.delete({ timeout: 12000}))  
  } catch (err) {
    if (err) {
      console.log(err)
      message.react(diclok.emojiler.onaylanmamıs)
      message.channel.send(`Bu terslikte bir iş var.`).then(x => x.delete({ timeout: 12000}))  
    }
  }}
  
  if (islem === 'al') {
    let girdi1 = args[1];
    if (!girdi1) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`**Rol al komutunu kullanmak için (\`${ayarlar.prefix}rol al <@üye/id/isim> <@rol/id/isim>\`) olarak belirtmelisin**`).then(x => x.delete({ timeout: 12000}))  
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!uye) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Geçerli bir kullanıcı girmelisiniz.`).then(x => x.delete({ timeout: 12000}))  
    let girdi2 = args.slice(2).join(' ')
    if (!girdi2) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`**Rol al komutunu kullanmak için (\`${ayarlar.prefix}rol al <@üye/id/isim> <@rol/id/isim>\`) olarak belirtmelisin**`).then(x => x.delete({ timeout: 12000}))  
    let rol = message.mentions.roles.first() || message.guild.roles.cache.find(rol => rol.id === girdi2) || message.guild.roles.cache.find(e => e.name.toLowerCase().includes(girdi2.toLowerCase()))
    if (!rol) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Böyle bir rol bulunamamaktadır.`).then(x => x.delete({ timeout: 12000}))  
    if (!uye.roles.cache.has(rol.id)) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Üyede zaten bu rol bulunmaktadır`).then(x => x.delete({ timeout: 12000}))  
    try {
  message.delete(5000)
  uye.roles.remove(rol.id)
  uye.roles.remove(rol.id)
  uye.roles.remove(rol.id)
  message.react(diclok.emojiler.onay)
  db.add(`yetkili.${message.author.id}.rolal`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
  let embed = new Discord.MessageEmbed()
  .setColor(rol.hexColor)
  .setDescription(`${ayarlar.tik} <@${uye.user.id}> **üyesinden** ${rol} **rolü alındı.** `)
  .setFooter(` ${message.author.tag} tarafından alındı`)
  message.channel.send(embed).then(x => x.delete({ timeout: 12000}))  
  } catch (err) {
    if (err) {
      console.log(err)
      message.react(diclok.emojiler.onaylanmamıs)
      message.channel.send(`Bu terslikte bir iş var.`).then(x => x.delete({ timeout: 12000}))  
    }
  }}
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rol'],
  permLvl: 0
};

exports.help = {
  name: 'rol',
  description: '-',
  usage: 'rol'
};