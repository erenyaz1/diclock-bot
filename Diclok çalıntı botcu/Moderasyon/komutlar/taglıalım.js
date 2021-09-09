const Discord = require('discord.js')
const db = require('quick.db')
const diclok = require("../conlok.json")
const ayar = require('../ayarlar.json')
const moment = require("moment");
const ms = require('ms')
module.exports.run = async (client, message, args) => {

if (message.author.id != ayar.developer) return;

if (args[0] === "aç") {
if(db.fetch(`taglıAlım.${message.guild.id}`)) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(new Discord.MessageEmbed().setDescription(`**Taglı alım sistemi zaten aktif!**`))
db.set(`taglıAlım.${message.guild.id}`, "taglıAlım")
message.react(diclok.emojiler.onay), message.channel.send(new Discord.MessageEmbed().setDescription(`Taglı alım sistemi aktif edildi!`))
return;    

} else
 if (args[0] === "kapat") {
if(!db.fetch(`taglıAlım.${message.guild.id}`)) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(new Discord.MessageEmbed().setDescription(`Taglı alım sistemi zaten devre dışı!`))
db.delete(`taglıAlım.${message.guild.id}`)
message.react(diclok.emojiler.onay), message.channel.send(new Discord.MessageEmbed().setDescription(`**Taglı alım sistemi devre dışı bırakıldı!**`))
return;    
};
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["taglıalım"],
  PermLevel: 0
};

 

exports.help = {
  name: "taglıalım",
  description: "taglıalım",
  usage: "taglıalım"
};