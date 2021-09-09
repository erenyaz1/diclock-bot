const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const diclok = require('../conlok.json')
const moment = require('moment')
const ms = require('ms')

exports.run = async(client, message, args) => {
if(![diclok.roller.jailyt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.JailSpearID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));

if (!args[1]) return message.reply('Bir süre belirt. (\`1s, 1m, 1h, 1d, 1y\`)')
let timereplace = args[1];
let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2
let atılmaay = moment(Date.now()).format("MM")
let atılmagün = moment(Date.now()).format("DD")
let atılmasaat = moment(Date.now()).format("HH:mm:ss")
let bitişay = moment(tarih3).format("MM")
let bitişgün = moment(tarih3).format("DD")
let bitişsaat = moment(tarih3).format("HH:mm:ss")
let jailatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
let jailbitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
moment.locale("tr")

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let zaman = args[1]
let sebep = args[2] || 'Belirtilmemiş'
if(!args[1]) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir zaman belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!member) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Kendini muteleyemezsin!').then(x => x.delete({ timeout: 8000}))  
if(member.id === client.user.id) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Botu muteleyemezsin!').then(x => x.delete({ timeout: 8000}))  
if(member.id === message.guild.OwnerID) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send('Sunucu sahibini mutelemek mi?').then(x => x.delete({ timeout: 8000}))  

let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
//
var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");  
  

if([diclok.roller.jailrol].some(role => member.roles.cache.get(role))) return message.react(diclok.emojiler.onaylanmamıs), message.channel.send(new MessageEmbed().setDescription(`${message.author}, ${member} **Zaten cezalandırılmış.**`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
member.roles.add(diclok.roller.jailrol);
db.add(`yetkili.${message.author.id}.jail`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
let cezaID = db.get(`cezaid.${message.guild.id}`)+1
db.add(`cezaid.${message.guild.id}`, +1);
db.push("cezass", { id: member.id, bitis: Date.now()+ms(time) });
db.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, kisi: member.id, id: cezaID, zaman: Date.now(), komut: "Cezalandırılma" });
db.set(`mstatus.${member.id}.${message.guild.id}`, true);
db.push(`sicil.${member.id}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, id: cezaID, zaman: Date.now(), komut: "Cezalandırılma" });
db.add(`cezapuan.${member.id}.${message.guild.id}`, +15);
db.add(`cezalandırılmaa.${message.author.id}.${message.guild.id}`, +1);
db.add(`cezalandırılma.${member.id}.${message.guild.id}`, +1);
let cpuan = db.get(`cezapuan.${member.id}.${message.guild.id}`);

const footer = diclok.server.footer

member.roles.cache.forEach(r => {
member.roles.remove(r.id)
db.set(`${message.guild.id}.jail.${member.id}.roles.${r.id}`, r.id )})
moment.locale("tr");
const mutelendin = new MessageEmbed()
.setDescription(`**${message.author}, ${member} kullanıcısını \`\`${sebep}\`\` nedeni ile \`\`${args[1].replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün')}\`\` boyunca cezalandırıldı. [Ceza Numarası: \`#${cezaID}]\`**`)
.setColor('#5e0a0a')
.setFooter(footer)
message.channel.send(mutelendin).then(x => x.delete({ timeout: 12000}))  

const modlogg = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setTitle('Bir Kişi Cezalandırıldı')
.setColor('#5e0a0a')
.setTimestamp()
.setDescription(`
**Kullanıcı:** ${member} - \`\`(${member.id})\`\`
**Yetkili:** ${message.author} - \`\`(${message.author.id})\`\`
**Ceza Süresi:** \`\`${jailatılma}\`\` **-** \`\`${jailbitiş}\`\` 
**Sebep:** [\`\`${sebep}\`\`]`)
.setFooter(footer, message.author.avatarURL({dynamic:true}))   
message.react(diclok.emojiler.onay).then(() => {
  setTimeout(function () {

  message.delete()
  },5000);
})

if(diclok.kanallar.mutelog && client.channels.cache.has(diclok.kanallar.mutelog)) client.channels.cache.get(diclok.kanallar.mutelog).send(modlogg)

setTimeout(async () =>{
member.roles.remove(diclok.roller.jailrol)
}, ms(zaman));
            setTimeout(async () =>{
message.guild.roles.cache.forEach(async r => {
const roller = await db.fetch(`${message.guild.id}.jail.${member.id}.roles.${r.id}` )
if(roller != r.id)  return ;
if(roller){member.roles.add(roller)}
db.delete(`${message.guild.id}.jail.${member.id}.roles.${r.id}`)
})
              }, ms(zaman));


}

exports.conf = {aliases: ["cezalandır"], permLevel: 0} 
exports.help = {name: "jail"}