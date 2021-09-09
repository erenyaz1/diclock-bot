const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const diclok = require('../conlok.json')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if(message.author.id !=`${ayarlar.developer}`) return; 
  let islem = args[0];
  if (!islem) return message.channel.send(`Bu komutu bu işlemler ile gerçekleştirebilirsin (\`${ayarlar.prefix}rol <ver/al>\`)`).then(x => x.delete({ timeout: 12000}))  
  let islemler = ['ss', 'yönetici', 'moderasyon', 'kayıt']
  if (!islemler.includes(islem)) return message.channel.send(`**Böyle bir işlem bulunmamaktadır.**`).then(x => x.delete({ timeout: 12000}))  
  
  if (islem === 'kayıt') {
    if(![diclok.roller.registerer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return
    const kayıtembed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .addFields(
    { name: 'Kayıt Komutları', value: `.\`erkek <@Diclok/id> (İsim | Yaş)\`**Kişiyi erkek rolleri ile kayıt eder.**\n .\`kadın <@Diclok/id> (İsim | Yaş)\`**Kişiyi kadın rolleri ile kayıt eder.**\n .\`isim <@Diclok/id> (İsim | Yaş)\`**Etiketlenen kullanıcının ismini değiştirir.** \n .\`isimler <@Diclok/id> \`**Kişinin eski isimlerini gösterir** \n .\`vip <@Diclok/id>\` **Kullanıcıya VIP/Special rolü verir.**`, inline: true },
)
.setFooter(`${diclok.server.footer}`)
return message.channel.send(kayıtembed)

    
}
if (islem === 'moderasyon') {
  if(![diclok.roller.muteyt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
  return
  const moderasyonembed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .addFields(
  { name: 'Moderasyon Komutları', value: `.\`mute <@Diclok/ID> (1s, 1m, 1h, 1d)\`**Kullanıcıyı metin kanallarından susturur.** \n .\`vmute <@Diclok/ID> **(1s, 1m, 1h, 1d)\`**Kullanıcıyı ses kanallarından susturur.**\n .\`unmute <@Diclok/ID> \`**Kişinin metin kanallarından susturmasını kaldırır** \n .\`vunmute <@Diclok/id>\`**Kişinin ses kanallarından susturmasını kaldırır.** \n .\`jail <@Diclok/id> <1s/1m/1h/1d>\` **Kişiyi karantinaya atar.** \n .\`unjail <@Diclok/id>\` **Kişiyi karantinadan çıkartır.** \n .\`ban <@Diclok/id> [sebep]\` **Kullanıcı sunucudan engeller.** \n .\`unban <@Diclok/id>\`**Kişinin sunucudan engelini açar.**  `, inline: true },
)
.setFooter(`${diclok.server.footer}`)
return message.channel.send(moderasyonembed)

  
}
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['help', "yardım"],
  permLvl: 0
};

exports.help = {
  name: 'help',
  description: '-',
  usage: 'yardım'
};