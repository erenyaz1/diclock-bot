const Discord = require("discord.js");
const db = require("quick.db");
const diclok = require("../conlok.json");

exports.run = function (client, message, args)  {

    let executor = message.member
	    let cezaID = Number (args[0]);
    if (!Number(args[0])) return message.reply("Lütfen bir ceza ID'si giriniz (`.cezaID 1`)")
    let punishment = db.fetch(`punishments.${cezaID}.${message.guild.id}`) || {};
    let victim = client.users.fetch(punishment.kisi) || punishment.kisi;
    let mod = client.users.fetch(punishment.mod) || punishment.mod;
    let zaman = punishment.zaman;

    if (punishment == null || punishment == undefined) return messaga.channel.send(`**Veritabanında bilgi bulunamadı!**`)
    if (cezaID == null || cezaID == undefined) return messaga.channel.send(`**Böyle bir ceza numarası bulunamamaktadır! (\`#${cezaID}\`)**`)

    const embeds = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .addFields(
    { name: 'Ceza Alan Üye', value: `${message.guild.members.cache.get(punishment.kisi) || punishment.kisi} (\`${victim.id || punishment.kisi}\`)`, inline: true },
    { name: 'Cezalandıran Yetkili', value: `${message.guild.members.cache.get(punishment.mod) || punishment.mod} (\`${mod.id || punishment.mod}\`)`, inline: true },
    { name: 'Ceza Bilgisi', value: `**${punishment.komut}**`, inline: true },
)
.addFields(
{ name: 'Ceza Tarihi', value: `\`${new Date(zaman).toTurkishFormatDate()}\``, inline: true },
{ name: 'Ceza Sebebi', value: `[\`${punishment.sebep}\`]`, inline: true },
{ name: 'Ceza Numarası', value: `⌊\`#${cezaID}\`⌉`, inline: true },
)
.setFooter(`${diclok.server.footer}`)
message.channel.send(embeds).then(x => x.delete({ timeout: 12000}))  



};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["cezabilgi", "cb",],
    permlevel: 0
  };
  
  exports.help = {
    name: "CezaBilgi",
    description: "Belirtilen kullanıcıyı özel mesajlarında gözükecek şekilde uyarır.",
    usage: "cezabilgi"
};