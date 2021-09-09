const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const diclok = require('../conlok.json');

exports.run =  async (client, message, args) => {

if(![diclok.roller.banHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`).then(x => x.delete({ timeout: 12000}))  

let member = message.guild.fetchBan(args[0]);


if (!args[0] || isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed.setDescription("Geçerli bir kullanıcı IDsi girmelisin.")).then(x => x.delete({timeout: 5000}));
if(!member) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Lütfen Geçerli Bir Kullanıcı Belirt`).then(x => x.delete({ timeout: 12000}))  
if(member.id === message.author.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Sunucudan zaten banlı değilsin').then(x => x.delete({ timeout: 8000}))  

try {
  await message.guild.fetchBan(args[0])
} catch(e){
  let vembed = new Discord.MessageEmbed()
.setColor("#5e0a0a")
.setDescription(`${diclok.emojiler.onaylanmamıs} **Kullanıcı Bulunamadı!**`)
  message.channel.send(vembed).then(msg => msg.delete({timeout: 5000}));
  return;
}

await message.guild.members.unban(args[0], `${message.author.username} tarafından kaldırıldı`)
message.react(diclok.emojiler.onay).then(() => {
    setTimeout(function () {

    message.delete()
    },5000);
})
  var footer = diclok.server.footer
const banlogs = new Discord.MessageEmbed()
.setTitle('Bir Kullanıcının Banı Açıldı!')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**Yasağı Kaldırılan Kullanıcı: <@!${member}> || \`\`(${member})\`\`** 
**Yasağı Kaldıran Yetkili: ${message.author} || \`\`(${message.author.id})\`\` ** `)
.setFooter(footer)
.setColor('#5e0a0a')
client.channels.cache.get(diclok.kanallar.banlog).send(banlogs)
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['unban']
  }

  exports.help = {
    name: 'unban',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'unban @etiket/id İsim Yaş'
  }