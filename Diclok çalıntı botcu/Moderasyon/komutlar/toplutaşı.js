const Discord = require('discord.js');
const db = require("quick.db");
const diclok = require('../conlok.json');

exports.run =  async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsin.")  // shréwd
    let channel = args[0];
    if (!channel) return message.channel.send("Kulanıcılar nereye taşınıcak?").then(x => x.delete({ timeout: 5000 }))
    const embed = new Discord.MessageEmbed()
    .setDescription('Kullanıcılar taşınıyor...');
    message.channel.send(embed).then(x => x.delete({ timeout: 5000 }))

    await message.guild.members.cache.forEach(async xx => {
        if (!xx.voice.channel) return;
        if (xx.voice.channel.id == channel) return;
        await xx.voice.setChannel(channel)

    })

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['toplutası', 'toplu-tası'],
    permLevel: 0
  }

  exports.help = {
    name: 'toplu-taşı',
    description: "Toplu taşır",
    usage: 'toplu-tasi'
  }
