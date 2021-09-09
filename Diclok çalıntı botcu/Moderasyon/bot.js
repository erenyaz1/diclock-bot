const Discord = require("discord.js"); // undefined 
const client = new Discord.Client(); 
const ayarlar = require("./ayarlar.json"); 
const chalk = require("chalk"); 
const moment = require("moment"); 
var Jimp = require("jimp"); 
const { Client, Util } = require("discord.js"); 
const fs = require("fs"); 
const db = require("quick.db");
const express = require("express");   
require("./util/eventLoader.js")(client); // undefined 
const path = require("path"); 
const snekfetch = require("snekfetch");  
const ms = require("ms"); 
const tags = require("common-tags");
const diclog = require('./conlok.json');
const message = require("./events/message");


var prefix = ayarlar.prefix;  // undefined 

const log = message => {
  
  console.log(`${message}`); 
};

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection(); 
fs.readdir("./komutlar/", (err, files) => { // undefined 
  
  if (err) console.error(err); 
  
  log(` ${files.length} Botun komutları yüklenecek...`); 
  files.forEach(f => {
    
    let props = require(`./komutlar/${f}`);  // undefined 
    log(`[BOTLOK] | ${props.help.name} Eklendi.`); 
    client.commands.set(props.help.name, props); 
    props.conf.aliases.forEach(alias => {
      
      client.aliases.set(alias, props.help.name); 
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => { // undefined 
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name); // undefined 
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => { // undefined 
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`); // undefined 
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]; // undefined 
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias); // undefined 
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0; // undefined 
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted"))); // undefined 
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token); // process.env.token ltfn

//------------------------------------------------------TAG-----------------------------------------------------\\

client.on("message", message => {
  if(message.content.toLowerCase() === "tag")
   return message.channel.send(`\`${diclog.server.tag} - ${diclog.server.tag2}\``)
});

client.on("message", message => {
  if(message.content.toLowerCase() === ".tag")
   return message.channel.send(`\`${diclog.server.tag} - ${diclog.server.tag2}\``)
});

client.on("message", message => {
  if(message.content.toLowerCase() === "!tag")
   return message.channel.send(`\`${diclog.server.tag} - ${diclog.server.tag2}\``)
});


  //------------------------------------------------------TAG--------------------------------------------------------\\

//------------------------------------------------------HOŞGELDİN MESAJI--------------------------------------------------------\\

client.on("guildMemberAdd", member => {
  require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
          '0': diclog.emojiler.sıfır,
          '1': diclog.emojiler.bir,
          '2': diclog.emojiler.iki,
          '3': diclog.emojiler.üç,
          '4': diclog.emojiler.dört,
          '5': diclog.emojiler.beş,
          '6': diclog.emojiler.altı,
          '7': diclog.emojiler.yedi,
          '8': diclog.emojiler.sekiz,
          '9': diclog.emojiler.dokuz}[d];})}
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
   const gecen = moment.duration(kurulus).format(`DD **Gün**`)

  var kontrol;
if (kurulus < 1295000000) kontrol = `Hesap Şüpheli. `
if (kurulus > 1296000000) kontrol = `Hesap Güvenli. `
  moment.locale("tr");

  const suphelibebe = new Discord.MessageEmbed()
  .setThumbnail(member.guild.iconURL({ dynamic: true }))
  .setColor('#5e0a0a')
  .setTitle('Sunucuya bir fake hesap giriş yaptı!')
  .setDescription(`**${member} kullanıcısı hesabını ${moment(member.user.createdAt).format("`DD MMMM YYYY, dddd (hh:mm)`")} tarihinde oluşturduğu için kişiye <@&${diclog.roller.suphelirol}> verildi!**`)
  if ((new Date().getTime() - member.user.createdAt.getTime()) / (1000 * 60 * 60 * 24) <= 15) {
    member.roles.add(diclog.roller.suphelirol)
    member.setNickname('Şüpheli Hesap')
    member.roles.add(diclog.roller.suphelirol)
    member.setNickname('Şüpheli Hesap')
    if (diclog.kanallar.welcome) client.channels.cache.get(diclog.kanallar.welcome).send(suphelibebe)
    } else {
      member.roles.add(diclog.roller.otorol);
      member.roles.add(diclog.roller.otorol2);
       member.roles.add(diclog.roller.otorol);
  member.roles.add(diclog.roller.otorol2);
member.setNickname('İsim | Yaş')
member.setNickname('İsim | Yaş')
  client.channels.cache.get(diclog.kanallar.welcome).send(`

  ${diclog.emojiler.helikopter} ** ${member.guild.name} ** Sunucusuna hoşgeldin  <@`+ member +`> . Bizde seni bekliyorduk! 
  
        Hesabın **${moment(member.user.createdAt).format("`DD MMMM YYYY, dddd (hh:mm)`")}** tarihinde  \``+gecen+`\` önce oluşturulmuştur.
        ${diclog.emojiler.helikopter}Seninle beraber `+üyesayısı+` Kişiyiz.

    <#${diclog.kanallar.rules}> Kanalında belirtilen kuralları lütfen okumayı ihmal etme!

    İsmine \`\`${diclog.server.tag}\`\` alarak ailemize katılabilirsin.
    **Yetkililerimiz sol tarafta bulunan teyit kanallarında seni bekliyor olacak.**
`)     }
});

