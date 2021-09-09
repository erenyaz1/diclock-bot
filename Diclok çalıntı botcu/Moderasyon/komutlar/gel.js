const Discord = require("discord.js");
const diclog = require('../conlok.json')

exports.run = async (client, message, args) => {
  const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!mentioned) return message.channel.send(new Discord.MessageEmbed().setDescription(` Kullanıcı bulunamadı!`).setColor('#2f3136'));
  if (mentioned.user.id === message.member.user.id) return message.channel.send(new Discord.MessageEmbed().setDescription(` Kendi kendini etiketleme..`).setColor('#2f3136'));
  let kanal = message.member.voice.channel;
  if (!kanal) return message.channel.send("Hangi kanalda olduğunu bulamıyorum!");
  const cagirembed = new Discord.MessageEmbed()
      .setColor('#4b777e')
      .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
      .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
      .setTimestamp()
      //.setTitle("Birisinin sana ihtiyacı var!")
      .setDescription(`Sevgili ${mentioned}, ${message.member} Seni çağırıyor.`)
      .setThumbnail(mentioned.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
  try {
      var akısmoji = await message.channel.send(cagirembed);
      await akısmoji.react("✔️");
      await akısmoji.react("❌");
  } catch (error) {
      console.error(error);
  }
  const filter = (reaction, user) => user.id !== message.client.user.id;
  const collector = akısmoji.createReactionCollector(filter, {
      time: 120000
  });
  collector.on("collect", async (reaction, user) => {
      if (user.id !== mentioned.user.id) return reaction.users.remove(user);
      kanal = message.member.voice.channel;
      if (!kanal) {
          collector.stop();
          return message.channel.send("Hangi kanalda olduğunu bulamıyorum!");
      }
      switch (reaction.emoji.name) {
          case "✔️":
            await mentioned.voice.setChannel(message.member.voice.channelID);
            collector.stop();
              await akısmoji.edit(cagirembed.setDescription(`${mentioned} kullanıcısı başarıyla ${message.member} kullanıcısının olduğu **${kanal.name}** isimli kanala taşınmıştır.`).setThumbnail(message.guild.iconURL()));
              break;
          case "❌":
            await akısmoji.edit(cagirembed.setDescription(`${mentioned} kullanıcısı ${message.member} kullanıcısının ses davetini reddetti`).setThumbnail(message.guild.iconURL()));
              collector.stop();
              break;
          default:
              break;
      }
  });
  collector.on("end", async () => {
      await akısmoji.reactions.removeAll();
  });
}

exports.conf = {
    enabled: true,
    aliases: ['çek'],
    guildOnly: false,
    permLevel: 0
  };
  
  exports.help = {
    name: 'çek',
    usage: 'çek'
};