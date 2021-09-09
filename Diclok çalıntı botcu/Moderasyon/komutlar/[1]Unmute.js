const { MessageEmbed, DiscordAPIError } = require("discord.js");
const qdb = require("quick.db");
const diclok = require('../conlok.json')

exports.run =  async (client, message, args) => {
  let embed = new MessageEmbed()
    .setFooter(diclok.server.footer)
    .setColor('#5e0a0a').
    setTimestamp();
  if(!diclok.roller.muterol || !diclok.roller.muteyt) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  
  if(![diclok.roller.muteyt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) .then(x => x.delete({ timeout: 12000}))  
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if(!member) return message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({ timeout: 12000}))  

  if(member.id === message.author.id) return message.channel.send('Kendi muteleyemezsin/muteni kaldıramazsın').then(x => x.delete({ timeout: 12000}))  

  if(member.id === client.user.id) return message.channel.send('Botu muteleyemezsin/mutesini kaldıramazsınssss.').then(x => x.delete({ timeout: 12000}))  

  if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini muteleyemezsin/mutesini kaldıramazsın.').then(x => x.delete({ timeout: 12000}))  

  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({ timeout: 12000}))  

  


  const footer = diclok.server.footer
  await member.roles.remove(diclok.roller.muteRol || []).catch();

  const mutelendin = new MessageEmbed()
  .setDescription(`**${message.author}, ${member} üyesinin metin susturmasını kaldırdı!**`)
  .setColor('#5e0a0a')
  .setFooter(footer)
message.channel.send(mutelendin).then(x => x.delete({ timeout: 12000}))  

  const modlogg = new MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setTitle('Metin Susturma Kaldırma')
  .setColor('#5e0a0a')
  .setTimestamp()
  .setDescription(`
  **Kullanıcı:** ${member} - \`\`(${member.id})\`\`
  **Yetkili:** ${message.author} - \`\`(${message.author.id})\`\`
`)
  .setFooter(footer, message.author.avatarURL({dynamic:true}))   
  message.react(diclok.emojiler.onay).then(() => {
    setTimeout(function () {
  
    message.delete()
    },5000);
  })
  if(diclok.kanallar.mutelog && client.channels.cache.has(diclok.kanallar.mutelog)) client.channels.cache.get(diclok.kanallar.mutelog).send(modlogg)

  };

  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['unmute'],
    permLevel: 0
  }

  exports.help = {
    name: 'unmute',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'unmute'
};