//------------------------------------------------------HOŞGELDİN MESAJI--------------------------------------------------------\\
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('#5e0a0a').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk Sebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('#5e0a0a').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});
  //--------------------------------------------------------MESSAGE-LOG--------------------------------------------------------\\

  client.on("messageDelete", function (message) {

   if(message.author.bot) return;
   var footer = diclog.server.footer
   let undefined = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
    .setTitle('Mesaj Silindi!')
    .setDescription(`
          **Kullanıcı**;
          ${message.author.tag}

          **Mesaj Silinen Kanal**
          <#${message.channel.id}>
          
          **Silinen Mesaj**
          \`\`${message.content}\`\`    
          `)

      .setTimestamp()
      .setColor("#5e0a0a")
      .setFooter(footer);

      client.channels.cache.get(diclog.kanallar.mesajlog).send(undefined)
  });

  client.on("messageUpdate", function (oldMsg, newMsg) {
  	   var footer = diclog.server.footer

    
    if(newMsg.author.bot) return;

    let undefined = new Discord.MessageEmbed()

    .setTitle('Mesaj Düzenlendi')
     .setDescription(`

      
      **Kullanıcı**
      ${newMsg.author.tag}
      
      **Eski Mesaj**
      \`\`${oldMsg.content}\`\`
      
      **Yeni Mesaj **
      \`\`${newMsg.content}\`\``)

      .setTimestamp()
      .setColor("#5e0a0a")
      .setFooter(footer);

      client.channels.cache.get(diclog.kanallar.mesajelog).send(undefined)
  });
client.on("messageDelete", async message => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
   db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
  if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});
  //--------------------------------------------------------MESSAGE-LOG------------------------------------------------------\\


 //---------------Botu Sese Sokma------------\\
 
 client.on("ready", () => {
   client.channels.cache.get(diclog.kanallar.botseskanal).join();
 })
 
 //---------------Botu Sese Sokma------------\\
 

  //------------------------------------------------------AFK------------------------------------------------------\\


 //------------------------------------------------------AFK------------------------------------------------------\\

//------------------------------------------------------AYARLAMALI-REKLAM-ENGEL------------------------------------------------------\\

client.on("message", message => { // undefined

   const undefined = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".party",
    "discord.gg"
   ];

   if(undefined.some(kelime => message.content.toLowerCase().includes(kelime))) {
    try {

      if(!message.member.hasPermission("ADMINISTRATOR")) { // bu yetkiye sahip olanları etkilemiyor
       message.delete();
       let rekalmhe = db.fetch(`reklamcı.${message.author.id}.reklams`); 

       if(rekalmhe === null) rekalmhe = "0"  
       if(rekalmhe === undefined) rekalmhe = "0"
       let guild = message.guild;

       if(rekalmhe > 15) return guild.members.ban(message.author, {reason: 'DICLOK REKLAM KORUMA?'})

        return  db.add(`reklamcı.${message.author.id}.reklams`, 1),
         message.channel.send(new Discord.MessageEmbed()


         .setDescription(`${message.author} Bu sunucuda reklam yapmak yasaktır! Birden fazla atarsan banlamak zorunda kalacağım!`)
         .setColor("#5e0a0a")
         .setAuthor(message.member.displayName, message.author.avatarURL())
         .setTimestamp())
         .then(x => x.delete({ timeout: 5000 }))

     }
   } catch (err) {
           console.log(err);
        }
   }
}); // undefined

//------------------------------------------------------AYARLAMALI-REKLAM-ENGEL------------------------------------------------------\\

Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

//------------------------------------------------------AYARLAMALI-KÜFÜR-ENGEL------------------------------------------------------\\
client.on('voiceStateUpdate', async (oldState, newState) => {

 /**
 * @param {VoiceState} oldState
 * @param {VoiceState} newState 
 */



        let sesgirişlog = client.channels.cache.get(diclog.kanallar.sesgirişlog);
        let sesçıkışlog= client.channels.cache.get(diclog.kanallar.sesçıkışlog);
        let odadeğiştirmelog = client.channels.cache.get(diclog.kanallar.odadeğiştirmelog);
        let susturmalog = client.channels.cache.get(diclog.kanallar.susturmalog);
        let logKanali = client.channels.cache.get(diclog.kanallar.sağırlaştırmalog);

        if (!oldState.channelID && newState.channelID) return sesgirişlog.send(`${diclog.emojiler.sesemoji}**\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı ses kanalına giriş yaptı!**`).catch();
        if (oldState.channelID && !newState.channelID) return sesçıkışlog.send(`${diclog.emojiler.sesemoji}**\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı ses kanalından çıkış yaptı**`).catch();
        if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return odadeğiştirmelog.send(`${diclog.emojiler.sesemoji} **\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi ses kanalını değiştirdi! (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)**`).catch();
        if (oldState.channelID && !oldState.selfMute && newState.selfMute) return susturmalog.send(`${diclog.emojiler.mute}  **\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini susturdu!**`).catch();
        if (oldState.channelID && oldState.selfMute && !newState.selfMute) return susturmalog.send(`${diclog.emojiler.unmute} **\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını kaldırdı!**`).catch();
        if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return logKanali.send(`${diclog.emojiler.unmute} \`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
        if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return logKanali.send(`${diclog.emojiler.mute}  \`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
})


   //------------------------------------------------------AYARLAMALI-KÜFÜR-ENGEL------------------------------------------------------\\

//------------------------------------------------------TAG-ALINCA-VERİLECEK-ROL------------------------------------------------------\\

client.on("userUpdate", (oldUser, newUser) => {
  const settings = db.get("settings") || [];
  const guild = client.guilds.cache.get(diclog.server.sunucuid);
  let log = guild.channels.cache.get(diclog.kanallar.taglog);
  
  let member = guild.members.cache.get(oldUser.id);
  
  
  if (newUser.username.includes(diclog.server.tag) && !member.roles.cache.get(diclog.roller.taglırol)) {
  member.roles.add(diclog.roller.taglırol);
  log.send(`**${member} tagımızı alarak ailemize katıldı!**`)
  }
  if (!newUser.username.includes(diclog.server.tag) && member.roles.cache.get(diclog.roller.taglırol)) {
    if(db.fetch(`taglıAlım.${member.guild.id}`)) {
  member.roles.set([diclog.roller.otorol]);
  } else {
  member.roles.remove(diclog.roller.taglırol);
  }
  member.setNickname(member.displayName.replace(settings.tag, settings.unTag))
  log.send(`**${member} tagımızı çıkararak ailemizden ayrıldı!**`)
  }
  })




client.on("guildMemberAdd", member => {
  let sunucuid = diclog.server.sunucuid //Buraya sunucunuzun IDsini yazın
  let tag = diclog.server.tag //Buraya tagınızı yazın
  let rol = diclog.roller.taglırol //Buraya tag alındığı zaman verilecek rolün IDsini yazın
if(member.user.username.includes(tag)){ 
member.roles.add(rol)
     client.channels.cache.get(diclog.kanallar.taglog).send(`**${member} adlı kullanıcı aramıza taglı olarak katıldı!**`)
    }
  })
  
//------------------------------------------------------TAG-ALINCA-VERİLECEK-ROL------------------------------------------------------\\

//------------------------------------------------------SA-AS------------------------------------------------------\\

   client.on("message", async (message, guild, member) => {
        if(message.content.toLowerCase() === "sa") {
        return message.reply("Aleyküm Selam Hoşgeldin!")
       }
        if(message.content.toLowerCase() === "selam") {
        return message.reply("Aleyküm Selam Hoşgeldin!")
       }
       if(message.content.toLowerCase() === "slm") {
        return message.reply("Aleyküm Selam Hoşgeldin!")
       }
       if(message.content.toLowerCase() === "selamun aleyküm") {
        return message.reply("Aleyküm Selam Hoşgeldin!")
       } 
       if(message.content.toLowerCase() === "sea") {
        return message.reply("Aleyküm Selam Hoşgeldin!")
       }


   });
  
//------------------------------------------------------SA-AS------------------------------------------------------\\
const kiltifat = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Kyle seni çok seviyor...',
    'Mucizelerden bahsediyordum.',
];
client.on("message", async message => {
  if(message.channel.id !== (diclog.kanallar.genelchat)) return;
  let Knavedev = db.get('chatiltifat');
   db.add("chatiltifat", 1);
  if(Knavedev >= 100) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
    message.reply(`${(kiltifat)[random]}`);
  };
});
//------------------------------------------------------CAPS-KORUMA------------------------------------------------------\\
  
    client.on("message", async message => {
        if(message.channel.type === "dm") return; // özelden yazdıysa
        if(message.author.bot) return; // kullanıcı eğer botsa 

          if(message.content.length > 10) { // mesajın uzunluğu 5 harften büyükse
          

            let tanımsız = message.content.toUpperCase(); // toUpperCase yani büyük harflerle başlıyorsa Upper = Büyük
            if(message.content == tanımsız) {

              if(!message.member.hasPermission("ADMINISTRATOR")) { // bu yetkiye sahip olanları etkilemiyor
              if(!message.mentions.users.first()) {
                                   
                   message.delete();
                   return message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`${message.author} Bu sunucuda caps açmak yasaktır!`)
                    .setColor("#5e0a0a")
                    .setAuthor(message.member.displayName, message.author.avatarURL())
                    .setTimestamp())
                    .then(x => x.delete({ timeout: 5000}))
                     

                

              }
            }

          }
        }

      })


      
      
      
//------------------------------------------------------CAPS-KORUMA------------------------------------------------------\\