const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("quick.db");
const diclog = require('../conlok.json')

exports.run = function (client, message, args)  {

  if (![diclog.roller.banyt].some(role => message.member.roles.cache.get(role)) &&

  !message.member.hasPermission("ADMINISTRATOR"))
   return message.channel.send(new Discord.MessageEmbed()
     .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
     .setColor("#5e0a0a")
     .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
     .setTimestamp())
      .then(x => x.delete({ timeout: 5000 }))

   const shrewd = new Discord.MessageEmbed()  // shréwd


   let tag = diclog.server.tag // ayarlara koydum tagı burayada koyabilirsiniz -> let tag = "TAGINIZ",
   let etiket = diclog.server.etiket
   let tagg = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size;


   let toplam = message.guild.memberCount;


   const sesGanalları = message.guild.channels.cache.filter(c => c.type === "voice")
   let count = 0;

   for (const [id, voiceChannel] of sesGanalları)
    count += voiceChannel.members.size;

    var onlayn = message.guild.members.cache.filter(u => u.presence.status != "offline").size

  const yazıGanalları = message.guild.channels.cache.filter(text => text.type === "text").size;


  let boost = message.guild.premiumSubscriptionCount;


  let saykrdsm = shrewd.setDescription(`
  
\`>\` Sunucumuzda toplam **${toplam}** üye var. 
\`>\` Toplam **${tagg}** kişi tagımıza sahip. 
\`>\` Sesli kanallarda toplam **${count}** kullanıcı var. 
\`>\` Sunucumuzda toplam **${onlayn}** çevrimiçi üye var.
\`>\` Sunucumuza **${boost}** takviye basılmış. `)
 .setColor('#5e0a0a')
 .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
 .setFooter(message.author.tag)
    return message.channel.send(saykrdsm);


 } // shréwd

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "!say"
};  
