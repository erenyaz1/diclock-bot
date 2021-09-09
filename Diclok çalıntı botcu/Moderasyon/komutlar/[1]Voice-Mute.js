  


const Discord = require('discord.js');

const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

const ms = require("ms");
const moment = require("moment");
const diclok = require("../conlok.json");

exports.run =  async (client, message, args) => {

  if(![diclok.roller.muteyt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
  return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Bir kullanıcı belirt.`)
    if(member.id === message.author.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Kendini muteleyemezsin!').then(x => x.delete({ timeout: 8000}))  
    if(member.id === client.user.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Botu muteleyemezsin!').then(x => x.delete({ timeout: 8000}))  
    if(member.id === message.guild.OwnerID) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibini mutelemek mi?').then(x => x.delete({ timeout: 8000}))  
    
    let time = args[1]
  let sebep = args.slice(2).join(' ') || 'Belirtilmemiş'

  yaziSure = args[1].replace(`sn`, `s`).replace(`dk`, `m`).replace(`sa`, `h`).replace(`g`, `d`)
  let atilanAy = moment(Date.now()).format("MM");
  let atilanSaat = moment(Date.now()).format("HH:mm:ss");
  let atilanGün = moment(Date.now()).format("DD");
  let bitişAy = moment(Date.now()+ms(time)).format("MM");
  let bitişSaat = moment(Date.now()+ms(time)).format("HH:mm:ss");
  let bitişGün = moment(Date.now()+ms(time)).format("DD");

  let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
  let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişSaat}`;

  var mutelirolu = diclok.roller.muterol
  if(!yaziSure) return message.reply(`Lütfen bir zaman giriniz! \nDoğru Kullanım; \`.mute <@diclok/id> <1sn/1dk/1sa/1g>\``)

  if(member.voice.channel) member.voice.setMute(true).catch();
  db.add(`yetkili.${message.author.id}.vmute`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
  let cezaID = db.get(`cezaid.${message.guild.id}`)+1
  db.add(`cezaid.${message.guild.id}`, +1);
  db.push("tempvmute", { id: member.id, bitis: Date.now()+ms(time) });
  db.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, kisi: member.id, id: cezaID, zaman: Date.now(), komut: "Ses-Susturma" });
  db.set(`mstatus.${member.id}.${message.guild.id}`, true);
  db.push(`sicil.${member.id}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, id: cezaID, zaman: Date.now(), komut: "Ses-Susturma" });
  db.add(`cezapuan.${member.id}.${message.guild.id}`, +7);
  db.add(`vmuteCez.${message.author.id}.${message.guild.id}`, +1);
  db.add(`vmute.${member.id}.${message.guild.id}`, +1);
  let cpuan = db.get(`cezapuan.${member.id}.${message.guild.id}`);

  const footer = diclok.server.footer


  const mutelendin = new Discord.MessageEmbed()
  .setDescription(`**${message.author}, ${member} kullanıcısını \`\`${sebep}\`\` nedeni ile \`\`${args[1].replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün')}\`\` boyunca ses kanallarından susturdu. [Ceza Numarası: \`#${cezaID}]\`**`)
  .setColor('#5e0a0a')
  .setFooter(footer)
message.channel.send(mutelendin).then(x => x.delete({ timeout: 12000}))  

  const modlogg = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setTitle('Bir Kişi Ses Kanallarından Mutelendi')
  .setColor('#5e0a0a')
  .setTimestamp()
  .setDescription(`
  **Kullanıcı:** ${member} - \`\`(${member.id})\`\`
  **Yetkili:** ${message.author} - \`\`(${message.author.id})\`\`
  **Mute Süresi:** \`\`${muteAtılma}\`\` **-** \`\`${muteBitiş}\`\` 
  **Sebep:** [\`\`${sebep}\`\`]`)
  .setFooter(footer, message.author.avatarURL({dynamic:true}))   
  message.react(diclok.emojiler.onay).then(() => {
    setTimeout(function () {
  
    message.delete()
    },5000);
  })
  
  if(diclok.kanallar.mutelog && client.channels.cache.has(diclok.kanallar.mutelog)) client.channels.cache.get(diclok.kanallar.mutelog).send(modlogg)



  setTimeout(function(){
    member.voice.setMute(false);  
}, ms(yaziSure));
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['vmute'],
    permLevel: 0
  };
  
  exports.help = {
    name: "vmute",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
    usage: "vmute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };