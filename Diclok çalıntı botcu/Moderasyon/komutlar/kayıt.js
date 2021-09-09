const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const diclok = require('../conlok.json');

exports.run = (client, message, args) => {
    if(![diclok.roller.registerer].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return;

//------------------------------------KANALLAR-----------------------------------\\ member

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  const tag = diclok.server.tag

  const erkekd = diclok.roller.erkekrol1

  const erkekd2 =  diclok.roller.erkekrol2
 

  const kadın =  diclok.roller.kadınrol1
  
  const kadın2 = diclok.roller.kadınrol2
  

  const viprolü = diclok.roller.viprolü
  
  const booster = diclok.roller.booster

  var etiket = '1516'
  
//------------------------------------KANALLAR-----------------------------------\\ member
if(!member) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({ timeout: 12000})) 
if(member.id === client.user.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Botu kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === message.author.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Kendini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.id === message.guild.OwnerID) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibini kayıt edemezsin.').then(x => x.delete({ timeout: 12000})) 
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({ timeout: 12000})) 
if(db.fetch(`taglıAlım.${message.guild.id}`)) {
  if(!member.user.username.includes(diclok.server.tag) && !member.roles.cache.has(viprolü) && !member.roles.cache.has(booster)) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${member}, Adlı Kullanıcı Tagımızı Almadıgı İcin Kayıt Tamamlanamadı!`))
   
   }
   if(!args[0]) return message.channel.send('Bir kullanıcı belirt')  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
 db.add('case', 1)
 const sadxstg = db.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
 
   
    let name = args[1]
    let yas = Number(args[2])
    if(yas < 13) return message.channel.send('13 yaş altı kayıt yapmak discord kurallarını ihlal etmektedir!').then(x => x.delete({ timeout: 12000})) 
    if(!name) return message.channel.send('Kullanıcının ismini belirtmelisin!').then(x => x.delete({ timeout: 12000})) 
    if(!yas) return message.channel.send('Kullanıcın yaşını belirtmelisin!').then(x => x.delete({ timeout: 12000})) 
    
//------------------------------------KANALLAR-----------------------------------\\    member


  
//------------------------------------------------ROL-VERME-----------------------------------------------\\     member
  const embed = new Discord.MessageEmbed()
  .setTitle(`${message.guild.name}`)
  .setDescription(`**<@${member.user.id}> Adlı kullanıcının
  Cinsiyetini seçin
  Erkek için: ${diclok.emojiler.erkekemoci}
  Kız İçin: ${diclok.emojiler.kadınemoci}**`)
  .setTimestamp()
  
  message.channel.send(embed).then(async mesaj => {
    await mesaj.react(diclok.emojiler.erkekemoci) 
    await mesaj.react(diclok.emojiler.kadınemoci)
    
    const erkekemoji = (reaction, user) => reaction.emoji.name === 'sena' && user.id === message.author.id;
    const kadinemoji = (reaction, user) => reaction.emoji.name === 'elif' && user.id === message.author.id;
    
    const erkek = mesaj.createReactionCollector(erkekemoji, { time: 10000 });
    const kadin = mesaj.createReactionCollector(kadinemoji, { time: 10000 });
    
    erkek.on('collect', async (walter,user) => {
      if (user.id !== message.author.id) return reaction.users.remove(user);
      mesaj.reactions.removeAll()
     member.setNickname(`${name}  ${yas}`)
      member.roles.add(erkekd)
      member.roles.add(erkekd2)
      member.roles.remove(diclok.roller.otorol)
      member.roles.remove(diclok.roller.otorol2)
  
      
      var footer = diclok.server.footer
      const erkekEmbed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setDescription(`**- ${member} Adlı kullanıcı kayıt edildi.
      - Verilen roller (<@&${erkekd}>, <@&${erkekd2}>)
      - Kullanıcı'nın önceki adlarını görmek için .isimler\`\`@Diclok/İD\`\`**`)
      .setFooter(footer, message.author.avatarURL({dynamic:true}))  
      .setColor('#5e0a0a')
      mesaj.edit(erkekEmbed)
      await mesaj.react(diclok.emojiler.onay)

      db.push(`isim.${message.guild.id}`, {
        userID: member.id, 
        isim: name,
        yas: yas,
        role: erkekd,
        kayıts: kayıtsaat,
        tag: tag
      })
    })
    
    kadin.on('collect', async (walter,user) => {
      if (user.id !== message.author.id) return reaction.users.remove(user);
     member.setNickname(`${name}  ${yas}`)
      member.roles.add(kadın)
      member.roles.add(kadın2)
      member.roles.remove(diclok.roller.otorol)
      member.roles.remove(diclok.roller.otorol2)

      
      var footer = diclok.server.footer
      const kayıt = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setDescription(`**- ${member} Adlı kullanıcı kayıt edildi.
      - Verilen roller (<@&${kadın}>, <@&${kadın2}>)
      - Kullanıcı'nın önceki adlarını görmek için .isimler\`\`@Diclok/İD\`\`**`)
      .setFooter(footer, message.author.avatarURL({dynamic:true}))  
      .setColor('#5e0a0a')
      mesaj.edit(kayıt)
      await mesaj.react(diclok.emojiler.onay)

      db.push(`isim.${message.guild.id}`, {
        userID: member.id, 
        isim: name,
        yas: yas,
        role: kadın,
        kayıts: kayıtsaat,
        tag: tag
      })
    })
  })

//------------------------------------------------ROL-VERME-----------------------------------------------\\     member
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k", "kayıt"],
  permLevel: 0
};
exports.help = {
  name: "kayıt",
  description: "kayıt",
  usage: "kayıt"
};