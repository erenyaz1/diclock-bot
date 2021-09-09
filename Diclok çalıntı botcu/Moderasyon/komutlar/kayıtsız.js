const db = require('quick.db');
const { MessageEmbed, DiscordAPIError } = require('discord.js')
const diclok = require('../conlok.json');


exports.run =  async (client, message, args) => {

 if(![diclok.roller.yetkili, diclok.roller.yetkili1, diclok.roller.yetkili2, diclok.roller.yetkili3, diclok.roller.klanbaskan, diclok.roller.klanbaskany].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(`Bir kullanıcı etiketlemelisin!`)
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Etiketlediğin kişi senden üst bir yetkiye sahip.`)


member.setNickname(diclok.server.otoisim)
await member.roles.set([diclok.roller.otorol])
await member.roles.add(diclok.roller.otorol2)
db.add(`yetkili.${message.author.id}.kayıtsıza`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
var footer = diclok.server.footer
const embeds = new MessageEmbed()
.setDescription(`**${member} kullanıcısı ${message.author} tarafıdan kayıtsıza atıldı.**`)
.setFooter(footer, message.author.avatarURL({dynamic:true}))  
.setColor('#5e0a0a')
message.channel.send(embeds)    
.then(msg => msg.delete({timeout: 10000}))
message.react(diclok.emojiler.onay).then(() => {
  setTimeout(function () {

  message.delete()
  },5000);
})
const mfylog = new MessageEmbed()
.setTitle('Kayıtsıza Atma')
.setDescription(`**Kayıtsıza atan yetkili:** ${message.author}**||**\`\`${message.author.id}\`\`\n\n **Kayıtsıza atılan kullanıcı:** ${member}**||**\`\`${member.id}\`\``)
.setFooter(footer, message.author.avatarURL({dynamic:true}))
.setTimestamp()  
.setColor('#5e0a0a')
client.channels.cache.get(diclok.kanallar.kayıtsızlog).send(mfylog)


}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayıtsız'],
    permLevel: 0
  }

  exports.help = {
    name: 'kayıtsız',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'kayıtsız @etiket/id İsim Yaş'
  }