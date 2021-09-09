var Discord = require("discord.js");
const ms = require("ms");
  exports.run = async (bot, message, args = []) => {

    if (!message.member.roles.cache.has("828675218499174421")) return
    if (args[0] == "kilit") {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        }).then(async() => {
            await message.channel.send("Kanal başarıyla kilitlendi.", message.author, message.channel)
        })
    }

    if (args[0] == "aç") {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        }).then(async() => {
            await message.channel.send("Kanalın kilidi başarıyla açıldı.", message.author, message.channel)
        })
      }
    




};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lockdown"],
  permLevel: 0
};

exports.help = {
  name: "lockdown",
  description: "locks the channel down",
  category: "administration",
  usage: " lockdown <time>"
};