const { MessageEmbed, DiscordAPIError } = require("discord.js");
const data = require("quick.db");
const diclok = require('../conlok.json')

exports.run =  async (client, message, args) => {

  if(!diclok.roller.jailyt || !diclok.roller.jailrol) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  
  if(![diclok.roller.jailrol].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) .then(x => x.delete({ timeout: 12000}))  
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if(!member) return message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({ timeout: 12000}))  

  if(member.id === message.author.id) return message.channel.send('Kendi cezalandıramazsın/cezanı kaldıramazsın.').then(x => x.delete({ timeout: 12000}))  

  if(member.id === client.user.id) return message.channel.send('Botu cezalandıramazsın/cezasını kaldıramazsın.').then(x => x.delete({ timeout: 12000}))  

  if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini cezalandıramazsın/cezasını kaldıramazsın.').then(x => x.delete({ timeout: 12000}))  

  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({ timeout: 12000}))  

  


  const footer = diclok.server.footer
  await member.roles.remove(diclok.roller.jailrol || []).catch();

  const mutelendin = new MessageEmbed()
  .setDescription(`**${message.author}, ${member} üyesinin cezasını kaldırdı!**`)
  .setColor('#5e0a0a')
  .setFooter(footer)
message.channel.send(mutelendin).then(x => x.delete({ timeout: 12000}))  

  const modlogg = new MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setTitle('Ceza Kaldırma')
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
  message.guild.roles.cache.forEach(async r => {
    let roller = data.fetch(`${message.guild.id}.jail.${member.id}.roles.${r.id}` )
    if(roller != r.id)  return ;
    if(roller){member.roles.add(roller)}
    await data.delete(`${message.guild.id}.jail.${member.id}.roles.${r.id}`)
    })
  };

  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['unjail'],
    permLevel: 0
  }

  exports.help = {
    name: 'unjail',
    description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.",
    usage: 'unjail'
};