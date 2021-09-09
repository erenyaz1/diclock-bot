const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const diclok = require("../conlok.json");
const moment = require("moment");
exports.run = function (client, message, args)  {
    let executor = message.member
    let kullanıcı = message.mentions.users.first()
    let embed = new MessageEmbed().setAuthor(executor.user.tag, executor.user.displayAvatarURL({dynamic: true})).setFooter('Diclok Was Here!').setColor("#5e0a0a").setTimestamp();
    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let uye = message.guild.member(victim)
 const filter = (reaction, user) => {
        return ["✅"].includes(reaction.emoji.name) && user.id === message.author.id; 
    };
    if(!kullanıcı) {  
      let jail =  db.get(`cezalandırma.${victim.id}.${message.guild.id}`);
      let ban =  db.get(`banlandık.${victim.id}.${message.guild.id}`);
      let cmute =  db.get(`cmute.${victim.id}.${message.guild.id}`);
      let vmute =  db.get(`vmute.${victim.id}.${message.guild.id}`);
      let jailCez =  db.get(`cezalandırılmaa.${victim.id}.${message.guild.id}`);
      let banCez =  db.get(`banlama.${victim.id}.${message.guild.id}`);
      let cmuteCez =  db.get(`cmuteCez.${victim.id}.${message.guild.id}`);
      let vmuteCez =  db.get(`vmuteCez.${victim.id}.${message.guild.id}`);
      let cpuan =  db.get(`cezapuan.${victim.id}.${message.guild.id}`);
      let kick =  db.get(`kick.${victim.id}.${message.guild.id}`);

  
      let cezabilgisi = `${jail || '0'} adet jail, ${ban || '0'} adet ban, ${kick || '0'} adet kick, ${cmute+vmute || '0'} mute (${cmute || '0'} chat - ${vmute || '0'} ses), cezası mevcut.`;
      let cezalandirmaBilgisi = `${jailCez || '0'} adet jail, ${banCez || '0'} adet ban, ${cmuteCez+vmuteCez || '0'} mute (${cmuteCez || '0'} chat - ${vmuteCez || '0'} ses), cezalandırması mevcut.`;
      
        
      let footer = diclok.server.footer

    const embeds = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))   
    .addField(`Aldığınız cezalar`, cezabilgisi)
    .addField(`Verdiğiniz Cezalar`, cezalandirmaBilgisi)
    .setColor('#5e0a0a')
    .setTimestamp()
    .setFooter(footer)
       return message.channel.send(embeds)
        
      };

    if(kullanıcı) {  
      let jail1 =  db.get(`cezalandırma.${victim.id}.${message.guild.id}`);
      let ban1 =  db.get(`banlandık.${victim.id}.${message.guild.id}`);
      let cmute1 =  db.get(`cmute.${victim.id}.${message.guild.id}`);
      let vmute1 =  db.get(`vmute.${victim.id}.${message.guild.id}`);
      let jailCez1 =  db.get(`cezalandırılmaa.${victim.id}.${message.guild.id}`);
      let banCez1 =  db.get(`banlama.${victim.id}.${message.guild.id}`);
      let cmuteCez1 =  db.get(`cmuteCez.${victim.id}.${message.guild.id}`);
      let vmuteCez1 =  db.get(`vmuteCez.${victim.id}.${message.guild.id}`);
      let cpuan1 =  db.get(`cezapuan.${victim.id}.${message.guild.id}`);
      let kick1 =  db.get(`kick.${victim.id}.${message.guild.id}`);

  
      let cezabilgisi1 = `${jail1 || '0'} adet jail, ${ban1 || '0'} adet ban, ${kick1 || '0'} adet kick, ${cmute1+vmute1 || '0'} mute (${cmute1 || '0'} chat - ${vmute1 || '0'} ses), cezası mevcut.`;
      let cezalandirmaBilgisi1 = `${jailCez1 || '0'} adet jail, ${banCez1 || '0'} adet ban, ${cmuteCez1+vmuteCez1 || '0'} mute (${cmuteCez1 || '0'} chat - ${vmuteCez1 || '0'} ses), cezalandırması mevcut.`;
      
        
      let footer = diclok.server.footer

      const embedsa = new MessageEmbed()
      .setAuthor(kullanıcı.tag, kullanıcı.avatarURL({dynamic:true}))   
      .addField(`Aldığı cezalar`, cezabilgisi1)
      .addField(`Verdiği Cezalar`, cezalandirmaBilgisi1)
      .setColor('#5e0a0a')
      .setTimestamp()
      .setFooter(footer)
         return message.channel.send(embedsa)
        
      };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kimlik", "profil"],
  PermLevel: 0
};

 

exports.help = {
  name: "Kimlik-Profil",
  description: "profil işteamq",
  usage: "kimlik"
};