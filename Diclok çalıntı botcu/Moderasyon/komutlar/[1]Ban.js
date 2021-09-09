const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const diclok = require('../conlok.json');

exports.run =  async (client, message, args) => {

    if(![diclok.roller.banHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let sebep = args.slice(1).join(' ')
let guild = message.guild;



if(!member) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Geçerli bir ID girmelisin!`)
if(member.id === message.author.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Kendini banlayamazsın.').then(x => x.delete({ timeout: 8000}))  
if(member.id === client.user.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Botu banlayamazın.').then(x => x.delete({ timeout: 8000}))  
if(member.id === message.guild.OwnerID) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibini banlamayı denedinmi gerçekten? xd').then(x => x.delete({ timeout: 8000}))  
if(!sebep) return message.channel.send('Bir sebep belirtmelisin.').then(x => x.delete({ timeout: 8000}))  
var footer = diclok.server.footer


guild.members.ban(member, {reason: sebep})
db.add(`yetkili.${message.author.id}.ban`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
let cezaID = db.get(`cezaid.${message.guild.id}`)+1
db.add(`cezaid.${message.guild.id}`, +1);
db.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, kisi: member.id, id: cezaID, zaman: 'Belirtilmemiş', komut: "Sunucudan-Banlanma" });
db.set(`mstatus.${member.id}.${message.guild.id}`, true);
db.push(`sicil.${member.id}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, id: cezaID, zaman: 'Belirtilmemiş', komut: "Sunucudan-Banlanma" });
db.add(`cezapuan.${member.id}.${message.guild.id}`, +20);
db.add(`banlama.${message.author.id}.${message.guild.id}`, +1);
db.add(`banladık.${member.id}.${message.guild.id}`, +1);
let cpuan = db.get(`cezapuan.${member.id}.${message.guild.id}`);
const banlandıkla = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`\`\`${member.user.username}\`\` üyesi **${sebep}** nedeni ile başarıyla **BANLANDI!** [Ceza Numarası: \`#${cezaID}\`]`)
.setFooter(footer)
.setColor('#5e0a0a')
message.channel.send(banlandıkla)
message.react(diclok.emojiler.onay).then(() => {
    setTimeout(function () {

    message.delete()
    },5000);
  })

const egmlog = new Discord.MessageEmbed()
.setTitle('Bir Kullanıcı Banlandı!')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**Yasaklanan Kullanıcı: ${member} || \`\`(${member.id})\`\`** 
**Yasaklayan Yetkili: ${message.author} || \`\`(${message.author.id})\`\` ** 
**Sebep: \`\`${sebep}\`\`** .`)
.setColor('#5e0a0a')
.setFooter(footer)
client.channels.cache.get(diclok.kanallar.banlog).send(egmlog)
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ban', 'yargı'],
    permLevel: 0
  }

  exports.help = {
    name: 'Ban',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'Yargı @etiket/id İsim Yaş'
  }
