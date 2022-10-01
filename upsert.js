//Módulos.   https://fg98.epizy.com
require('./config');

const fs = require('fs')
const os = require("os");
const PhoneNumber = require('awesome-phonenumber')
const translate = require('@vitalets/google-translate-api');
const { exec, spawn, execSync } = require("child_process")
const { EmojiAPI } = require("emoji-api")
const FileType = require('file-type')
const request = require('request')
const chalk = require('chalk')
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const moment = require("moment-timezone")
const logos = require('textmaker-thiccy');
const util = require('util')
const gis = require('g-i-s');
const yts = require('yt-search')

// Functions
const { color } = require('./lib/color'); 
const { yta, ytv } = require('./lib/Scraper/y2mate')
const { addBan, unBan, BannedExpired, cekBannedUser } = require('./lib/banned')
const { fetchJson, getJson, kyun, writeExif } = require('./lib/fetcher')
const { sleep, uploadImages, getBuffer, getRandom, formatNumber, h2k, niceBytes, Json, JsonFile, create } = require('./lib/functions')
const { formatp, isUrl, runtime, parseMention } = require('./lib/src/Functions')

// Setting
let emoji = new EmojiAPI()
let botname = name
let ownerNumber = owner
let Scrap = require('./lib/Scraper/scrapper')
let { downloadMedia } = require('./lib/simple')

//new Set()
const cosechar = new Set()
const minar = new Set()
const pescar = new Set()
const talar = new Set()
const xo = new Set()

//Archivos Json
var mute = JsonFile('./database/Json/mute.json')
var ban = JsonFile('./database/Json/ban.json')
var antilink = JsonFile('./database/Json/antilink.json')
var antilinkmax = JsonFile('./database/Json/antilinkmax.json')
var autosticker = JsonFile('./database/Json/autosticker.json')
var nsfw = JsonFile('./database/Json/nsfw.json')
var leveling = JsonFile('./database/Json/leveling.json')
var mods = JsonFile('./database/Json/mods.json')
var pre = JsonFile('./database/Json/premium.json')
var antitrabas = JsonFile('./database/Json/antitrabas.json')
var bad = JsonFile('./database/bad.json')

// Menús
let { menuofc } = require('./Msg/Menus/menu.js')
let { menulogos } = require('./Msg/Menus/menu2.js')
let { menunsfw } = require('./Msg/Menus/menu3.js')

// Configuraciones
let Publi_Priv = true
let limituser = 100
let chat2 = '❑'
let hitsDay = []
let _ttt = []
let ttt_id = []
let players1 = []
let players2 = []
let startXO = []
let listJadibot = []
let hits = JsonFile('./database/global.json')
let addHit = () => {
hits[0].global += 1
fs.writeFileSync('./database/global.json', Json(hits))
}

const { addRpgUser, gaming } = require('./assets/rpg') //Rpg
const { addBalance, addBal, checkBal, removeBal, balance } = require('./assets/balance') //Balance 
const { buyLimit, addLimit, removeLimit, getLimit, limit } = require('./assets/limites') //Limites 
const { getLevelingXp, getLevelingLevel, addLevelingXp, addLevelingLevel, addLevelingId, level } = require('./assets/leveling') //Leveling 
const { addAdvUser, addAdv, getAdv, warn } = require('./assets/warn') //Advertencias


module.exports = async(Tesla, m, v, store, welcome) => {
if (v.key && v.key.remoteJid === 'status@broadcast') return
if (v.key.id.startsWith('BAE5') && v.key.id.length === 16) return

   try {
       if (multiprefix) {
       var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~,¿;+×!#$%^&?./\\©^]/.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™✓=|~,¿;+×!#$%^&?./\\©^]/gi) : '/'
       } else if (noprefix) {
       prefix = ''
       } else if (unprefix) {
       prefix = prefijo
       }
       const isCmd = m.body.startsWith(prefix)
       const CmdStick = (m.type === 'stickerMessage') ? m.message.stickerMessage.fileSha256.toString('base64') : ''
       const command = isCmd ? m.body.slice(noprefix ? 0 : 1).trim().split(' ').shift().toLowerCase() : ''
       const args = m.body.trim().split(/ +/).slice(1)
       const q = args.join(' ')
       const botNumber = Tesla.user.id.split(':')[0] + "@s.whatsapp.net"
       const pushname =  m.pushName

       //Información del grupo
        const groupMetadata = m.isGroup ? await Tesla.groupMetadata(m.chat).catch(_ => null) : {}
        const participants = m.isGroup ? groupMetadata.participants : []
        const groupAdmins = m.isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : []

        //Configuración
        const isBan = cekBannedUser(m.sender, ban)
        const isMods = mods.includes(m.sender)
        const isOwner = ownerNumber.includes(m.sender)
        const isPre = pre.includes(m.sender)
        const rpg = gaming.filter(v => v.id.includes(m.sender))
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
       
        //Activaciones
        const isMuted = m.isGroup ? mute.includes(m.chat) : false
        const isLeveling = m.isGroup ? leveling.includes(m.chat) : false
        const isAntiLink = m.isGroup ? antilink.includes(m.chat) : false
        const isAntiLinkMax = m.isGroup ?  antilinkmax.includes(m.chat) : false
        const isNsfw = m.isGroup ? nsfw.includes(m.chat) : false
        const isAutostick = m.isGroup ? autosticker.includes(m.chat) : false
        const isWelcome = m.isGroup ? welcome.includes(m.chat) : false
        const isAntiTrabas = m.isGroup ? antitrabas.includes(m.chat) : false

        //Tictactoe Setting
        var isTTT = m.isGroup ? ttt_id.includes(m.chat) : false
        var isPlayer1 = m.isGroup ? players1.includes(m.sender) : false
        var isPlayer2 = m.isGroup ? players2.includes(m.sender) : false


   // Self / Public
      if (!Publi_Priv) {
          if (!m.key.fromMe && !isOwner && !isMods) return
        }

          // Chat Ban
           if (isMuted) {
      if (!m.key.fromMe && !isOwner && !isMods) return
     }

    if (q.length > 2500){
       if (isAntiTrabas === false) return
    if (!m.isGroup) return
     if (isOwner && m.key.fromMe && isMods) return m.react('👻')
  if (m.isBot && isAdmins) return m.react('👻')
       await m.reply('✨  DESTRABA  ✨\n'.repeat(400))
     await sleep(4000)
    await Tesla.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }

   //Bio del usuario
     try {
      bio = (await Tesla.fetchStatus(m.sender)).status
     } catch { bio = 'Bio privada.' }

    //fotos de perfil
        try {
         fotouser = await Tesla.profilePictureUrl(m.sender, 'image')
     } catch { fotouser = 'https://tinyurl.com/2afpgt2t' };


// Lenguaje
const { es, port, } = require('./Msg/index');
 id = m.sender
 if (id.startsWith('55')) {
 msg = port
 locate = 'pt'
 } else if (id.startsWith('5')) {
 msg = es
 locate = 'es'
 } else {
 msg = es
 locate = 'es'
 }


//Mención
const quotedMention = m.msg?.contextInfo != null ? m.msg?.contextInfo?.participant : ''
const tagMention = v.msg?.contextInfo != null ? v.msg?.contextInfo?.mentionedJid : []
const mention = typeof(tagMention) == 'string' ? [tagMention] : tagMention
mention != undefined ? mention.push(quotedMention) : []
const mentionUser = mention != undefined ? mention.filter(x => x) : []
const user = mentionUser[0] ? mentionUser[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '') + "@s.whatsapp.net" || `${q.replace('@','')}` + "@s.whatsapp.net"


//Muesta el comando usado en la consola
if (isCmd && m.isGroup) {
if (m.body === '.') return
isCmd ? hitsDay.push(command) : null
isCmd ? addHit() : null
console.log(color('[', 'magenta'), color('➳', 'white'), color(']', 'magenta'), color('Comando'), color(`${prefix + command}`, 'white'), color('Nombre'), color(`${isOwner ? 'Es Mi creador 👑' : `${pushname}`}`, 'white'), color('En el Grupo'), color(`${groupMetadata.subject}`, 'yellow'), 'Args:', color(args.length))
}

if (isCmd && !m.isGroup) {
if (m.body === '.') return
isCmd ? hitsDay.push(command) : ''
isCmd ? addHit() : ''
console.log(color('[', 'magenta'), color('➳', 'white'), color(']', 'magenta'), color('Comando'), color(`${prefix + command}`, 'white'), color('En Privado'), color('De', 'yellow'), color(`${isOwner ? 'Mi creador 👑' : `${pushname}`}`, 'white'), 'args:', color(args.length))
}

//Ban y AntiSpam
const { isFiltered, addFilter } = require('./lib/antispam')
if (isBan && isCmd && !isOwner) return m.react('❌')
if (isCmd && isFiltered(m.chat) && !m.isGroup && !isOwner) return m.reply(msg.spam(m.sender))
if (isCmd && isFiltered(m.chat) && m.isGroup && !isOwner) return m.reply(msg.spam(m.sender))


//Auto leer mensajes y Guarda usuarios en la database 
if (m.message) {
Tesla.readMessages([m.key])
addBalance(m.sender);
addLevelingId(m.sender);
addAdvUser(m.sender);
addRpgUser(m.sender);
}


// El bot se saldrá si entra a un grupo con menos de 10 participantes 
if (isCmd && m.isGroup && !isOwner){
Membs = await participants.map(v => v.id)
if (Membs.length < 10) {
m.reply('*[ × ] Lo siento, mínimo para usar el bot en un grupo se necesitan estar máximo 10 personas.*')
await sleep(3000)
await Tesla.groupLeave(m.chat)
      }
  };

//Checar el Dinero del usuario
var checkDinero = (users) =>{
return checkBal(users) ? checkBal(users) : "0"
}

//Checar la Xp del usuario
var checkXp = (users) =>{
return getLevelingXp(users) ? getLevelingXp(users) : "0"
}

//Checar el nivel del usuario
var checkLv = (users) =>{
return getLevelingLevel(users) ? getLevelingLevel(users) : "1"
}

//Checar los Límites restantes del usuario
var checkLimits = (users) =>{
return getLimit(users) ? getLimit(users) : "0"
}

//Números al azar
const Numer = Math.floor(Math.random() * 1000)


//Quoteds
const isViewOnce = (m.type == "viewOnceMessage")
const isQuotedMsg = (m.type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? Json(m.message).includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? Json(m.message).includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? Json(m.message).includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? Json(m.message).includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? Json(m.message).includes('stickerMessage') ? true : false : false


//Función Limit
const checkLimit = (sender) =>{
let position = false
userlimit = ''
Object.keys(limit).forEach((i) => {
if (limit[i].id === sender) {
position = i
       }
    })
if (position !== false) {
let limitCounts = limituser - limit[position].limit
if (!limitCounts < 0) return '*_[ ! ] has alcanzado tu límite de comandos. [ ! ]_*'
userlimit += limitCounts
   }
   return userlimit
};

const isLimit = (sender) =>{ 
if (isOwner && isMods && isPre) return false
let position = false
for (let i of limit) {
 if (i.id === sender) {
let limits = i.limit
  if (limits >= limituser) {
position = true
return true
} else {
position = true
return false
      }
   }
}
if (position === false) {
limit.push({ id: sender, limit: 0 })
fs.writeFileSync('./database/user/limit.json', Json(limit))
  }
}


const levelRole = checkLv(m.sender)
var role = 'Bronze I🥉'
if (levelRole <= 1) {
role = 'Bronze  I🥉'
} else if (levelRole <= 2) {
role = 'Bronze II🥉'
} else if (levelRole <= 3) {
role = 'Bronze  III🥉'
} else if (levelRole <= 4) {
role = 'Bronze  IV🥉'
} else if (levelRole <= 5) {
role = 'Bronze  V🥉'
} else if (levelRole <= 6) {
role = 'Prata I🥈'
} else if (levelRole <= 7) {
role = 'Prata II🥈'
} else if (levelRole <= 8) {
role = 'Prata III🥈'
} else if (levelRole <= 9) {
role = 'Prata IV🥈'
} else if (levelRole <= 10) {
role = 'Prata V🥈'
} else if (levelRole <= 11) {
role = 'Oro I🥇'
} else if (levelRole <= 12) {
role = 'Oro II🥇'
} else if (levelRole <= 13) {
role = 'Oro III🥇'
} else if (levelRole <= 14) {
role = 'Oro IV🥇'
} else if (levelRole <= 15) {
role = 'Oro V🥇'
} else if (levelRole <= 16) {
role = 'Campeon I🏆'
} else if (levelRole <= 17) {
role = 'Campeon II🏆'
} else if (levelRole <= 18) {
role = 'Campeon III🏆'
} else if (levelRole <= 19) {
role = 'Campeon IV🏆'
} else if (levelRole <= 20) {
role = 'Campeon V🏆'
} else if (levelRole <= 21) {
role = 'Diamante I 💎'
} else if (levelRole <= 22) {
role = 'Diamante II 💎'
} else if (levelRole <= 23) {
role = 'Diamante III 💎'
} else if (levelRole <= 24) {
role = 'Diamante IV 💎'
} else if (levelRole <= 25) {
role = 'Diamante V 💎'
} else if (levelRole <= 26) {
role = '⚔️ Rango máximo ⚔️'
}
//>> Nivel farm
if (m.isGroup && isLeveling) {
const amountXp = Math.floor(Math.random() * 50) + 50
const requiredXp = 5000 * (Math.pow(2, checkLv(m.sender)) - 1)
const getLevel = getLevelingLevel(m.sender)
addLevelingXp(m.sender, amountXp)
if (requiredXp < getLevelingXp(m.sender)) {
buyLimit(m.sender, 3)
//
addLevelingLevel(m.sender, 1)
levelup =`\t\t\t\t\t*Felicidades*

*🎁 Nombre:* ${pushname}
*🎁 Número:* ${PhoneNumber('+' + m.sender.split`@`[0]).getNumber('international')}
*🎁 Xp:* ${getLevelingXp(m.sender)}
*🎁 Rango:* ${role}
*🎁 Nivel:* ${getLevel} ⊱ ${getLevelingLevel(m.sender)}

*Level up🥳*
*+3 limites*`
await Tesla.sendMessage(m.chat, {image:{url: fotouser}, caption: levelup, mentions: [m.sender]}, {quoted: m})
}
};


//Mensaje a botones
const sendButMessage = (text, but, jid) => {
buttonMessage = {
text: text,
footer: botname,
buttons: but,
mentions: jid ? jid : [m.sender],
headerType: 1
}
Tesla.sendMessage(m.chat, buttonMessage, {quoted: m})
}

const sendButImageUrl = (img, text, but, jid) => {
buttonMessage = {
image: {url: img},
caption: text,
footer: botname,
buttons: but,
mentions: jid ? jid : [m.sender],
headerType: 4
}
Tesla.sendMessage(m.chat, buttonMessage, {quoted: m})
}

 const hour_now = moment.tz('America/Mexico_City').format('HH')
        var hourTime = 'Buenos Dias 🌄'
        if (hour_now >= '03' && hour_now <= '10') {
          hourTime = 'Buenos Dias 🌄'
        } else if (hour_now >= '10' && hour_now <= '14') {
          hourTime = 'Buenas Tardes 🌆'
        } else if (hour_now >= '14' && hour_now <= '17') {
          hourTime = 'Buenas Tardes 🌆'
        } else if (hour_now >= '17' && hour_now <= '18') {
          hourTime = 'Buenas Tardes 🌆'
        } else if (hour_now >= '18' && hour_now <= '23') {
          hourTime = 'Buenas Noches 🌚'
        } else {
          hourTime = 'Buenos Dias 🌄'
        }

        
	let d1 = new Date
	let gmt1 = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
	let ayer = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][Math.floor(((d1 * 1) + gmt1) / 84600000) % 7]
	let week1 = d1.toLocaleDateString(locate, { weekday: 'long' })
	let calender1 = d1.toLocaleDateString(locate, {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
	})


// Auto Sticker
if (m.isGroup === true && isAutostick === true) {
if (m.type === 'imageMessage') {
var buffer = await downloadMedia(m)
var rand1 = './media/' + getRandom('.jpg')
var rand2 = './media/ '+ getRandom('.webp')
fs.writeFileSync(rand1, buffer)
ffmpeg(rand1).on("error", console.error).on("end", async() => {
m.reply(msg.wait)
await writeExif(rand2, {packname: q ? q : "\t\t\t    © HadesBot - MD\n\n\nWhatsApp Lib Baileys Multi-Device®", author: ''}).then(stik => {
Tesla.sendMessage(m.chat, {sticker: stik}, {quoted: m})
fs.unlinkSync(rand1)
fs.unlinkSync(rand2)
})
}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(200,iw)':min'(200,ih)':force_original_aspect_ratio=decrease,fps=15, pad=200:200:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(rand2)
} else if (m.type === 'videoMessage') {
var buffer = await downloadMedia(m)
var rand1 = './media/' + getRandom('.mp4')
var rand2 = './media/' + getRandom('.webp')
fs.writeFileSync(rand1, buffer)
ffmpeg(rand1).on("error", console.error).on("end", async() => {
m.reply(msg.wait)
await writeExif(rand2, {packname: q ? q : "\t\t\t    © HadesBot - MD\n\n\nWhatsApp Lib Baileys Multi-Device®", author: ''}).then(stik => {
Tesla.sendMessage(m.chat, {sticker: stik}, {quoted: m})
fs.unlinkSync(rand1)
fs.unlinkSync(rand2)
})
}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(rand2)
}
}
		

const sendStickerFromUrl = (url) => {
               var names = getRandom('.webp')
				var name = getRandom('.png')
				var download = (url, callback) => request(url).pipe(fs.createWriteStream(name)).on('close', callback)
			  download(url, () => {
		      exec(`ffmpeg -i ${name} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${names}`, () => {
               writeExif(names, { packname: 'HadesBot - MD\n', author: '\n\n\n'+pushname+' 👑' }).then(stik => Tesla.sendMessage(m.chat, {sticker: stik, contextInfo: {"forwardingScore": 2, "isForwarded": true, "externalAdReply":{title: '© ' + pushname, "body": m.sender, thumbnail: fs.readFileSync('./media/loli.jpg')}}}, {quoted: m}))
              fs.unlinkSync(name)
              fs.unlinkSync(names)
                 })
               })
              };


const deleteitem = (arr, value) => {
      let index = arr.indexOf(value)
      if (index > -1) arr.splice(index, 1)
      return arr
   }


const spam = (teks, number, id, mens = [], mek = m) => new Promise(async(resolve, reject) => {
			if (!isNaN(number)) {
				for (let i = 1; Number(number) >= i; i++) {
					await m.reply(teks, id, mens, mek)
				}
				resolve('Sucess.')
			} else {
				reject('No number.')
			}
		})
		

const menu1 = menuofc(isOwner, m.sender, hourTime, week1, calender1, Publi_Priv, prefix)
const menu2 = menulogos(prefix)
const menu3 = menunsfw(prefix)


var adv = async() => {
if (getAdv(m.sender) < 4) {
addAdv(m.sender)
await m.react('❌')
m.reply(msg.busq)
} else {
m.reply("*Baneado por pvto >:v*")
if (isOwner) return
addBan(m.sender, ban)
if (!m.isGroup && !isBotAdmins) await Tesla.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
await Tesla.updateBlockStatus(m.sender, 'block')
}
}

if (m.sender.startsWith('2')) {
await Tesla.updateBlockStatus(m.sender, 'block')
}

if (isTTT && isPlayer2) {
if (m.body.toLowerCase() === 's') {
if (startXO.includes(m.sender)) return m.reply("La partida ya a iniciado!")
ttt = _ttt.filter(v => v.id.includes(m.chat))
iniciar = `*🎮 Comienza el juego tictactoe 🎳*

*Jugador 1*
❌ = @${ttt[0].player1.split`@`[0]}

*Jugador 2*
⭕ = @${ttt[0].player2.split`@`[0]}

${ttt[0].angar[1]}\t│\t${ttt[0].angar[2]}\t│\t${ttt[0].angar[3]}\n
${ttt[0].angar[4]}\t│\t${ttt[0].angar[5]}\t│\t${ttt[0].angar[6]}\n
${ttt[0].angar[7]}\t│\t${ttt[0].angar[8]}\t│\t${ttt[0].angar[9]}

*Empieza:* @${ttt[0].player1.split`@`[0]}`
m.reply(iniciar, m.chat, [ttt[0].player1, ttt[0].player2])
startXO.push(ttt[0].player2)
}
if (m.body.toLowerCase() === 'n') {
if (startXO.includes(m.sender)) return m.reply("La partida ya a iniciado!")
ttt = _ttt.filter(v => v.id.includes(m.chat))
m.reply("@" + ttt[0].player2.split`@`[0] + " Rechazo el juego.", m.chat, [ttt[0].player2, ttt[0].player1])
_ttt.splice(ttt, 1)
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt[0].player1)
deleteitem(players2, ttt[0].player2)
}};


switch (CmdStick) {
case "246,248,78,190,134,229,152,225,128,250,225,91,164,129,155,105,12,178,208,204,186,118,192,230,0,176,38,170,14,236,200,46": {
if (!m.isGroup) return
if (!isAdmins) return
if (!m.quoted) return m.reply("Etiqueta un mensaje!")
if (!m.quoted.fromMe && !isBotAdmins) return m.reply('Solo puedo eliminar mensajes míos, si en éste caso soy admin podré eliminar cualquier mensajes!')
await Tesla.sendMessage(m.chat, { delete: m.quoted.key })
}
break

case "49,254,66,112,170,228,162,142,162,106,123,80,70,158,236,171,54,148,115,90,95,30,39,126,8,62,157,20,37,209,0,134":
case "16,245,137,171,30,252,181,39,108,62,199,224,216,37,99,77,26,213,21,64,37,98,17,36,75,193,98,147,27,226,72,64": {
if (!m.isGroup) return
if (!isAdmins) return
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!mentionUser.length == 1) return m.reply('Etiqueta un mensaje o menciona a quién debo eliminar')
if (mentionUser.includes(botNumber)) return m.reply('No es posible auto eliminarme')
if (ownerNumber.includes(mentionUser[0])) return m.reply('No es posible eliminar a mi creador.')
if (groupAdmins.includes(mentionUser[0])) return m.reply('No es posible eliminar a un administrador.')
if (mentionUser[0] === m.sender) return m.react('❌')
await Tesla.groupParticipantsUpdate(m.chat, mentionUser, 'remove')
await m.react('✅')
m.reply("El usuario: @"+ mentionUser[0].split`@`[0] +" fué eliminado!", m.chat, mentionUser)
}
break

case "36,43,140,32,122,252,7,242,188,97,131,155,118,5,116,126,135,89,160,27,184,16,79,173,56,37,151,142,65,55,38,165": {
addFilter(m.chat)
let img = await m.createJpg(await getBuffer(fotouser), 250, 250)
await Tesla.relayMessage(m.chat, {"templateMessage":{"hydratedTemplate":{
"hydratedContentText": menu1,
"locationMessage": { "jpegThumbnail": img },
"hydratedFooterText": `Runtime:\n${runtime(process.uptime())}`,
"hydratedButtons": [
{"urlButton": {
"displayText": 'Creador 👤', "url": "https://Wa.me/"+ownerNumber[0].split('@')[0] }},
{"quickReplyButton": {
"displayText": 'Menus 📌', "id": prefix + "menu1" }}, 
{"quickReplyButton": {
"displayText": 'Ping ⏳', "id": prefix + "ping" }}, 
{"quickReplyButton": {
"displayText": 'InfoBot 🌐', "id": prefix + "infobot" }}
]
}}}, {})
}
break
}


switch (command) {
case 'serbot': {
if (!isOwner) return m.react('🙀')
if (Tesla.isJadiBot) return m.reply("No se puede crear un *SubBot* dentro de otro bot!")
const qrcode = require('qrcode')
const pino = require('pino')
const { default: makeWASocket, getContentType, useSingleFileAuthState, DisconnectReason, makeInMemoryStore } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./' + m.sender + '.json')
await v.react('✨')

var store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
var start = () => {
	var Miku = makeWASocket({
		logger: pino({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state,
	})
	Miku.ev.on('connection.update', async(anu) => {
		const { connection, lastDisconnect, qr } = anu
		if (connection === 'close') {
			if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
				start()
			} else {
				m.reply('*La conexión con WhatsApp a cerrado.*\n\n_[ ! ] Por favor vuelva a escanear el código qr_', m.chat, [], {key:{fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "6289523258649-1604595598@g.us"}, message:{imageMessage:{mimetype: "image/jpeg", caption: "HadesBot-MD", thumbnail: await m.createJpg(loli, 250, 250)}}})
			}
      }
    console.log('actualización de conexión', anu)
		if (qr != undefined) {
			var qrBot = await qrcode.toDataURL(qr, { scale: 8 })
			var messageBot = await Tesla.sendMessage(m.chat, {image: new Buffer.from(qrBot.replace('data:image/png;base64,', ''), 'base64'), caption: '¡Escanea este QR para convertirte en un bot temporal!\n\n1. Haga clic en los tres puntos en la esquina superior derecha.\n\n2. Toca WhatsApp Web\n\n3. Escanea este QR \n\nEl QR caduca en 30 segundos'}, {quoted: m})
			await sleep(30000)
			await Tesla.sendMessage(m.chat, { delete: messageBot.key })
		}
	 	if (connection === 'open') {
	    	Miku.isJadiBot = true
            let userJid = Tesla.user.id.split(':')[0] + '@s.whatsapp.net'
			m.reply('Nuevo bot activo\n\nUsuario: @' + userJid.split('@')[0], ownerNumber[0], [userJid])
			m.reply('*Conectado exitosamente con WhatsApp.*\n\n' + Json(Miku.user), m.chat, [], {key:{fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "6289523258649-1604595598@g.us"}, message:{imageMessage:{mimetype: "image/jpeg", caption: "HadesBot-MD", thumbnail: await m.createJpg(loli, 250, 250)}}})
		}
	})
	Miku.ev.on('creds.update', saveState)
    listJadibot.push(Miku.user)
	Miku.ev.on('messages.upsert', async (up) => {
    if (!up.messages) return
    const mek = up.messages[0]
    let m = require('./lib/simple').smsg(Miku, mek, store, welcome)
    if (!mek.message) return
    mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    require("./upsert")(Miku, m, mek, store)
  })
}
start()
}
break

case 'ping': case 'botstatus': case 'speed': case 'status': {
let speed = require('performance-now')
let timestamp = speed()
let latensi = speed() - timestamp
var teks = '*🏓 Velocidad:* ' + latensi.toFixed(4) + '\n\n*⏰ Tiempo online*: ' + runtime(process.uptime())
m.key.fromMe ? m.reply(teks) : m.isGroup ? m.requestpay(teks) : m.katalog(teks)
  }
break

case 'infobot':
let speed = require('performance-now')
let used = process.memoryUsage()
const timestamp = speed();
const latensi = speed() - timestamp
const { getDevice } = require("@adiwajshing/baileys")
users = await Tesla.fetchBlocklist()

private = store.chats.array.filter(v => v.id.includes('s.whatsapp.net'))
groups = store.chats.array.filter(v => v.id.includes('g.us'))
teks = `\t\t\t\t\tESTADÍSTICAS


*🔱 Chats Privados:* ${private.length}
*🔱 Chats Grupales:* ${groups.length}
*🔱 Total Chats:* ${private.length + groups.length}
*🔱 Speed:* ${latensi.toFixed(4)}
*🔱 Total Bloqueados:* ${users.length}
*🔱 Total Hit's:* ${hitsDay.length}
*🔱 Hit's Globales:* ${formatNumber(hits[0].global)}
*🔱 Runtime:*
${runtime(process.uptime())}

*🔱 Ram:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB
*🔱 PlataForma:* ${os.type()}
*🔱 HostName:* ${os.hostname()}
*🔱 Tipo Device:* ${getDevice(botNumber)}
*🔱 Runtime OS:*
${(kyun(os.uptime()))}


*🌐 Node.JS - Memoria Usada*
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}`
m.key.fromMe ? m.reply(teks) : m.livelog(teks)
break

case 'menu': case 'help':{
addFilter(m.chat)
let { generateWAMessageFromContent } = require('@adiwajshing/baileys')
m.key.fromMe ? await Tesla.sendMessage(m.chat, {document: global.loli, fileName: "HadesBot-MD 🎐", mimetype: 'application/zip', caption: menu1, mentions: [m.sender], footer: botname, buttons: [{buttonId: prefix + 'thanks', buttonText: {displayText: '‣ Agradecimientos'}, type: 1}], headerType: 4, contextInfo: {"externalAdReply": {"showAdAttribution": true, "title": `${week1} ${calender1}`, "previewType": "VIDEO", "thumbnail": global.Logo, "renderLargerThumbnail": true, "mediaType": 1}}}, {quoted: m}) : res = generateWAMessageFromContent(m.chat, {
"extendedTextMessage":{
"text": menu1,
"contextInfo":{
"mentionedJid": [m.sender],
"externalAdReply": {
"title": `Hola ${m.pushName}`,
"body": "Invitación a chat de grupo",
"previewType": "PHOTO",
"mediaType": 2,
"thumbnail": await getBuffer(fotouser),
"sourceUrl": 'https://chat.whatsapp.com/KzovPDLStsc7fU0DmdxAyk'}}}}, {quoted: m})
Tesla.relayMessage(m.chat, res.message, {})
}
break

case 'report': case 'bug':{
if (!q) return m.reply('_Y el texto para enviar el reporte donde esta?_')
if (q.length > 1000) return m.reply('Texto muy largo, podría ser una traba')
sendButImageUrl(fotouser, `*[   REPORTE   ]*

💎 *Nombre:* ${pushname}
💎 *Reporte:* ${m.isGroup ? 'Enviado desde un grupo.' : 'Enviado desde chat Privado.'}
💎 *Link:* Wa.me/${m.sender.split`@`[0]}
💎 *Problema:* ${q}`,
buttons = [{buttonId: prefix + 'adv ' + m.sender, buttonText:{displayText: 'Dar advertencia.'},type:1}], [m.sender], ownerNumber[0])
m.reply('*Gracias, el reporte a sido enviado a mi creador*\n\nTu solicitud será atendida lo más antes posible.\nEn casó de ser una broma serás baneado y bloqueado.\n\nText: ' + q)
}
break

case 'adv':
if (getAdv(args[0]) < 4) {
addAdv(args[0])
Tesla.sendMessage(args[0], {text: `\t\t\t*Has recibido una Advertencia*\n\n*Acabas de recibir una advertencia por enviar un reporte fake*.\n\nTotal advertencias: *${getAdv(q)}/5*\n\nNota:\n*Si llegas a 5 advertencias Seras baneado y bloqueado.*\n\n*Favor de no Jugar con el comando ${prefix}report*`}, {quoted: {key: {fromMe: false, participant: '5212213261679@s.whatsapp.net', remoteJid: "status@broadcast"}, message: {orderMessage:{itemCount: -1, status: -1, surface: -1, message: 'HadesBot - MD', thumbnail: await m.createJpg(global.Logo, 250, 250)}}}})
reply("*Advertencia enviada.*")
} else {
Tesla.sendMessage(args[0], {text: "*Baneado por pvto >:v*"}, {quoted: {key:{fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "6289523258649-1604595598@g.us"}, message:{imageMessage:{mimetype: "image/jpeg", caption: "HadesBot-MD", thumbnail: await m.createJpg(loli, 250, 250)}}}})
if (isOwner) return
addBan(args[0], ban)
await Tesla.updateBlockStatus(args[0], 'block')
}
break

case 'reglas':{
Tesla.sendMessage(m.chat, {image: global.Logo, caption: `*Reglas para no tener ningún problema*

${chat2} *No spam en privado.*

${chat2} *No spam en grupos.*

${chat2} *Sin llamadas al bot o Seras baneado.*

${chat2} *No buscar cosas inapropiadas / +18*

${chat2} *No enviar reportes fakes*


*Consecuencias por violar las reglas Los bots te bloquearán o dejarán los grupos.*

_y no estés apretando mis botones como pendejo :D_

*Powered by: @0*`, mentions: ["0@s.whatsapp.net"]}, {quoted: {key: {fromMe: false, participant: "5212213261679@s.whatsapp.net"}, message: {orderMessage: {orderId: "5212213261679@s.whatsapp.net", itemCount: -5, status: "INQUIRY", surface: "CATALOG", orderTitle: 'HadesBot - MD'}}}})
}
break

case 'menu1': case 'menus':{
addFilter(m.chat)
 sections = [
        {
     	title: "▢ Menu 2 / MenuLogos",
    	rows: [
	    {
	    title: "Menu2",
	    rowId: prefix + 'menu2'
	    }]
	    },
	    {
	    title: "▢ Menu3 / MenuNsfw",
	    rows: [
	    {
	    title: 'Menu3',
	    rowId: prefix + 'menu3'
	    }]
	    },
	    {
	    title: "▢ Reglas (Favor de leer las)",
	    rows: [
	    {
	    title: 'Reglas del bot',
	    rowId: prefix + 'reglas'
	    }]
	    },
	    {
	    title: "▢ Agradecimientos ",
	    rows: [
	    {
	    title: 'Ver agradecimientos',
	    rowId: prefix + 'thanks'
	    }]
	    }
]
listMessage = {
  text: `*Menus disponibles*`,
  footer: botname,
  buttonText: "Lista 🍉",
  sections
}
await Tesla.sendMessage(m.chat, listMessage, {quoted: m})
}
break

case 'menu2': case 'menumaker': {
addFilter(m.chat)
m.reply('*Cargando MenúMaker*')
await Tesla.sendMessage(m.chat, {document: global.loli, fileName: m.isGroup ? groupMetadata.subject : pushname, mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', caption: menu2, footer: botname, buttons: [{buttonId: prefix + 'menu', buttonText: {displayText: '‣ Menu'}, type: 1}], headerType: 4, contextInfo: {"externalAdReply": {"showAdAttribution": true, "title": `${week1} ${calender1}`, "previewType": "VIDEO", "thumbnail": global.Logo, "mediaUrl": 'https://youtube.com/watch?v=c9GGBv1n4qI', "sourceUrl": 'https://www.pornhub.com', "renderLargerThumbnail": true, "mediaType": 1}}}, {quoted: m})
}
break

case 'menu3': case 'menunsfw': {
addFilter(m.chat)
m.reply('*Cargando MenúNsfw*')
await Tesla.sendMessage(m.chat, {document: global.loli, fileName: m.isGroup ? groupMetadata.subject : pushname, mimetype: 'application/zip', caption: menu3, footer: botname, buttons: [{buttonId: prefix + 'menu', buttonText: {displayText: '‣ Menu'}, type: 1}], headerType: 4, contextInfo: {"externalAdReply": {"showAdAttribution": true, "title": `${week1} ${calender1}`, "previewType": "VIDEO", "thumbnail": global.Logo, "mediaUrl": 'https://youtube.com/watch?v=c9GGBv1n4qI', "sourceUrl": 'https://www.pornhub.com', "renderLargerThumbnail": true, "mediaType": 1}}}, {quoted: m})
}
break

case 'owner': case 'creador': case 'creator':{
let { generateWAMessageFromContent } = require('@adiwajshing/baileys')
res = generateWAMessageFromContent(m.chat, {"contactMessage": {"displayName": 'Mi Creador.', "vcard": 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'N:;Mi Creador.;;;\n' + 'FN:Mi creador.\n' + 'item1.TEL;waid=5212213261679:+52 1 221 326 1679\n' + 'item1.X-ABLabel:Móvil\n' + 'X-WA-BIZ-DESCRIPTION:👻♥️✨\n' + 'X-WA-BIZ-NAME:Mi creador.\n' + 'END:VCARD'}}, {quoted: m})
await Tesla.relayMessage(m.chat, res.message, {})
await m.reply(`*Esté el es contacto de mi creador*\n\nSolo háblale si tienes algún problema con el bot o si tienes alguna duda e igual puedes hablarle por si encuentras algunos textos mal.\n\nNota:\n- No se aceptan personas pará solo tener chats externos`, m.chat, [], res)
}
break

case 'miperfil': case 'miinfo': case 'perfil':
addFilter(m.chat)
userxp1 = 5000 * (Math.pow(2, checkLv(m.sender)) - 1)
sendButImageUrl(fotouser, `▢ *Nombre:* ${m.pushName}
▢ *№:* ${PhoneNumber('+' + m.sender.split`@`[0]).getNumber('international')}
▢ *Link:* Wa.me/${m.sender.split`@`[0]}

▢ *Rango:* ${role}
▢ *XP:* ${checkXp(m.sender)}  ( ${checkXp(m.sender)} / ${userxp1 ? userxp1 : '5000'} )
▢ *Level:* ${checkLv(m.sender)}

▢ *Balance:* $${h2k(checkDinero(m.sender))}  (${formatNumber(checkDinero(m.sender))})
▢ *Limites usados:* ${checkLimits(m.sender)}
▢ *Límites restantes:* ${isOwner ? '∞' : `${limituser ? `${limituser - getLimit(m.sender)}` : limituser}`.replace('NaN', '100')}

▢ *Moderador:* ${isMods ? '✅' : '❌'}
▢ *Premium:* ${isPre ? '✅' : '❌'}
▢ *Creador:* ${isOwner ? '✅' : '❌'}`, 
buttons = [
{buttonId: prefix + 'menu', buttonText: {displayText: '‣ Menu'}, type: 1}]
);
break


//==========  [  ECONOMÍA  ] =============//


case 'encuesta': {
if (!m.isGroup) return m.reply(msg.group)
if (!q) return m.reply("Y el texto?")
Tesla.relayMessage(m.chat, {
"pollCreationMessage": {
"contextInfo":{
"mentionedJid": participants.map(v => v.id)
},
"name": `*📊 Encuesta iniciada por: @${m.sender.split('@')[0]}*\n\nMotivó: ${q}`.trim(),
"options": [{"optionName": 'Votar por un Si' }, {"optionName": 'Votar por un No' }, {"optionName": 'Votar por un Nose' }, {"optionName": 'Votar por un Talvez' }],
"selectableOptionsCount": 1
}}, {})
}
break

case 'limites':
if (!limit.map(v => v.id).includes(m.sender)) return m.react('❌')
m.reply('*• Tus límite restante son:* ' + checkLimit(m.sender));
break

case 'bal': case 'balance':
if (!balance.map(v => v.id).includes(m.sender)) return m.react('❌')
m.reply("Actualmente tienes: *[ $" + formatNumber(checkDinero(m.sender)) + " ]*");
break

case 'comprar':{
if (!q) return m.reply("*• Ejemplo de usó:*\n\n"+prefix+command+" premium\n"+prefix+command+" limites 5")
if (args[0] === "premium") {
if (pre.includes(m.sender)) return m.reply("*_Ya eres un usuario premium!_*")
let valor = 500000
if (checkDinero(m.sender) < valor) return v.reply('No tienes suficiente dinero!!\n\n_Necesitas *'+ formatNumber(valor) +"* para poder comprar la membresía premium!_")
pre.push(m.sender)
fs.writeFileSync('./database/Json/premium.json', Json(pre))
removeBal(m.sender, valor)
m.react('✅')
m.reply("¡Felicidades @"+ m.sender.split`@`[0] +" ahora eres un usuario premium! 🎉")
} else if (args[0] === "limites") {
if (!limit.map(v => v.id).includes(m.sender)) return m.react('❌')
if (isNaN(args[1])) return m.reply("Ingresá la cantidad a comprar!\n\n*• Ejemplo de usó:*\n"+ prefix + command +" limites 10\n"+ prefix + command +" limites <cantidad>")
let valorLimit = 25
let compra = valorLimit * args[1]
if (checkDinero(m.sender) < compra) return v.reply('No tienes suficiente dinero para comprar '+ args[1] +' limites!')
buyLimit(m.sender, Number(args[1]))
removeBal(m.sender, compra)
await m.reply(`*Comprá realidad con éxito [ ✓ ]*

*${chat2} Límites comprados:* ${args[1]}
*${chat2} Valor de cada limite:* 25
*${chat2} Balance gastado:* ${compra}
*${chat2} Comprador:* @${m.sender.split`@`[0]}

Límites:
*[ ${checkLimit(m.sender) - args[1]} ]  => [ ${checkLimit(m.sender)} ]*`)
} else { m.react('❌') }
}
break 

case 'transfer': case "transferir":{
if (!m.isGroup) return m.reply(msg.group)
if (!q) return v.reply('Ingrese la cantidad que deseás transferir')
if (args[0].includes('.')) return m.reply("Solo se aceptan números normales!")
if (!mentionUser.length == 1) return m.reply(msg.ment)
if (isNaN(args[0])) return v.reply('El montón a transfer debe de ser un numero')
if (args[0] < 100) return v.reply("Mínimo para transferir es de $100")
if (checkDinero(m.sender) < args[0]) return v.reply('No tienes suficiente dinero!!')
if (!balance.map(v => v.id).includes(mentionUser[0])) return m.reply("*_[ × ] Lo siento, parece que el usuario @"+ user.split`@`[0] +" no se encuentra guardado en la base de datos!_*", m.chat, [user])
addBal(mentionUser[0],  Number(args[0]))
removeBal(m.sender, Number(args[0]))
await m.react('✅');
m.reply("Listo ✅")
}
break

case 'calc': case 'calcular': {
addFilter(m.chat)
if (!q) return m.reply('Hmmm...... Y la ecuación?')
global.math = global.math ? global.math : {}
let ed = m.chat
if (ed in global.math) {
clearTimeout(global.math[ed][3])
delete global.math[ed]
}
let val = q
.replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
.replace(/×/g, '*')
.replace(/÷/g, '/')
.replace(/π|pi/gi, 'Math.PI')
.replace(/e/gi, 'Math.E')
.replace(/\/+/g, '/')
.replace(/\++/g, '+')
.replace(/-+/g, '-')
let format = val
.replace(/Math\.PI/g, 'π')
.replace(/Math\.E/g, 'e')
.replace(/\//g, '÷')
.replace(/\*×/g, '×')
try {
console.log(val)
let result = (new Function('return ' + val))()
if (!result) throw result
m.reply(`*CALCULADORA*

*${q}*

├────────────┤ 

*Resultado*:

├────────────┤

*${result}*`)
} catch (e) {
if (e == undefined) return m.reply('?')
m.reply('Formato incorrecto, solo 0-9 y símbolo -, +, *, /, ×, ÷, π, e, (, ) son compatibles');
}}
break

case 'translate': case 'traducir': 
addFilter(m.chat)
if(!q) return m.reply('Ingresa el código de idioma y el texto para traducir\n\nEjemplo:\n' + prefix + command + ' es Hello')
to = args[0]
bahasa = {
id: 'Indonesia',
en: 'Inglés',
es: 'Español',
pt: 'Portugués',
ja: 'Japonés'
}
var lang = to || 'es'
if (!bahasa[lang]) return m.reply('language not supported: ' + lang);
if(!m.quoted) {
word = m.body.slice(9)
} else if(m.quoted){
word = m.quoted.text
}
await translate(word, {to: lang}).then(res => {
capt = `\t\t\t\t\t\t*TRADUCTOR*

*💎 Texto a traducir:* ${word}
*💎 Traduccion:* ${res.text}
*💎 Codigo:* ${bahasa[to]}`
m.reply(capt)
}).catch(v => m.reply(msg.error))
break

case 'topxp':{
if (level.map(e => e.id).length < 10) return m.reply("Personas insuficientes en la base de datos de nivel para crear un top!!")
level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
let top = '\t\t\t\t\t*🏆  Top XP  🏆*\n\n'
users = m.isGroup ? groupMetadata.participants.map(v => v.id) : []
for (let i = 0; i < 10; i++) {
top +=`*🏅 № ${i + 1}:* ${users.includes(level[i].id) ? '' : `
*▢ Usuario:* @${level[i].id.split`@`[0]}`}
*▢ Nombre:* ${await Tesla.getName(level[i].id)}
*▢ Link:* https://Wa.me/${level[i].id.split`@`[0]}
*▢ Nível:* ${getLevelingLevel(level[i].id)}
*▢ XP:* ${formatNumber(level[i].xp)}
\n\n`
};
await Tesla.reply(top)
}
break

case 'topdinero': case 'topbal':{
if (balance.map(e => e.id).length < 10) return m.reply("Personas insuficientes en la base de datos de dinero para crear un top!!")
balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
let top = '\t\t\t\t\t*🏆  Top Balance  🏆*\n\n'
users = m.isGroup ? groupMetadata.participants.map(v => v.id) : []
for (let i = 0; i < 10; i++) {
top +=`🏆 *№ ${i + 1}:* ${users.includes(balance[i].id) ? '' : `
*▢ Usuario:* @${balance[i].id.split`@`[0]}`}
*▢ Nombre:* ${await Tesla.getName(balance[i].id)}
*▢ Link:* https://Wa.me/${balance[i].id.split`@`[0]}
*▢ Balance:* $${h2k(balance[i].balance)} (${formatNumber(balance[i].balance)})
\n\n`
};
await Tesla.reply(top)
}
break


//==========  [ Others  ] =============//


case 'q': case 'quoted': {
if (!m.quoted) return reply('Etiqueta un mensaje!')
try {
let wokwol = await m.serializeM(await m.getQuotedObj())
if (!wokwol.quoted) return m.reply('El mensaje que etiquetó no contiene ningún mensaje etiquetado!')
await wokwol.quoted.copyNForward(m.chat, true)
} catch(e) {
m.reply('Error! el mensaje no pudo ser copiado')
};
}
break

case 'encode': {
if (!q) return m.reply(msg.txt)
var wordArray = require("crypto-js").enc.Utf8.parse(q);
var base64 = require("crypto-js").enc.Base64.stringify(wordArray);
m.reply(base64)
}
break

case 'decode': {
if (!q) return m.reply(msg.txt)
var parseWordArray = require("crypto-js").enc.Base64.parse(q);
var parsedStr = parseWordArray.toString(require("crypto-js").enc.Utf8);
m.reply(parsedStr)
}
break

case 'test':
i = await m.createJpg(global.loli, 250, 250)
let buttonMessage = { document: fs.readFileSync('./media/fake.jpg'), fileName: m.isGroup ? groupMetadata.subject : pushname, jpegThumbnail: i, mimetype: 'application/zip', fileLength: 887890909999999, pageCount: 1234567890123456789012345, caption: q, mentions: parseMention(q), footer: '*© HadesBot - MD*', buttons: [{buttonId: `${prefix}menu`, buttonText: {displayText: '‣ Menu'}, type: 1}], headerType: 4, contextInfo: {"externalAdReply": {"showAdAttribution": true, "title": `${week1} ${calender1}`, "mediaType": 2, "previewType": "VIDEO", "thumbnailUrl": "https://telegra.ph/file/d8dba7eee759ff82b35be.jpg", "mediaUrl": 'https://youtube.com/watch?v=c9GGBv1n4qI', "sourceUrl": 'https://chat.whatsapp.com/J6GuXns23L9IzgrUqWfUj7'}} }
await Tesla.sendMessage(m.chat, buttonMessage, {quoted: m})
break

case 'thanks':
Tesla.reply(`Hola ${pushname}

- Aqui te dare una lista de las personas que ayudaron a crear al bot:

- *📌 Kevin (ds6)*
🎐 Agradecimiento especial
${participants.map(v => v.id).includes('50768666666@s.whatsapp.net') ? '✨ https://Wa.me/50768666666' : '✨ @50768666666'}


- *📌 inkyGod (inkyGod03)*
🎐 Agradecimiento especial
${participants.map(v => v.id).includes('595995660558@s.whatsapp.net') ? '✨ https://Wa.me/595995660558' : '✨ @595995660558'}


- *📌 Hideki*
🎐 Agradecimiento especial
${participants.map(v => v.id).includes('5492615112937@s.whatsapp.net') ? '✨ https://Wa.me/5492615112937' : '✨ @5492615112937'}


*🚩 Powered by:*
- Adiwajshing => baileys
- @0`)
break

case 'tts':{
if (!q) return m.reply('Ingresa el código de idioma y el texto\n\n*Ejemplo:*\n'+prefix+command+' es Hello')
try {
const gtts = require('./lib/gtts')(args[0])
dtt = m.body.slice(7)
ranm = getRandom('.mp3')
if (dtt.length > 1000) return m.reply('El texto es muy largo')
await gtts.save(ranm, dtt, () => {
Tesla.sendMessage(m.chat, {audio: fs.readFileSync(ranm), mimetype: 'audio/mp3', seconds: -9999999999999, ptt: true, contextInfo: {"forwardingScore": 999, "isForwarded": true}}, {quoted: m})
fs.unlinkSync(ranm)
})
} catch { m.reply("Y el código de idioma?") }
 }
break


case 'react': case 'reac': case 'reation':
if (!q) return m.reply("Y el emoji?")
await Tesla.sendMessage(m.chat, {react: {text: args[0], key: m.quoted ? m.quoted.key : m.key} })
break

      
case 'getsticker':{
if (!mentionUser.length == 1) return m.reply(msg.ment)
try {
foto = await Tesla.profilePictureUrl(user, 'image')
} catch { foto = 'https://tinyurl.com/2afpgt2t' };
await sendStickerFromUrl(foto)
};
break


case 'getbalance': case 'getbal':
if (!mentionUser.length == 1) return m.reply(msg.ment)
m.reply(msg.getbal(user, formatNumber, checkDinero), m.chat, [user]);
break

case 'getexif':{
if (!isQuotedSticker) return m.reply(msg.st)
let webpv = require('node-webpmux');
let utilc = require('util');
let img = new webpv.Image();
await img.load(await m.quoted.downloadMedia());
v.reply(utilc.format(JSON.parse(img.exif.slice(22).toString())))
}
break

case 'copy':
if (!m.quoted) return m.react('❌')
await m.quoted.copyNForward(m.chat, true)
break

case 'listgp': case 'groups': case 'grupos':{
//if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
grupos = await store.chats.all().filter(v => v.id.includes('@g.us')).map(v => v.id)
let groups = `\t\t\t\t\t *LIST GROUP'S*\n\n*Total Grupos:* ${grupos.length}\n────────────────────────\n`
for (let i of grupos) {
let group_Metadata = await Tesla.groupMetadata(i)
botadmin = group_Metadata.participants.filter(v => v.admin !== null).map(v => v.id).includes(botNumber)
groups += `
▢ *Nombre:* ${group_Metadata.subject}
▢ *Creador:* ${group_Metadata.owner ? '@' + group_Metadata.owner.split`@`[0] : 'Sin creador.'}
▢ *ID:* ${group_Metadata.id}
▢ *Creado:* ${create(group_Metadata.creation)}
▢ *Participantes:* ${group_Metadata.participants.length}
▢ *Administradores:* ${await group_Metadata.participants.filter(v => v.admin !== null).map(v => v.id).length} ${botadmin ? `
▢ *Id Link:* ${await Tesla.groupInviteCode(i)}` : ''}


────────────────────────\n\n`;
};
Tesla.reply(groups, m.chat);
}
break


//==========  [  DESCARGAS  ] =============//


case 'play2': {
addFilter(m.chat)
if (!q) return m.reply(msg.music)
if (bad.includes(q)) return adv()
m.reply(msg.wait)
res1 = await yts(q)
res = await require('hxz-api').youtube(res1.all[0].url).catch(e => m.reply(msg.result))
buttons = [
  {buttonId: prefix + `play ${res1.all[0].url} music`, buttonText: {displayText: 'Audio 🎧'}, type: 1},
  {buttonId: prefix + `play ${res1.all[0].url} vid`, buttonText: {displayText: 'Video 📽'}, type: 1}
];
await Tesla.sendMessage(m.chat, {
    image: {url: res.thumb},
    caption: msg.play2(res, res1),
    footer: `Runtime:\n${runtime(process.uptime())}`,
    buttons: buttons,
    headerType: 4
}, {quoted: m})
}
break
 
case 'play': {
addFilter(m.chat)
if (!q) return m.reply(msg.music)
if (bad.includes(q)) return adv()

if (args[1] === 'music') {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
m.reply(msg.waitlimit)
try {
let media = await yta(args[0], '128kbps')
if (media.filesize > 100000) return m.reply(msg.peso)
Tesla.sendMessage(m.chat, {audio:{url: media.dl_link}, mimetype: 'audio/mp4', fileName: media.title+'.mp3', contextInfo: {"forwardingScore": 9999, "isForwarded": true}}, {quoted: m})
return await addLimit(m.sender)﻿
} catch { m.reply(msg.error) }

} else if (args[1] === 'vid') {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
m.reply(msg.waitlimit)
try {
let mediaVid = await ytv(args[0], '360p')
if (mediaVid.filesize >= 100000) return m.reply(msg.peso)
Tesla.sendMessage(m.chat, {video: {url: mediaVid.dl_link}, mimetype: 'video/mp4', fileName: `${mediaVid.title}.mp4`, caption: msg.playvid(mediaVid, isUrl, q)}, {quoted: m})
return await addLimit(m.sender)﻿
} catch { m.reply(msg.error) }
}

try {
m.reply(msg.wait + '\n\nSi no puedes ver el mensaje usa .play2');
res = (await yts(q)).all[0]
buffer = await m.createJpg(await getBuffer(res.image), 250, 250)
i = await translate(res.ago ? res.ago : '-', {to: 'es'})
await Tesla.relayMessage(m.chat, {"templateMessage":{"hydratedTemplate":{
"hydratedContentText": msg.play(q, res, i, formatNumber),
"locationMessage": { "jpegThumbnail": buffer },
"hydratedFooterText": `${res.title}
0:00  ●─────────  ${res.timestamp}
 ⇆ㅤ ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻﻿

                ılıılıılıılıılıılı`,
"hydratedButtons": [
{"urlButton": {
"displayText": 'Canal 🌐', "url": `${res.author.url}` }},
{"urlButton": {
"displayText": 'Video 🎦', "url": `${res.url}` }},
{"quickReplyButton": {
"displayText": 'Audio 🎧', "id": prefix + `play ${res.url} music` }}, 
{"quickReplyButton": {
"displayText": 'Video 📽️', "id": prefix + `play ${res.url} vid` }}, 
{"quickReplyButton": {
"displayText": '▢ Mas Opciones', "id": prefix + 'selec ' + res.title }}
]
}}}, {})
} catch { m.reply(msg.result) }
}
break

case 'ytshorts':{
if (!q) return m.reply(msg.link(prefix, command))
if (!args[0].includes('shorts')) return m.reply("Link invalid");
result = (await fetchJson('https://api-xcoders.xyz/api/download/ytshort?url='+ args[0] +'?feature=share&apikey=LLe5oMDifP')).result
txt =`*❑ Título:* ${result.title}\n*❑ Duración:* ${result.duration}\n*❑ Calidad:* ${result.quality}\n*❑ Tamaño:* ${result.size}\n*❑ Tags:* ${result.tags}`
Tesla.sendMessage(m.chat, {video:{url: result.url}, caption: txt}, {quoted: m})
}
break

case 'selec': {
addFilter(m.chat)
m.reply(msg.wait)
res = await yts(q)
 sections = [{
	title: "▢ Descargar archivos en forma de documentos",
	rows: [
	    {
	    title: "Descargar archivo mp3",
	    description: "\nDescargar el audio en formato de documento",
	    rowId: prefix+'playaudiodoc '+res.all[0].url
	    },
	    {
	    title: "Descargar archivo mp4",
	    description: "\nDescargar el vídeo en formato de documento",
	    rowId: prefix+'playvideodoc '+res.all[0].url
	    }]
    },
    {
	title: "▢ Hacer una búsqueda en YTsearch",
	rows: [
	    {
	    title: `Realizar búsqueda por YTshearch`,
	    description: `\nHacer una búsqueda de: *${res.all[0].title}*`,
	    rowId: prefix+'ytsearch '+res.all[0].title
	 }]
    }]
listMessage = {
  text: `*${chat2} ${res.all[0].title}*\n*${chat2} ${res.all[0].url}*`,
  footer: "Music",
  buttonText: "Lista 🍉",
  sections
}
await Tesla.sendMessage(m.chat, listMessage, {quoted: m})
}
break

case 'yts': {
if (!q) return m.reply(msg.title(prefix, command));
if (bad.includes(q)) return adv()
objs = []
music = await yts(q)
for (let i = 0; i < music.all.length; i++) {
let data = {
title: music.all[i].title,
description: `[ *Vistas:* ${h2k(music.all[i].views)} || *Duracion:* ${music.all[i].timestap} || *Canal:* ${music.all[i].author.name} ]`,
rowId: prefix + 'play2 ' + music.all[i].url
}
objs.push(data)
};
listMessage = {
text: `Se encontraron total: *${music.all.length}* resultados sobre *${q}*`,
footer: "Music",
buttonText: "Lista de Resultados ❇️",
sections: [{
title: "Músicas relacionadas",
rows: objs
}]}
await Tesla.sendMessage(m.chat, listMessage, {quoted: m})
};
break

//Play documentos
case 'playvideodoc':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
m.reply(msg.waitlimit)
let media = await ytv(q, '360p').catch(e => m.reply(msg.error))
//if (media.filesize >= 100000) return m.reply(msg.peso)
thumb = await getBuffer(media.thumb)
Tesla.sendMessage(m.chat, { document: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, jpegThumbnail: thumb}, {quoted: m})
}
await addLimit(m.sender)﻿
break

case 'playaudiodoc':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
m.reply(msg.waitlimit)
let media = await yta(q, '128kbps').catch(e => m.reply(msg.error))
//if (media.filesize >= 100000) return m.reply(msg.peso)
thumb = await getBuffer(media.thumb)
Tesla.sendMessage(m.chat, { document: { url: media.dl_link }, mimetype: 'audio/mp3', fileName: `${media.title}.mp3`, jpegThumbnail: thumb}, {quoted: m})
}
await addLimit(m.sender)﻿
break

case 'ssweb': case 'ss':
addFilter(m.chat)
if (!q) return m.reply(msg.link(prefix, command))
if (!isUrl(args[0])) return m.reply('Tiene que ser un link!!')
m.reply(msg.wait)
anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${args[0]}`)
Tesla.sendMessage(m.chat, {image: {url: anu.gambar}, caption: "Screenshot tomada con éxito ✅"}, {quoted: m})
break

case 'ytsearch': {
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.title(prefix, command))
if (bad.includes(q)) return adv()
m.reply(msg.waitlimit)
resvi = await yts(q)
searchyt = `⠀⠀⠀⠀    *「   YT SEARCH   」*
\n\n❉─────────────────────❉\n`
no = 0
for (let i of resvi.all) {
no += 1
searchyt += `
*▢ Resultado:* ${no.toString()}\n
*❑ Título:* ${i.title ? i.title : '-'}
*❑ Vistas:* ${h2k(i.views ? i.views : '-')}
*❑ Publicado:* ${i.ago ? i.ago : '-'}
*❑ Duración:* ${i.timestamp ? i.timestamp : '-'}
*❑ Canal:* ${i.author.name ? i.author.name : '-'}
*❑ Link Canal:* ${i.author.url ? i.author.url : '-'}
*❑ Link Video:* ${i.url ? i.url : '-'}
\n\n❉─────────────────────❉\n\n`
}
Tesla.sendMessage(m.chat, { image: { url: 'https://tinyurl.com/2hygfqc7' }, caption: searchyt }, {quoted: m})
}
await addLimit(m.sender)﻿
break

case 'google': case 'googlesearch': {
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.title(prefix, command))
if (bad.includes(q)) return adv()
m.reply(msg.waitlimit)
let google = require('google-it')
res = await google({'query': q})
let teks = `\t\t\t\t*「   Google Search   」*

Busqueda de: ${q}
*Resultados*\n❉─────────────────────❉\n`
for (let v of res) {
teks += `
*▢ Título:* ${v.title}
*▢ Link:* ${v.link}
*▢ Descripción:* ${v.snippet}

❉─────────────────────❉\n\n`
}
m.reply(teks);
await addLimit(m.sender)﻿
}
break

case 'shazam':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isQuotedAudio) return m.reply("Etiqueta a un audio!")
try {
m.reply(msg.waitlimit)
result = await Scrap.Shazam(await m.quoted.downloadMedia())
res = (await yts.search(result.music[0].title)).all[0]
ago = await translate(res.ago ? res.ago : '-', {to: 'es'})
await Tesla.sendMessage(m.chat, {image: {url: res.image}, caption:
`
*❑ Título:* ${res.title ? res.title : '-'}
*❑ Vistas:* ${h2k(res.views ? res.views : '-')}
*❑ Publicado:* ${ago.text}
*❑ Duración:* ${res.timestamp ? res.timestamp : '-'}
*❑ Canal:* ${res.author.name ? res.author.name : '-'}
*❑ Link Canal:* ${res.author.url ? res.author.url : '-'}
*❑ Link Video:* ${res.url ? res.url : '-'}`
}, {quoted: m})
let media = await yta(res.url, '128kbps')
if (media.filesize > 100000) return m.reply(msg.peso)
Tesla.sendMessage(m.chat, {audio: {url: media.dl_link}, mimetype: 'audio/mpeg', fileName: media.title+'.mp3', contextInfo: {"forwardingScore": 9999, "isForwarded": true}}, {quoted: m})
await addLimit(m.sender)﻿
} catch { m.reply(msg.result) }
}
break

case 'wp':{
addFilter(m.chat)
//if (!q) return m.reply('Text?');
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (bad.includes(q)) return adv()
m.reply(msg.wait)
res = await gis(`fondos de pantalla 4k ${q}`, google)
function google(error, result){
if (error) return m.reply('_[ ! ] *Intentalo de nuevo*_')
var gugWp = result
var randomWp =  gugWp[Math.floor(Math.random() * gugWp.length)].url
sendButImageUrl(randomWp, `*Link:* ${randomWp}`, buttons = [{buttonId: `${prefix + command} ${q}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
}}
await addLimit(m.sender)﻿
break

case 'shortlink': case 'acortar': case 'tinyurl':{
if (!q) return m.reply(msg.link(prefix, command))
if (!isUrl(args[0])) return m.reply('Tiene que ser un link!!')
request('https://tinyurl.com/api-create.php?url=' + args[0], (e, i, body) => {
m.reply(body)
})
}
break

case "wallpaper": {
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.title(prefix, command))
if (bad.includes(q)) return adv()
m.reply(msg.waitlimit)
var anu = await Scrap.wallpaper(q)
var xvideosxd = anu[Math.floor(Math.random() * anu.length)]
teks = `📌 *Título:* ${xvideosxd.title}
🌐 *Tipo:* ${xvideosxd.type}
🔗 *Fuente:* ${xvideosxd.source}
🎐 *Media Url:* ${xvideosxd.image[2] || xvideosxd.image[1] || xvideosxd.image[0]}`
sendButImageUrl(xvideosxd.image[0], teks, buttons = [{buttonId: `${prefix + command} ${q}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'couple': case 'par':{
addFilter(m.chat)
                m.reply(msg.wait)
                let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
                let random = anu[Math.floor(Math.random() * anu.length)]
             Tesla.sendMessage(m.chat, {image: {url: random.male}, caption: 'De Hombre ✅'}, {quoted: m})
             Tesla.sendMessage(m.chat, {image: {url: random.female}, caption: 'De mujer ✅'}, {quoted: m})
            }
	    break

case 'asupan':{
try {
Tesla.sendMessage(m.chat, {video: {url: 'https://zenzapis.xyz/randomasupan/asupan?apikey=4717336aa9'}, caption: `*Random Asupan*`}, {quoted: m})
} catch(e) {
m.reply("_Lo siento, la *api* a llegado a su límite, espere 20hs para poder seguir usando este comando._")
}}
break

case 'pinterest':
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.title(prefix, command))
if (bad.includes(q)) return adv()
m.reply(msg.waitlimit)
await Scrap.pinterest(q).then(data => {
const pimterest = data.result[1]
sendButImageUrl(pimterest, `*🔎 Búsqueda:* ${q}\n*🔗 Link:* ${pimterest}`, buttons = [{buttonId: `${prefix + command} ${q}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
}).catch(e => m.reply(msg.error))

await addLimit(m.sender)﻿
break

case 'imagen': case 'image':{
if (!q) return m.reply(msg.title(prefix, command))
if (bad.includes(q)) return adv()
let gis = require('g-i-s')
m.reply(msg.wait);
try { gis(`${q}`, async(error, result) => {
images = result[0]
await sendButImageUrl(images.url, `*Link:* ${images.url}`, buttons = [{buttonId: `${prefix + command} ${q}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
}) } catch { reply(msg.result) }
}
break

case 'gitclone':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.link(prefix, command))
if (!args[0].includes('https://github.com')) return m.reply('_*Link invalido, el link debe ser de Github*_')
m.reply(msg.waitlimit)
git = args[0]
var usergit = git.split('com/')[1].split('/')[0]
var repo = git.split('com/')[1].split('/')[1]
var metadata = await fetchJson('https://api.github.com/repos/'+ usergit +'/'+ repo)
document = await getBuffer('https://api.github.com/repos/'+ usergit +'/'+ repo +'/zipball')
m.reply(`\t\t\t\t*📥  Download Github  📥*


*❑ Nombre:* ${metadata.name}
*❑ Tamaño:* ${niceBytes(metadata.size)}
*❑ Lenguaje:* ${metadata.language}
*❑ Creador:* ${usergit}
*❑ Url Creador:* ${metadata.owner.html_url}
*❑ Descripción:* ${metadata.description}`)
Tesla.sendMessage(m.chat, {document: document, mimetype: 'application/zip', fileName: metadata.full_name + '.zip'}, {quoted: m})
await addLimit(m.sender)﻿
}
break

case 'mediafire': case 'fire':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.link(prefix, command))
if (!args[0].includes('mediafire.com')) return m.reply('*Link invalido, el link debe ser de MediaFire!!*')
m.reply(msg.waitlimit)
res = (await require('caliph-api').downloader.mediafire(args[0])).result
m.reply(`\t\t\t\t*📥 Download Mediafire 📥*

*❑ Nombre:* ${res.filename}
*❑ Publicado:* ${res.uploadAt}
*❑ Extensión:* ${res.ext}
*❑ Tamaño:* ${res.filesize}
*❑ Url:* ${res.link}`)
Tesla.sendMessage(m.chat, {document: {url: res.link}, mimetype: res.mimetype, fileName: res.filename}, {quoted: m})
await addLimit(m.sender)﻿
}
break

case 'tiktok':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply('y el link?')
if (!args[0].includes('tiktok.com')) return m.reply('_*Link invalido, el link debe ser de Tiktok*_')
result = await require('@bochilteam/scraper').tiktokdlv3(args[0])
if (args[1] === 'music') {
m.reply(msg.waitlimit)
Tesla.sendMessage(m.chat, {audio:{url: result.music}, mimetype: 'audio/mpeg', fileName: `sexo.mp3`}, {quoted: m})
return await addLimit(m.sender)﻿
}
m.reply(msg.waitlimit)
Tesla.sendMessage(m.chat, {video: {url: result.video.no_watermark}, caption: `*Nombre:* ${result.author.nickname}\n*Descripción:* ${result.description}`, footer: botname, buttons: [{buttonId: `.tiktok ${args[0]} music`, buttonText: {displayText: '‣ Músic'}, type: 1}], headerType: 4}, {quoted: m})
await addLimit(m.sender)﻿
};
break

case 'fb':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.link(prefix, command))
if (!q.includes('facebook')) return m.reply('_*Link invalido*_')
m.reply(msg.waitlimit)
result = await Scrap.Fdownload(q).catch(e => m.reply(msg.error))
Tesla.sendMessage(m.chat, {video: {url: result.url}, caption: `*Nombre:* ${result.title}\n*Tipo calidad:* ${result.quality}`}, {quoted: m})
await addLimit(m.sender)﻿
}
break

case "instagram": case 'ig':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.link(prefix, command))
let url = args[0]
if (!url.includes("instagram.com")) return m.reply("url invalid")
result = await Scrap.instagramdl(url)
m.reply(msg.wait)
ms = []
numer = 1
numer2 = 0
if (result.length === 1) {
buffer = await getBuffer(result[0].url)
type = await FileType.fromBuffer(buffer)
if (type.mime == 'image/jpeg') {
await Tesla.sendMessage(m.chat, {image: {url: result[0].url }, caption: `${msg.y}` }, {quoted: m})
} else if (type.mime == 'video/mp4') {
await Tesla.sendMessage(m.chat, {video: {url: result[0].url }, caption: `${msg.y}` }, {quoted: m})
return await addLimit(m.sender)﻿;
}} else if (args[1] === 'all') {
m.isGroup ? m.reply("Los archivos serán enviados a tu privado para evitar spam!!") : null
for (var data of result) {
buffer = await getBuffer(data.url)
type = await FileType.fromBuffer(buffer)
if (type.mime == 'image/jpeg') {
await Tesla.sendMessage(m.sender, {image: {url: data.url} })
} else if (type.mime == 'video/mp4') {
await Tesla.sendMessage(m.sender, {video: {url: data.url} })
}
return await addLimit(m.sender)﻿;
}};
for (var data of result) {
buffer = await getBuffer(data.url)
type = await FileType.fromBuffer(buffer)
fs.writeFileSync(`./buff.${type.ext}`, buffer)
ms.push({
title: `${type.mime.split('/')[0].replace('image', 'Imagen')} ${numer++}`,
description: `\n[ Tipo: ${type.mime} || Extensión: ${type.ext} || Tamaño: ${niceBytes(fs.statSync('./buff.' + type.ext).size)} ]`,
rowId: `${prefix}igfotovid ${url} ${numer2++}`
})
fs.unlinkSync('./buff.'+ type.ext)
}
await Tesla.sendMessage(m.chat, {text: `Se encontraron total: *${result.length}* resultados sobre *${q}*`, footer: "Music", buttonText: "Lista de Resultados ❇️", sections: [{title: "Lista de archivos", rows: ms}, {"title": `Descarga todos los archivos`, "rows": [{"title": "Descargar todos los archivos", "rowId": `${prefix+command} ${url} all`}] }] }, {quoted: m})
}
break
case 'igfotovid':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
let num = args[1]
result = await Scrap.instagramdl(args[0])
m.reply(msg.waitlimit)
buffer = await getBuffer(result[num].url)
type = await FileType.fromBuffer(buffer)
if (type.mime == 'image/jpeg') {
await Tesla.sendMessage(m.chat, {image: {url: result[num].url }, caption: `${msg.y}` }, {quoted: m})
} else if (type.mime == 'video/mp4') {
await Tesla.sendMessage(m.chat, {video: {url: result[num].url }, caption: `${msg.y}` }, {quoted: m})
}
await addLimit(m.sender)﻿
}
break

case 'telestick':{
res = await Scrap.telestick(args[0])
}
break


/*case 'fbdl': case 'fb': case 'facebook': {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.link(prefix, command))
if (!args[0].includes('facebook.com')) return m.reply('_*Link invalido*_')
 m.reply(msg.waitlimit)
   require('xfarr-api').Facebook(args[0]).then(async(data) => {
 /* let txt = `
*❑ Tituló:* ${data.title}
*❑ Calidad:* ${data.medias[1].quality}
*❑ Extensión:* ${data.medias[1].extension}
*❑ Tamaño:* ${data.medias[1].formattedSize}
*❑ Link:* ${data.url}`
              Tesla.sendMessage(m.chat, { video: { url: data.medias[1].url }, caption: `${txt}`}, { quoted: m })
              console.log(data)
                }).catch(e => m.reply(msg.error)
               )
            }
            break*/

case 'githubsearch': case 'gitsearch':{
if (!q) return m.reply("*Ejemplo:*\n\n"+prefix+command+" <nombre de algún repositorio>")
v = await fetchJson('https://api.github.com/search/repositories?q=' + q).catch(e => m.reply(msg.result))
txt = '──────────────────────\n'
for (var i of v.items){
txt += `
▢ *Nombre:* ${i.name}
▢ *Lenguaje:* ${i.language}
▢ *Tamaño:* ${niceBytes(i.size)}
▢ *Repositorio:* ${i.private ? "Privado" : "Público"}
▢ *Espectadores:* ${i.watchers}
▢ *Tenedores:* ${formatNumber(i.forks)}
▢ *Licencia:* ${i.license ? i.license.name : "-"}
▢ *Link:* ${i.html_url}
▢ *Descripción:* ${i.description}


──────────────────────\n\n`.replace("null", "-")
}
Tesla.sendMessage(m.chat, {image:{url: 'https://tinyurl.com/2pfzfwwl'}, caption: txt}, {quoted: m})
}
break

case 'stalkreposgit': case 'stalkrepos':{
if (!q) return m.reply('*Ejemplo:*\n\n'+prefix+command+' <nombre de algún perfil de github>')
result = await fetchJson('https://api.github.com/users/'+ q +'/repos')
txt = '──────────────────────\n'
for (var i of result){
txt += `
▢ *Nombre:* ${i.name} (${i.full_name})
▢ *Creado:* ${i.created_at}
▢ *Tamaño:* ${niceBytes(i.size)}
▢ *Lenguaje:* ${i.language}
▢ *Licencia:* ${i.license ? i.license.name : "-"}
▢ *Estrellas:* ${i.stargazers_count}
▢ *Tenedores:* ${formatNumber(i.forks)}
▢ *Espectadores:* ${i.watchers}
▢ *Repositorio:* ${i.private ? "Privado" : "Público"}
▢ *Url:* ${i.html_url}
▢ *Url Creador:* ${i.owner.html_url}
▢ *Descripción:* ${i.description}


──────────────────────\n\n`.replace("null", "-")
}
m.reply(txt);
}
break

case 'gistalk': case 'stalkgit': case 'stalkgithub': case 'githubstalk':{
if (!q) return m.reply("*Ejemplo:*\n\n"+prefix+command+" <usuario>")
result = await fetchJson('https://api.github.com/users/'+q)
txt = `▢ *Primer nombre:* ${result.login}
▢ *Nombre actual:* ${result.name}
▢ *Url:* ${result.html_url}
▢ *Tipo:* ${result.type}
▢ *Compañía:* ${result.company}
▢ *Blog:* ${result.blog}
▢ *Localización:* ${result.location}
▢ *Email:* ${result.email}
▢ *Bío:* ${result.bio}
▢ *Twitter name:* ${result.twitter_username}
▢ *Repositorios públicos:* ${result.public_repos}
▢ *Seguidores:* ${result.followers}
▢ *Siguiendo:* ${result.following}
▢ *Perfil creado:* ${result.created_at}
▢ *Última actualización:* ${result.updated_at}`.replace('null', '-')
Tesla.sendMessage(m.chat, {image:{url: result.avatar_url}, caption: txt}, {quoted: m})
}
break

case 'igstalk': case 'stalkig':{
if (!q) return m.reply("*Ejemplo*\n\n"+prefix+command+" Lionel Messi")
m.reply(msg.wait)
try{
var { instagramStalk } = require('@bochilteam/scraper')
v = await instagramStalk(q)
txt = `
*User:* ${v.username}
*Nombre:* ${v.name}
*Descripción:* ${v.description}

*Publicaciones:* ${v.posts} (${v.postsH})
*Seguidores:* ${v.followers} (${v.followersH})
*Siguiendo:* ${v.following} (${v.followingH})`
Tesla.sendMessage(m.chat, {image:{url: v.avatar}, caption: txt}, {quoted: m})
} catch(e) {
m.reply(msg.result)
}}
break


//==========  [  Premium MENU  ] =============//


case 'xnxx': case 'xnxxdl':{
if (!isPre && !isOwner) return m.reply(msg.premium)
if (!q) return m.reply(msg.link(prefix, command))
if (!args[0].includes('xnxx.com')) return m.react('❌')
result = (await Scrap.xnxxdl(args[0])).result
txt =`${chat2} *Título:* ${result.title}
${chat2} *Link:* ${args[0]}
${chat2} *Calidad:* ${result.info.split`-`[1].split`p`[0]}p
${chat2} *Vistas:* ${result.info.split`-`[2].split`\t`[0]}
${chat2} *Duracion:* ${result.info.split`\t`[5].split`\n`[0]}
${chat2} *Canal:* ${result.info.split`\n`[1].split`\t`[0]}`
await Tesla.sendMessage(m.chat, {video: {url: result.files.high ? result.files.high : result.files.low}, caption: txt}, {quoted: m})
}
break

case 'gore':{
if (!isPre && !isOwner) return m.reply(msg.premium)
result = await Scrap.randomGore()
res = await translate(result.title, {to: 'es'})
txt = `
${chat2} *Título:* ${res.text}
${chat2} *Vistas:* ${result.views}
${chat2} *Comentarios:* ${result.comment}
${chat2} *Link:* ${result.linkp}`
await Tesla.sendMessage(m.chat, {video: {url: result.url}, caption: txt, mimetype: 'video/mp4'}, {quoted: m})
}
break

case 'join': case 'entrabot':{
if (!q) return m.reply(msg.link(prefix, command))
if (!isPre && !isOwner) return m.reply(msg.premium)
if (!isUrl(args[0]) && !args[0].includes('chat.whatsapp.com')) return m.reply('*_link inválido_*\n\nasegúrate de que sea un link de WhatsApp de un grupo')
try {
let group = await Tesla.groupAcceptInvite(args[0].split('chat.whatsapp.com/')[1])
let Metadata = await Tesla.groupMetadata(group)
let infogrupo = `Hola, he sido invitado por parte de: @${m.sender.split('@')[0]}

Yo soy *Hades-Bot*
usa ${prefix}menu para ver mi lista de comandos.


*${chat2} Información sobre el grupo:*

*${chat2} Nombre:* ${Metadata.subject}
*${chat2} Nombre cambiado por:* @${Metadata.subjectOwner ? Metadata.subjectOwner.split('@')[0] : '-'}
*${chat2} Nombre actualizado:* ${create(Metadata.subjectTime)}
*${chat2} Id:* ${Metadata.id}
*${chat2} Creador:* @${Metadata.owner ? Metadata.owner.split`@`[0] : 'Grupo sin creador.'}
*${chat2} Grupo Creado:* ${create(Metadata.creation)}
*${chat2} Participantes:* ${Metadata.participants.length}
*${chat2} Administradores:* ${Metadata.participants.filter(v => v.admin !== null).map(v => v.id).length}
*${chat2} Editar Info:* ${Metadata.restrict ? 'Para Solo admins.' : 'Para todos.'}

*Descripción:* 

${Metadata.desc ? Metadata.desc : '-'}`
m.reply(infogrupo, Metadata.id, Metadata.participants.map(v => v.id), {key:{fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "6289523258649-1604595598@g.us"}, message:{imageMessage:{mimetype: "image/jpeg", caption: "HadesBot-MD", thumbnail: await m.createJpg(loli, 250, 250)}}})
m.reply("He ingresado correctamente ✅")
} catch {
m.reply("*[ × ] No he podido ingresar, ésto se debe a qué talvez fuí eliminado del grupo o el link se restableció!!*")
}};
break

case 'nowa':{
if (!isPre && !isOwner) return m.reply(msg.premium)
if (!q) return m.reply("Ingresa el número juntó con la 'x'")
const numer = q
if (!numer.includes('x')) return m.reply(`Y la 'x' ?\n\n*• Ejemplo de uso:*\n${prefix + command} 5697777777x`)
if (numer.split('x').length - 1 === 2) return m.reply("Solo puedes ingresar 1 'x' !!")

var test = `*${chat2} Búsqueda sobre:* ${numer}
*${chat2} Numeros encontrados:*\n\n`
var noWa = `*${chat2} Numeros no registrados en WhatsApp:*\n`
for (var i = 0; i < 10; i++) {
const user = await Tesla.onWhatsApp(numer.replace('x', i) + "@s.whatsapp.net")
try {
var id = user[0].jid
  bio = await Tesla.fetchStatus(id)
let x = bio.setAt ? bio.setAt : new Date
 let week1 = x.toLocaleDateString("es", { weekday: 'long' })
	let calender1 = x.toLocaleDateString('es', {day: 'numeric', month: 'long', year: 'numeric'})
test += `
*${chat2} Número:* ${PhoneNumber('+' + id.split`@`[0]).getNumber('international')}
*${chat2} Link:* https://Wa.me/${id.split('@')[0]}
*${chat2} Tag:* @${id.split('@')[0]}
*${chat2} Bio:* ${bio.status ? bio.status : '-'}
*${chat2} Fecha:* ${week1} ${calender1}
\n\n`
} catch {
noWa += "https://Wa.me/"+ numer.replace('x', i) +'\n'
  }
}
test += noWa
Tesla.reply(test)
}
break


//==========  [  MAKER MENU  ] =============//


case 'glow':
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'demon': case 'demongreen':
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'toxic':	
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/toxic-text-effect-online-901.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'capitanamerica':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/captain-america-text-effect-905.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'metalfire':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit) 
logos.textpro("https://textpro.me/hot-metal-text-effect-843.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'thunder':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit) 
logos.textpro("https://textpro.me/create-thunder-text-effect-online-881.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'neongreen':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/green-neon-text-effect-874.html", q).then(async (data) => {
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'neontxt':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/free-advanced-glow-text-effect-873.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'rainbow':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'ice':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/ice-cold-text-effect-862.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'lapis': case 'lapiz':
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case '3dstone':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'fiction':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-science-fiction-text-effect-online-free-1038.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'break':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/break-wall-text-effect-871.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'blood':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/blood-text-on-the-frosted-glass-941.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'jokerlogo':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-logo-joker-online-934.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'natal':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'asfalto':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/road-warning-text-effect-878.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
});
break
case 'neon3d':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'neon':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'huesos':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/skeleton-text-effect-online-929.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'jeans':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/denim-text-effect-online-919.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'metalblue':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/glossy-blue-metal-text-effect-967.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'carbon':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/glossy-carbon-text-effect-965.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'pink':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/holographic-3d-text-effect-975.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'style':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/1917-style-text-effect-online-980.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'vidrio':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/dropwater-text-effect-872.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'arena':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/write-in-sand-summer-beach-free-online-991.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'nieve':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/xmas-cards-3d-online-942.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'neon3':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'nuvem':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'horror':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/horror-blood-text-effect-online-883.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'matrix':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/matrix-style-text-effect-online-884.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'transformer':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'berry':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'luxury':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/3d-luxury-gold-text-effect-online-1003.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'colaq':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'thunderv2':
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'demonfire':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'neondevil':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'halloween':
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/halloween-fire-text-effect-940.html", q).then(async (data) => { 
Tesla.sendMessage(m.chat, {image: {url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'lava':  
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if(!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/lava-text-effect-online-914.html", q).then(async (data) => {
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)﻿
break
case 'lobo3': 
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", q).then(async (data) =>{
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)
break
case 'blackpink': 
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html", q).then(async (data) =>{
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)
break
case 'glitchtext': 
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.logos)
m.reply(msg.waitlimit)
logos.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", q).then(async (data) =>{
Tesla.sendMessage(m.chat, {image:{url: data}, caption: `${msg.y}`}, {quoted: m})
})
await addLimit(m.sender)
break


//==========  [  LOGOS DE 2 TEXTOS  ] =============//


case 'gameover':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'pornhub':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'space':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-space-3d-text-effect-online-985.html", [text1, text2])
Tesla.sendMessage(m.chat, {image: {url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'marvel':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-3d-avengers-logo-online-974.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'glitch':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'glitch2':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break 
case 'grafity':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'grafity2':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-cool-wall-graffiti-text-effect-online-1009.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'steel':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/3d-steel-text-effect-877.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break 
case 'stone':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-a-stone-text-effect-online-982.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'lobo':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-wolf-logo-black-white-937.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'lobo2':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'leonlogo':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-lion-logo-mascot-online-938.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break
case 'ninjalogo':{
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!q) return m.reply(msg.txt2(prefix, command))
if (!q.includes('|')) return m.reply(msg.txt2(prefix, command))
m.reply(msg.waitlimit)
text1 = q.split("|")[0];
text2 = q.split("|")[1];
Logo = await logos.textpro("https://textpro.me/create-ninja-logo-online-935.html", [text1, text2])
Tesla.sendMessage(m.chat, {image:{url: Logo}, caption: `${msg.y}`}, {quoted: m})
}
await addLimit(m.sender)﻿
break


//==========  [  ANIMÉ  ] =============//


case 'pat': case 'shinobu': case 'bully': case 'cuddle': case 'cry': case 'hug': case 'kiss': case 'lick': case 'smug': case 'bonk': case 'yeet': case 'blush': case 'smile': case 'wave': case 'highfive':  case 'handhold': case 'nom': case 'bite': case 'glomp': case 'slap': case 'kill': case 'happy': case 'wink': case 'poke': case 'dance': case 'cringe':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
m.reply(msg.waitlimit)
res = await axios.get('https://api.waifu.pics/sfw/' + command)
sendStickerFromUrl(res.data.url)
await addLimit(m.sender)﻿
}
break


//==========  [  NSFW  ] =============//


case 'lewd':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
res = await axios.get('https://nekos.life/api/v2/img/lewd')
sendButImageUrl(res.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'blowjob':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
res = await axios.get('https://api.waifu.pics/nsfw/blowjob')
sendButImageUrl(res.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'spank':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
res = await axios.get('https://nekos.life/api/v2/img/spank')
sendButImageUrl(res.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'feed':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
res = await axios.get('https://nekos.life/api/v2/img/feed')
sendButImageUrl(res.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'avatar':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
anu = await axios.get('https://nekos.life/api/v2/img/avatar')
sendButImageUrl(anu.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'megumin':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
m.reply(msg.waitlimit)
anu = await fetchJson('https://waifu.pics/api/sfw/megumin')
sendButImageUrl(anu.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)
}
break

case 'cosplay':{
addFilter(m.chat)
try {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
sendButImageUrl('https://zenzapis.xyz/randomimage/cosplay?apikey=4717336aa9', `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)
} catch(e) {
m.reply("_Lo siento, la *api* a llegado a su límite, espere 20horas para poder seguir usando este comando._")
}}
break

case 'yuri':{
addFilter(m.chat)
try {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
sendButImageUrl('https://zenzapis.xyz/api/morensfw/yuri?apikey=4717336aa9', `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)
} catch(e) {
m.reply("_Lo siento, la *api* a llegado a su límite, espere 20horas para poder seguir usando este comando._")
}}
break

case 'ahegao':{
addFilter(m.chat)
try {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
sendButImageUrl('https://zenzapis.xyz/api/morensfw/ahegao?apikey=4717336aa9', `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)
} catch(e) {
m.reply("_Lo siento, la *api* a llegado a su límite, espere 20horas para poder seguir usando este comando._")
}}
break

case 'ass':{
addFilter(m.chat)
try {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
sendButImageUrl('https://zenzapis.xyz/api/morensfw/ass?apikey=4717336aa9', `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)
} catch(e) {
m.reply("_Lo siento, la *api* a llegado a su límite, espere 20horas para poder seguir usando este comando._")
}}
break

case 'bdsm':{
addFilter(m.chat)
try {
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
sendButImageUrl('https://zenzapis.xyz/api/morensfw/bdsm?apikey=4717336aa9', `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)
} catch(e) {
m.reply("_Lo siento, la *api* a llegado a su límite, espere 20horas para poder seguir usando este comando._")
}}
break

case 'pussy':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
pusiimg = await axios.get('https://nekos.life/api/v2/img/pussy_jpg')
sendButImageUrl(pusiimg.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'oppai':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
opai = await axios.get('https://nekos.life/api/v2/img/tits')
sendButImageUrl(opai.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'awoo':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
anu = await fetchJson('https://waifu.pics/api/sfw/awoo')
sendButImageUrl(anu.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'hentai':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
anu = await fetchJson('https://waifu.pics/api/nsfw/neko')
sendButImageUrl(anu.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'neko':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
anu = await fetchJson('https://waifu.pics/api/nsfw/neko')
sendButImageUrl(anu.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'trapnime':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
anu = await fetchJson('https://waifu.pics/api/nsfw/trap')
sendButImageUrl(anu.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'loli':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
anu = await axios.get('https://nekos.life/api/v2/img/neko')
sendButImageUrl(anu.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'waifu':{
addFilter(m.chat)
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
waifud = await axios.get('https://nekos.life/api/v2/img/waifu')
sendButImageUrl(waifud.data.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'tetas':{
addFilter(m.chat) 
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
pw = ["https://meme-api.herokuapp.com/gimme/tits",
"https://meme-api.herokuapp.com/gimme/BestTits",
"https://meme-api.herokuapp.com/gimme/boobs",
"https://meme-api.herokuapp.com/gimme/amazingtits",
"https://meme-api.herokuapp.com/gimme/TinyTits"]
nk = pw[Math.floor(Math.random() * pw.length)]
porn = await getJson(nk, {method: 'get'})
sendButImageUrl(porn.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break

case 'ass': case 'booty':{
addFilter(m.chat) 
if (isLimit(m.sender)) return m.reply(msg.limit(prefix))
if (!isNsfw) return m.reply('La función nsfw está desactivada\n📌 Para activarla usa ' + prefix + 'nsfw')
m.reply(msg.waitlimit)
pw = ["https://meme-api.herokuapp.com/gimme/CuteLittleButts",
"https://meme-api.herokuapp.com/gimme/ass",
"https://meme-api.herokuapp.com/gimme/boobs",
"https://meme-api.herokuapp.com/gimme/ass"]
nk = pw[Math.floor(Math.random() * pw.length)]
porn = await getJson(nk, {method: 'get'})
sendButImageUrl(porn.url, `${msg.y}`, buttons = [{buttonId: `${prefix + command}`, buttonText: {displayText: '‣ Siguiente Imagen'}, type: 1}])
await addLimit(m.sender)﻿
}
break


//==========  [  EMOJI-DEX  ] =============//


case 'emojimix': {
if (!q) return m.reply('Y los emojis?')
if (!q.includes('/')) return m.reply(`*Ejemplo:*\n\n${prefix + command} 🙃/😘`)
var emoji1 = q.split('/')[0]
var emoji2 = q.split('/')[1]
let anu = (await fetchJson('https://'+`tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)).results[0]
await sendStickerFromUrl(anu.url)
}
break
case 'emoji': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[4].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'apple': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[0].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'googlee': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[1].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'samsung': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[2].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'microsoft': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[3].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'twitter': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[5].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'facebook': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[6].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'joypixels': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[7].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'open-emoji': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[8].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'emojidex': {
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[9].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'messenger':{
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[10].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'lg':{
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[11].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'htc':{
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[12].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'mozilla':{
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[13].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break
case 'softbank':{
if (!q) return m.reply('Y el emoji?')
if (q.length > 2) return m.reply('Solo un emoji')
emoji.get(args[0]).then(emoji => {
sendStickerFromUrl(emoji.images[14].url)
    }
  ).catch(e => m.reply('Emoji no compartible!!'))
}
break


//==========  [  GRUPOS  ] =============//


            case 'leave': case 'salir': case 'exit': {
            if (!isOwner && !m.key.fromMe) return
            if (!m.isGroup) return m.reply(msg.group)
            Tesla.sendMessage(m.chat, {text: "Adiós.... 👋️", mentions: participants.map(r => r.id)}, {quoted: {key: {fromMe: false, participant: '0@s.whatsapp.net'}, message: {viewOnceMessage:{message: {videoMessage:{mimetype: 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
            await sleep(3000)
            await Tesla.groupLeave(m.chat)
            }
            break

	case 'kick': case 'echar': {
       if (!m.isGroup) return m.reply(msg.group)
       if (!isAdmins) return m.reply(msg.admin)
       if (!isBotAdmins) return m.reply(msg.Botadmin)
       if (!mentionUser.length == 1) return m.reply('Etiqueta un mensaje o menciona a quién debo eliminar')
       if (mentionUser.includes(botNumber)) return m.reply('No es posible auto eliminarme')
       if (ownerNumber.includes(mentionUser[0])) return m.reply('No es posible eliminar a mi creador.')
       if (groupAdmins.includes(mentionUser[0])) return m.reply('No es posible eliminar a un administrador.')
       if (mentionUser[0] === m.sender) return m.react('❌')
		await Tesla.groupParticipantsUpdate(m.chat, [user], 'remove')
		await m.react('✅')
		m.reply("El usuario: @"+ user.split`@`[0] +" fué eliminado!", m.chat, [user])
    }
	break

	case 'add': case 'agregar': case 'añadir': case 'addgp': {
       if (!m.isGroup) return m.reply(msg.group)
       if (!isAdmins) return m.reply(msg.admin)
       if (!isBotAdmins) return m.reply(msg.Botadmin)
       if (mentionUser[0] === m.sender) return m.react('❌')
	    await Tesla.groupParticipantsUpdate(m.chat, [user], 'add')
        await m.react('✅')
		await m.reply('🍉🍉')
	}
	break

	case 'promote': case 'promover': case 'dar': case 'addadmin': {
        if (!m.isGroup) return m.reply(msg.group)
        if (!isAdmins) return m.reply(msg.admin)
        if (!isBotAdmins) return m.reply(msg.Botadmin)
        if (!mentionUser.length == 1) return m.reply('Etiqueta un mensaje de a quien debo darle admin o mencionalo')
        if (groupAdmins.includes(user)) return m.reply("El usuario: @"+ user.split('@')[0] +" ya es administrador!", m.chat, [user])
        if (mentionUser[0] === m.sender) return m.react('❌')
		await Tesla.groupParticipantsUpdate(m.chat, [user], 'promote')
		await m.react('✅')
		m.reply("El usuario: @"+ user.split('@')[0] +" ahora es un nuevo administrador!", m.chat, [user])
	}
	break

	case 'demote': case 'quitar': case 'deladm': {
		if (!m.isGroup) return m.reply(msg.group)
        if (!isAdmins) return m.reply(msg.admin)
        if (!isBotAdmins) return m.reply(msg.Botadmin)
        if (!mentionUser.length == 1) return m.reply('Etiqueta un mensaje de a quien debo quitarle admin o mencionalo')
        if (!groupAdmins.includes(user)) return m.reply("El usuario: @"+ user.split('@')[0] +" no es administrador!", m.chat, [user])
        if (mentionUser[0] === m.sender) return m.react('❌')
		await Tesla.groupParticipantsUpdate(m.chat, [user], 'demote')
    	await m.react('✅')
    	m.reply("El usuario: @"+ user.split('@')[0] +" ahora ya no es administrador!", m.chat, [user])
	}
	break

case 'infogp':{
if (!m.isGroup) return m.reply(msg.group)
Metadata = args[0] ? await Tesla.groupMetadata(args[0]) : await Tesla.groupMetadata(m.chat)
try {
                    ppuser = await Tesla.profilePictureUrl(Metadata.id, 'image')
                } catch {
                    ppuser = 'https://telegra.ph/file/f5ac7ac078ce00a182a96.jpg'
                }
var fotogp = await getBuffer(ppuser)
let infogrupo = `\t\t\t⎻⎻  ⌈ INFO DEL GRUPO ⌋  ⎻⎻\n
*${chat2} Nombre:* ${Metadata.subject}
*${chat2} ID:* ${Metadata.id}
*${chat2} Creado:* ${create(Metadata.creation)}
*${chat2} Creador:* ${Metadata.owner ? '@' + Metadata.owner.split`@`[0] : 'Grupo sin creador.'}
*${chat2} Miembros:* ${Metadata.participants.length} Total
*${chat2} Administradores:* ${Metadata.participants.filter(v => v.admin !== null).map(v => v.id).length} Total


*${chat2} Chat Muteado:* ${mute.includes(Metadata.id) ? '✅' : '❌'}
*${chat2} LeveLing:* ${leveling.includes(Metadata.id) ? '✅' : '❌'}
*${chat2} AntiLink:* ${antilink.includes(Metadata.id) ? '✅' : '❌'}
*${chat2} AntiLinkMax:* ${antilinkmax.includes(Metadata.id) ? '✅' : '❌'}
*${chat2} Nsfw:* ${nsfw.includes(Metadata.id) ? '✅' : '❌'}
*${chat2} AutoSticker:* ${autosticker.includes(Metadata.id) ? '✅' : '❌'}
*${chat2} Bienvenida:* ${welcome.includes(Metadata.id) ? '✅' : '❌'}
*${chat2} AntiVirtex:* ${antitrabas.includes(Metadata.id) ? '✅' : '❌'}

*Descripción:*\n${Metadata.desc}`
Tesla.sendMessage(m.chat, {image: fotogp, caption: infogrupo, mentions: [groupMetadata.owner]}, {quoted: m})
}
break

case 'setdesc':
if (!m.isGroup) return m.reply(msg.group)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!isAdmins) return m.reply(msg.admin)
if (!q) return m.reply('Algun texto?')
await Tesla.groupUpdateDescription(m.chat, q)
m.reply('Descripción cambiada con éxito ✅')
break

case 'setname':
if (!m.isGroup) return m.reply(msg.group)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!isAdmins) return m.reply(msg.admin)
if (!q) return m.reply('Algun texto?')
await Tesla.groupUpdateSubject(m.chat, q)
m.reply('Nombre cambiado con éxito ✅')
break

case 'editinfo':
if (!m.isGroup) return m.reply(msg.group)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!isAdmins) return m.reply(msg.admin)
await Tesla.groupSettingUpdate(m.chat, 'unlocked')
m.reply('Listo ✅')
break

case 'uneditinfo':
if (!m.isGroup) return m.reply(msg.group)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!isAdmins) return m.reply(msg.admin)
await Tesla.groupSettingUpdate(m.chat, 'locked')
m.reply('Listo ✅')
break

case 'cerrar':
if (!m.isGroup) return m.reply(msg.group)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!isAdmins) return m.reply(msg.admin)
await Tesla.groupSettingUpdate(m.chat, 'announcement')
m.reply('Grupo cerrado ✅')
break

case 'abrir':
if (!m.isGroup) return m.reply(msg.group)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!isAdmins) return m.reply(msg.admin)
await Tesla.groupSettingUpdate(m.chat, 'not_announcement')
m.reply('Grupo abierto ✅')
break

case 'revoke': case 'resetlink': 
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
await Tesla.groupRevokeInvite(m.chat)
await m.reply('Link restablecido [ ✓ ]')
break

case 'linkgroup': case 'linkgp':
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
m.reply(`📍 Link del grupo: ${groupMetadata.subject}\n\n📌 https://chat.whatsapp.com/${await Tesla.groupInviteCode(m.chat)}`)
break

case 'grupo': {
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
sections = [{
	title: "▢ Ajuste del grupo",
	rows: [
	    {
	    title: "Cerrar Grupo",
	    rowId: prefix + 'cerrar'
	    },
	    {
	    title: "Abrir Grupo",
	    rowId: prefix + 'abrir'
	    },
	    {
	    title: "Cambiar ajustes del Grupo",
	    rowId: prefix + 'uneditinfo'
	    },
	    {
	    title: "Cambiar ajuste del Grupo para solo admins",
	    rowId: prefix + 'editinfo'
	    }]
    }, {
	title: "▢ Información del grupo",
	rows: [
	    {
	    title: "Info Grupo",
	    rowId: prefix + "infogp"
	    },
	    {
	    title: "Link del Grupo",
	    rowId: prefix + 'linkgp'
	    },
	    {
	    title: "Restablecer el Link del Grupo",
	    rowId: prefix + 'resetlink'
	    }]
    }, {
	title: "▢ Mensajes temporales",
	rows: [
	    {
	    title: "Activar",
	    rowId: prefix + 'ephemeral 1'
	    },
	    {
	    title: "desactivar",
	    rowId: prefix + 'ephemeral 0'
	    }]
    }]
listMessage = {
  text: "*⚙️ Setting Group ⚙️*\n",
  title: groupMetadata.subject,
  buttonText: "Lista 🍉",
  sections
}
await Tesla.sendMessage(m.chat, listMessage, {quoted: m})
}
break

case 'invite': case 'invitar':
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!q) return m.reply('Ingrese el número!')
Tesla.relayMessage(user, {
"extendedTextMessage":{
"text": `Hola @${user.split("@")[0]}\n\nUn admin te invita a unirte a este grupo\nhttps://chat.whatsapp.com/${await Tesla.groupInviteCode(m.chat)}`,
"contextInfo": {
"mentionedJid": [user],
"externalAdReply": {
"title": `${groupMetadata.subject}`,
"body": "Invitación a chat de grupo",
"thumbnail": global.Logo,
"sourceUrl": `https://chat.whatsapp.com/${await Tesla.groupInviteCode(m.chat)}`,
"renderLargerThumbnail": true,
"mediaType": 1,
"showAdAttribution": true
}}}}, {})
m.reply("Invitación enviada a @" + user.split`@`[0] + " con éxito [ ✓ ]", m.chat, [user]);
break

case 'delete': case 'delmsg': {
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!m.quoted) return m.reply("Etiqueta un mensaje!")
if (!m.quoted.fromMe && !isBotAdmins) return m.reply('Solo puedo eliminar mensajes míos, si en éste caso soy admin podré eliminar cualquier mensajes!')
await Tesla.sendMessage(m.chat, { delete: m.quoted.key })
}
break

case 'setfotogp':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!isQuotedImage) return m.reply(`*Ejemplo:* ${prefix}setfotogp <Etiqueta una foto>`)
try {
 buffer = await m.quoted.downloadMedia()
   await Tesla.updateProfilePicture(m.chat, buffer)
      await m.react('✅');
} catch {
await m.react('❌');
m.reply('Error, por favor intenté con otra foto');
};
};
break

case 'hidetag': case 'h':
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
Tesla.sendMessage(m.chat, {text: q ? q : "❤️", mentions: participants.map(r => r.id)}, {quoted: {key: {"fromMe": false, "participant": m.sender}, "message": {"orderMessage": {"orderId": m.sender, "itemCount": -5, "status": "INQUIRY", "surface": "CATALOG", "orderTitle": 'HadesBot - MD', "sellerJid": m.sender.split`@`[0]}}}})
break

case 'tag': case 'totag':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!m.quoted) return m.reply("Etiqueta un mensaje!")
users = participants.map(v => v.id)
Tesla.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users }, {quoted: m})
}
break

case 'tagall': {
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
let teks = `*${chat2} Mensaje:* ${q ? q : 'Sin Mensaje'}
*${chat2} Grupo:* ${groupMetadata.subject}
*${chat2} Total Miembros:* ${participants.length}\n
*~ Lista de participantes:*\n\n`
for (let i of participants) {
teks += "- @" + i.id.split`@`[0] + '\n'
}
Tesla.reply(teks)
}
break

case 'listadmins': case 'listadmin':{
if (!m.isGroup) return m.reply(msg.group)
teks = `Lista de administradores del grupo:
*${groupMetadata.subject}*

Total: ${groupAdmins.length}\n\n`
no = 1
for (let admin of groupAdmins) {
teks += `*${no++}. @${admin.split`@`[0]}*\n`
}; m.reply(teks, m.chat, groupAdmins)
}
break

case 'listonline': case 'online':{
var reg = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
var online = [...Object.keys(store.presences[reg]), ownerNumber[0].split('@')[0]]
var only = online.map((v) => '🔱' + `@${v.split`@`[0]}`).join`\n`
Tesla.reply('Usuarios Online en este momento:\n\n' + only)
}
break


//==========  [  ACTIVACIONES  ] =============//


case 'leveling':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!q) return sendButMessage('*Leveling*', buttons = [
  {buttonId: prefix+command+' 1', buttonText: {displayText: '▢ Activar'}, type: 1},
  {buttonId: prefix+command+' 0', buttonText: {displayText: '▢ Desactivar'}, type: 1}])
//
if (Number(args[0]) === 1) {
if (isLeveling) return m.reply(msg.active)
leveling.push(m.chat)
fs.writeFileSync('./database/Json/leveling.json', Json(leveling))
m.reply(msg.active2)
} else if (Number(args[0]) === 0) {
if (!isAntiLink) return m.react('❌')
deleteitem(leveling, m.chat)
fs.writeFileSync('./database/Json/leveling.json', Json(leveling))
m.reply(msg.desative)
} else {
m.reply(`XD?\n\n${prefix + command} 1 para activar\n${prefix + command} 0 para desactivar`)
}}
break

case 'nsfw': case '+18':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!q) return sendButMessage('*Nsfw*', buttons = [
  {buttonId: prefix+command+' 1', buttonText: {displayText: '▢ Activar'}, type: 1},
  {buttonId: prefix+command+' 0', buttonText: {displayText: '▢ Desactivar'}, type: 1}])
//
if (Number(args[0]) === 1) {
if (isNsfw) return m.reply(msg.active)
nsfw.push(m.chat)
fs.writeFileSync('./database/Json/nsfw.json', Json(nsfw))
m.reply(msg.active2)
} else if (Number(args[0]) === 0) {
if (!isNsfw) return m.react('❌')
deleteitem(nsfw, m.chat)
fs.writeFileSync('./database/Json/nsfw.json', Json(nsfw))
m.reply(msg.desative)
} else {
m.reply(`XD?\n\n${prefix + command} 1 para activar\n${prefix + command} 0 para desactivar`)
}}
break

case 'antilink':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!q) return sendButMessage('*Anti Link*', buttons = [
  {buttonId: prefix+command+' 1', buttonText: {displayText: '▢ Activar'}, type: 1},
  {buttonId: prefix+command+' 0', buttonText: {displayText: '▢ Desactivar'}, type: 1}])
//
if (Number(args[0]) === 1) {
if (isAntiLink) return m.reply(msg.active)
antilink.push(m.chat)
fs.writeFileSync('./database/Json/antilink.json', Json(antilink))
m.reply(msg.active2)
} else if (Number(args[0]) === 0) {
if (!isAntiLink) return m.react('❌')
deleteitem(antilink, m.chat)
fs.writeFileSync('./database/Json/antilink.json', Json(antilink))
m.reply(msg.desative)
} else {
m.reply(`XD?\n\n${prefix + command} 1 para activar\n${prefix + command} 0 para desactivar`)
}}
break

case 'antilinkmax':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!q) return sendButMessage('*Anti Link Max*', buttons = [
  {buttonId: prefix+command+' 1', buttonText: {displayText: '▢ Activar'}, type: 1},
  {buttonId: prefix+command+' 0', buttonText: {displayText: '▢ Desactivar'}, type: 1}])
//
if (Number(args[0]) === 1) {
if (isAntiLinkMax) return m.reply(msg.active)
antilinkmax.push(m.chat)
fs.writeFileSync('./database/Json/antilinkmax.json', Json(antilinkmax))
m.reply(msg.active2)
} else if (Number(args[0]) === 0) {
if (!isAntiLinkMax) return m.react('❌')
deleteitem(antilinkmax, m.chat)
fs.writeFileSync('./database/Json/antilinkmax.json', Json(antilinkmax))
m.reply(msg.desative)
} else {
m.reply(`XD?\n\n${prefix + command} 1 para activar\n${prefix + command} 0 para desactivar`)
}}
break

case 'antitravas':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!q) return sendButMessage('*Anti Trabas / Anti Binarios*', buttons = [
  {buttonId: prefix+command+' 1', buttonText: {displayText: '▢ Activar'}, type: 1},
  {buttonId: prefix+command+' 0', buttonText: {displayText: '▢ Desactivar'}, type: 1}])
//
if (Number(args[0]) === 1) {
if (isAntiTrabas) return m.reply(msg.active)
antitrabas.push(m.chat)
fs.writeFileSync('./database/Json/antitrabas.json', Json(antitrabas))
m.reply(msg.active2)
} else if (Number(args[0]) === 0) {
if (!isAntiTrabas) return m.react('❌')
deleteitem(antitrabas, m.chat)
fs.writeFileSync('./database/Json/antitrabas.json', Json(antitrabas))
m.reply(msg.desative)
} else {
m.reply(`XD?\n\n${prefix + command} 1 para activar\n${prefix + command} 0 para desactivar`)
}}
break

case 'autosticker': case 'st':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!q) return sendButMessage('*Auto Sticker*', buttons = [
  {buttonId: prefix+command+' 1', buttonText: {displayText: '▢ Activar'}, type: 1},
  {buttonId: prefix+command+' 0', buttonText: {displayText: '▢ Desactivar'}, type: 1}])
//
if (Number(args[0]) === 1) {
if (isAutostick) return m.reply(msg.active)
autosticker.push(m.chat)
fs.writeFileSync('./database/Json/autosticker.json', Json(autosticker))
m.reply(msg.active2)
} else if (Number(args[0]) === 0) {
if (!isAutostick) return m.react('❌')
deleteitem(autosticker, m.chat)
fs.writeFileSync('./database/Json/autosticker.json', Json(autosticker))
m.reply(msg.desative)
} else {
m.reply(`XD?\n\n${prefix + command} 1 para activar\n${prefix + command} 0 para desactivar`)
}}
break

case 'welcome':{
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!q) return sendButMessage('*Welcome / Bienvenida*', buttons = [
  {buttonId: prefix+command+' 1', buttonText: {displayText: '▢ Activar'}, type: 1},
  {buttonId: prefix+command+' 0', buttonText: {displayText: '▢ Desactivar'}, type: 1}])
//
if (Number(args[0]) === 1) {
if (isWelcome) return m.reply(msg.active)
welcome.push(m.chat)
fs.writeFileSync('./database/Json/welcome.json', Json(welcome))
m.reply(msg.active2)
} else if (Number(args[0]) === 0) {
if (!isWelcome) return m.react('❌')
deleteitem(welcome, m.chat)
fs.writeFileSync('./database/Json/welcome.json', Json(welcome))
m.reply(msg.desative)
} else {
m.reply(`XD?\n\n${prefix + command} 1 para activar\n${prefix + command} 0 para desactivar`)
}}
break

case 'ephemeral': {
if (!m.isGroup) return m.reply(msg.group)
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
let { WA_DEFAULT_EPHEMERAL } = require("@adiwajshing/baileys")
if (Number(args[0]) === 1) {
await Tesla.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL })
m.reply('Listo ✅')
} else if (Number(args[0]) === 0) {
await Tesla.sendMessage(m.chat, { disappearingMessagesInChat: false })
m.reply('Listo ✅')
} else {
sendButMessage('*Mensajes Temporales*', buttons = [
  {buttonId: prefix + 'ephemeral 1', buttonText: {displayText: 'Activar'}, type: 1},
  {buttonId: prefix + 'ephemeral 0', buttonText: {displayText: 'Desactivar'}, type: 1}])
}}
break

case 'kickall':{
if (!m.isGroup) return m.reply(msg.group)
if (args[0] === 'all') {
try { owner = groupMetadata.owner.includes(m.sender) } catch { owner = true }
if (!owner) return m.reply('Esta opción solo puede ser usada por el creador del grupo!')
for (var users of participants.map(res => res.id)) {
await Tesla.groupParticipantsUpdate(m.chat, [users], 'remove')
await sleep(2000)
  }
}
if (!isAdmins) return m.reply(msg.admin)
if (!isBotAdmins) return m.reply(msg.Botadmin)
if (!q) return sendButMessage(`Ingresa el prefijo del país!\n\n*• Ejemplo de uso:*\n${prefix + command} +51\n${prefix + command} +92`, buttons = [{buttonId: prefix+command+' all', buttonText: {displayText: '▢ Eliminar a todos'}, type: 1}])
if (!args[0].includes('+')) return m.react('❌')
users = participants.filter(det => det.id.startsWith(args[0].split('+')[1])).map(res => res.id)
for (var v of users) {
if (v === botNumber && v === ownerNumber[0]) return
await Tesla.groupParticipantsUpdate(m.chat, [v], 'remove')
await sleep(2000)
}
await m.reply("Todos los "+ args[0] +" fueron eliminados [ ✓ ]")
}
break;


//==========  [  STICKERS  ] =============//


case 's': case 'sticker': case 'stiker': case 'esticker': {
if ((m.type == 'imageMessage') || isQuotedImage) {
var buffer = isQuotedImage ? await m.quoted.downloadMedia() : await downloadMedia(m)
var rand1 = './media/' + getRandom('.jpg')
var rand2 = './media/ '+ getRandom('.webp')
fs.writeFileSync(rand1, buffer)
ffmpeg(rand1).on("error", console.error).on("end", async() => {
m.reply(msg.wait)
await writeExif(rand2, {packname: q ? q : "\t\t\t    © HadesBot - MD\n\n\nWhatsApp Lib Baileys Multi-Device®", author: ''}).then(stik => {
Tesla.sendMessage(m.chat, {sticker: stik}, {quoted: m})
fs.unlinkSync(rand1)
fs.unlinkSync(rand2)
})
}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(200,iw)':min'(200,ih)':force_original_aspect_ratio=decrease,fps=15, pad=200:200:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(rand2)
} else if ((m.type == 'videoMessage') || isQuotedVideo) {
var buffer = isQuotedVideo ? await m.quoted.downloadMedia() : await downloadMedia(m)
var rand1 = './media/' + getRandom('.mp4')
var rand2 = './media/' + getRandom('.webp')
fs.writeFileSync(rand1, buffer)
ffmpeg(rand1).on("error", console.error).on("end", async() => {
m.reply(msg.wait)
await writeExif(rand2, {packname: q ? q : "\t\t\t    © HadesBot - MD\n\n\nWhatsApp Lib Baileys Multi-Device®", author: ''}).then(stik => {
Tesla.sendMessage(m.chat, {sticker: stik}, {quoted: m})
fs.unlinkSync(rand1)
fs.unlinkSync(rand2)
})
}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(rand2)
} else {
m.reply(`etiqueta una foto o video y usa ${prefix + command}\n\nSi es video no debe durar más de 10 segundos.`)
  } 
}
break

case 'robar': case 'wn': case 'wm':
if (!isQuotedSticker) return m.reply(msg.st)
if (!q) return m.reply('*Y el nombre de autor y paquete?*')
pack = q.split('|')[0];
autor = q.split('|')[1];
if (!pack) return m.reply(`*Porfavor escribe bien el formato: ${prefix + command} nombre|autor*`)
if (!autor) return m.reply(`*Porfavor escribe bien el formato: ${prefix + command} nombre|autor*`)
m.reply(msg.wait)
var nameWebp = getRandom('')
var media = await m.quoted.download(nameWebp)
await writeExif(media, {packname: pack, author: autor}).then(stik => Tesla.sendMessage(m.chat, {sticker: stik}, {quoted: m}))
await fs.unlinkSync('./'+ nameWebp +'.webp')
break

case 'attp':{
if (!q) return m.reply(msg.txt)
try {
m.reply(msg.wait)
buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
await Tesla.sendMessage(m.chat, {sticker: buffer}, {quoted: m})
} catch(e) {
m.reply(msg.error)
}
}
break


//==========  [  CONVERTIDORES  ] =============//


case 'toimg': case 'toimg': case 'aimg':{
if (!isQuotedSticker) return m.reply(msg.st)
if (m.quoted.stickerMessage.isAnimated) return m.react('❌')
tetas = await getBuffer('https://telegra.ph/file/9e8ba1809b454411037b7.jpg')
buffer = await m.quoted.downloadMedia()
m.reply(msg.wait)
Tesla.sendMessage(m.chat, {image: buffer, caption: `${msg.y}`}, {quoted: m})
}
break

case 'tomp3': case 'toaudio': {
if (!isQuotedVideo) return m.reply("Etiqueta un vídeo!")
m.reply(msg.wait)
media = await m.quoted.downloadMedia()
let { toAudio } = require('./lib/converter')
audio = await toAudio(media, 'mp4')
await Tesla.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mp4', seconds: -9999999999999}, {quoted: m})
}
break

case 'tourl': case 'telegraph':{
if ((v.type == 'imageMessage') || isQuotedImage) {
buffer = isQuotedImage ? await m.quoted.downloadMedia() : await downloadMedia(m)
res = await uploadImages(buffer)
m.reply("*Link:*\n\n" + res)
} else if ((v.type == 'videoMessage') || isQuotedVideo) {
buffer = isQuotedVideo ? await m.quoted.downloadMedia() : await downloadMedia(m)
res = await uploadImages(buffer)
m.reply("*Link:*\n\n" + res)
} else if (isQuotedDocument) {
buffer = await m.quoted.downloadMedia()
res = await uploadImages(buffer)
m.reply("*Link:*\n\n" + res)
} else {
m.reply('Etiquta a una imagen/video/documento con el comando ' + prefix + command)
}
}
break


//==========  [  OTROS  ] =============//


case 'leermas':
if (args.length < 1) return m.reply(msg.txt2(prefix, command))
     var teksa = q.split("|")[0];
     var teks2 = q.split("|")[1];
     m.reply(`${teksa}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${teks2}`)
break

case 'contar':
if (!q) return m.reply(msg.txt)
m.reply('Este texto contiene ' + q.length + ' caracteres.')
break

case 'styletxt': case 'styletext': {
	        if (!q) return m.reply(msg.txt)
            let anu = await Scrap.styletext(q)
            let teks = 'Text:  ' + q + '\n*Resultados:*\n\n'
            for (let i of anu) {
            teks += '*▢ ' + i.name + ':* ' + i.result + '\n\n'
            }
           m.reply(teks)
	    }
	    break

 case 'lirik': case 'letra': case 'letras':
if (args.length < 1) return reply('Escribe el nombre de la cancion')
if (!q) return reply('*Cual es el nombre de la cancion?*')
try {
anu = await getJson(`https://some-random-api.ml/lyrics?title=${q}`)
lyrics = `📌 Resultado de ${anu.title}:

*👤 Autor:* ${anu.author}
*🌬 Link:* ${anu.links.genius}
____________________

${anu.lyrics}`
Tesla.sendMessage(from, {image: {url: anu.thumbnail.genius}, caption: lyrics, sendEphemeral: true}, {quoted: m})
} catch {
reply(msg.error)
}
addFilter(from)
break


//==========  [  RPG  ] =============//


case 'mine': case 'minar': case 'miner':
if (minar.has(m.sender)) return m.reply('• Ya has minado, espere 15 minutos para volver a minar');
//////////////////////////////
var hierro = Math.floor(Math.random() * 15)
var oro = Math.floor(Math.random() * 15)
var diamante = Math.floor(Math.random() * 5)
var gemas = Math.floor(Math.random() * 5)
var xp = Math.floor(Math.random() * 50)
//////////////////////////////
m.reply(`✨ Mientras minabas obtuviste:

*🔩 Hierro:* ${hierro}
*💎 Diamantes:* ${diamante}
*🪙 Oro:* ${oro}
*🧿 Gemas:* ${gemas}
*✨ Xp:* ${xp}`)
//////////////////////////////
rpg[0].mineria.gemas += gemas
rpg[0].mineria.diamante += diamante
rpg[0].mineria.hierro += hierro
rpg[0].mineria.oro += oro
addLevelingXp(m.sender, xp)
//////////////////////////////
if (isOwner) return
minar.add(m.sender)
await sleep(900000)
minar.delete(m.sender)
break

case 'cosechar': case 'harvest':
if (cosechar.has(m.sender)) return m.reply('• Ya has cosechado, espere 15 minutos para volver a cosechar.');
//////////////////////////////
var piña = Math.floor(Math.random() * 15)
var sandia = Math.floor(Math.random() * 15)
var melon = Math.floor(Math.random() * 15)
var manzana = Math.floor(Math.random() * 15)
var Xp = Math.floor(Math.random() * 50)
//////////////////////////////
m.reply(`✨ Mientras cosechabas obtuviste:

*🍍 Piñas:* ${piña}
*🍉 Sandías:* ${sandia}
*🍈 Melones:* ${melon}
*🍎 Manzanas:* ${manzana}
*✨ Xp:* ${Xp}`)
//////////////////////////////
rpg[0].frutos.manzana += manzana
rpg[0].frutos.melon += melon
rpg[0].frutos.sandia += sandia
rpg[0].frutos.piña += piña
addLevelingXp(m.sender, Xp)
//////////////////////////////
if (isOwner) return
cosechar.add(m.sender)
await sleep(900000)
cosechar.delete(m.sender)
break

case 'talar':
if (talar.has(m.sender)) return m.reply('• Ya has talado, espere 15 minutos para volver a talar.');
var madera = Math.floor(Math.random() * 15)
//////////////////////////////
var xP = Math.floor(Math.random() * 50)
;m.reply("✨ Mientras talabas obtuviste:\n\n*🪓 Tablones:* "+ madera +"\n*✨ Xp:* " + xP);
//////////////////////////////
rpg[0].arbol.madera += madera
addLevelingXp(m.sender, xP)
//////////////////////////////
if (isOwner) return
talar.add(m.sender)
await sleep(900000)
talar.delete(m.sender)
break

case 'pescar':
if (pescar.has(m.sender)) return m.reply('• Ya has pescado, espere 15 minutos para volver a pescar.');
//////////////////////////////
var pez = Math.floor(Math.random() * 15)
var pezTropical = Math.floor(Math.random() * 15)
var XP = Math.floor(Math.random() * 50)
//////////////////////////////
m.reply(`✨ Mientras pescabas obtuviste:

*🐟 peces:* ${pez}
*🐠 Peces Tropicales:* ${pezTropical}
*✨ Xp:* ${XP}`)
//////////////////////////////
rpg[0].pescaderia.pez_tropical += pezTropical
rpg[0].pescaderia.pez += pez
addLevelingXp(m.sender, XP)
//////////////////////////////
if (isOwner) return
pescar.add(m.sender)
await sleep(900000)
pescar.delete(m.sender)
break

case "inventario": case 'inv': {
txt = `\t\t\t\t\t*🎐  Inventario  🎐*

*${chat2} Aquí verás una lista de lo que has acumulado en el bot:*

*⛏️ Minería:*
*▢ Oro:* ${rpg[0].mineria.oro}
*▢ Hierro:* ${rpg[0].mineria.hierro}
*▢ Gemas:* ${rpg[0].mineria.gemas}
*▢ Diamantes:* ${rpg[0].mineria.diamante}

*🍒 Frutos:*
*▢ Piñas:* ${rpg[0].frutos.piña}
*▢ Sandías:* ${rpg[0].frutos.sandia}
*▢ Melones:* ${rpg[0].frutos.melon}
*▢ Manzanas:* ${rpg[0].frutos.manzana}

*🐟 Pescadería:*
*▢ Peces:* ${rpg[0].pescaderia.pez}
*▢ Peces Tropicales:* ${rpg[0].pescaderia.pez_tropical}

*🪓 Madera:*
*▢ Tablones:* ${rpg[0].arbol.madera}

*${chat2} Si quieres vender algo de eso*
*${chat2} usa el comando:*
${prefix}vender <opción> <cantidad>`
Tesla.sendMessage(m.chat, {image: {url: fotouser}, caption: txt}, {quoted: m})
}
break

case 'vender': case 'v': {
if (!q) return m.reply(`*Ingresá la opción que deseás vender*\n\n*• Opciones:*\n\n*🍒 Frutos:*\n- piña\n- sandia\n- melon\n- manzana\n\n*⛏️ Minería:*\n- oro\n- hierro\n- diamante\n-gemas\n\n*🐟 Pescadería:*\n- peces\n- peztropical\n\n*🪓 Árboles:*\n- madera\n\n*• Ejemplo 1:*\n${prefix+command} <opción> 10\n${prefix+command} <opción> <cantidad>\n\n*• Ejemplo 2:*\n${prefix+command} piña 10\n${prefix+command} oro 5`);
// Frutos
if (args[0] === 'piña') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de piñas que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} piña 10\n${prefix + command} piña <cantidad>`)
if (rpg[0].frutos.piña < args[1]) return m.reply("No tienes suficientes piñas para vender esa cantidad!")
var costo = 15
var vender = costo * args[1]
rpg[0].frutos.piña -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Piñas vendidas con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Piña: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Piñas sobrantes: ${rpg[0].frutos.piña}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'sandia') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de sandías que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} sandia 10\n${prefix + command} sandia <cantidad>`)
if (rpg[0].frutos.sandia < args[1]) return m.reply("No tienes suficientes sandías para vender esa cantidad!")
var costo = 20
var vender = costo * args[1]
rpg[0].frutos.sandia -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Sandías vendidas con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Sandía: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Sandías sobrantes: ${rpg[0].frutos.sandia}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'melon') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de melones que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} melon 10\n${prefix + command} melon <cantidad>`)
if (rpg[0].frutos.melon < args[1]) return m.reply("No tienes suficientes melones para vender esa cantidad!")
var costo = 20
var vender = costo * args[1]
rpg[0].frutos.melon -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Melones vendidos con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Melón: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Melones sobrantes: ${rpg[0].frutos.melon}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'manzana') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de manzanas que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} manzana 10\n${prefix + command} manzana <cantidad>`)
if (rpg[0].frutos.manzana < args[1]) return m.reply("No tienes suficientes manzanas para vender esa cantidad!")
var costo = 10
var vender = costo * args[1]
rpg[0].frutos.manzana -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Manzanas vendidas con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Manzana: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Manzanas sobrantes: ${rpg[0].frutos.manzana}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'oro') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de oro que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} oro 10\n${prefix + command} oro <cantidad>`)
if (rpg[0].mineria.oro < args[1]) return m.reply("No tienes suficiente oro para vender esa cantidad!")
var costo = 55
var vender = costo * args[1]
rpg[0].mineria.oro -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Oro vendido con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Lingote: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Oro sobrante: ${rpg[0].mineria.oro}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'hierro') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de hierro que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} hierro 10\n${prefix + command} hierro <cantidad>`)
if (rpg[0].mineria.hierro < args[1]) return m.reply("No tienes suficiente hierro para vender esa cantidad!")
var costo = 50
var vender = costo * args[1]
rpg[0].mineria.hierro -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Hierro vendido con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Lingote: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Hierro sobrante: ${rpg[0].mineria.hierro}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'diamante') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de diamantes que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} diamante 10\n${prefix + command} diamante <cantidad>`)
if (rpg[0].mineria.diamante < args[1]) return m.reply("No tienes suficientes diamantes para vender esa cantidad!")
var costo = 75
var vender = costo * args[1]
rpg[0].mineria.diamante -= args[1]
addBal(m.sender, vender)
sendButMessage(`*Diamantes vendidos con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Diamante: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Diamantes sobrantes: ${rpg[0].mineria.diamante}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'gemas') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de gemas que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} gema 10\n${prefix + command} gema <cantidad>`)
if (rpg[0].mineria.gemas < args[1]) return m.reply("No tienes suficientes gemas para vender esa cantidad!")
var costo = 70
var vender = costo * args[1]
rpg[0].mineria.gemas -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Gemas vendidas con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Gema: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Gemas sobrantes: ${rpg[0].mineria.gemas}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'peces') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de peces que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} peces 10\n${prefix + command} peces <cantidad>`)
if (rpg[0].pescaderia.pez < args[1]) return m.reply("No tienes suficientes peces para vender esa cantidad!")
var costo = 25
var vender = costo * args[1]
rpg[0].pescaderia.pez -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Peces vendidos con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Pez: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Peces sobrantes: ${rpg[0].pescaderia.pez}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'peztropical') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de peces tropicales que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} peztropical 10\n${prefix + command} peztropical <cantidad>`)
if (rpg[0].pescaderia.pez_tropical < args[1]) return m.reply("No tienes suficientes peces tropicales para vender esa cantidad!")
var costo = 45
var vender = costo * args[1]
rpg[0].pescaderia.pez_tropical -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Peces tropicales vendidos con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Pez-Tropical: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Peces tropicales sobrantes: ${rpg[0].pescaderia.pez_tropical}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
} else if (args[0] === 'madera') {
if (isNaN(args[1])) return m.reply(`Ingresá la cantidad de tablones que quieres vender!!\n\n*• Ejemplo de uso:*\n${prefix + command} madera 10\n${prefix + command} madera <cantidad>`)
if (rpg[0].arbol.madera < args[1]) return m.reply("No tienes suficientes tablones para vender esa cantidad!")
var costo = 29
var vender = costo * args[1]
rpg[0].arbol.madera -= args[1]
addBal(m.sender, vender)
;;sendButMessage(`*Tablones vendidos con éxito [ ✓ ]*

${chat2} Vendedor: @${m.sender.split('@')[0]}
${chat2} Comprador: HadesClient
${chat2} Costó de cada Tablón: ${costo}
${chat2} Cantidad a vender: ${args[1]}
${chat2} Dinero obtenido: $${formatNumber(vender)}
${chat2} Tablones sobrantes: ${rpg[0].arbol.madera}`, buttons = [{buttonId: prefix + 'inv', buttonText: {displayText: 'Ver inventario 👤'}, type: 1}])
  } else {
 m.reply("No existe esa opción!")
 }
};
break 


//==========  [  JUEGOS  ] =============//


case 'tictactoe': case 'xo': case 'ttt': {
if (xo.has(m.sender)) return m.reply('• Ya has jugado, espere 15 minutos para volver a jugar *Tres en raya*.');
ttt = _ttt.filter(v => v.id.includes(m.chat))
if (q == 'aceptar') {
if (!isPlayer2) return m.react('❌')
iniciar = `*🎮 Comienza el juego tictactoe 🎳*\n\n*Jugador 1*\n❌ = @${ttt[0].player1.split`@`[0]}\n\n*Jugador 2*\n⭕ = @${ttt[0].player2.split`@`[0]}\n\n${ttt[0].angar[1]}\t│\t${ttt[0].angar[2]}\t│\t${ttt[0].angar[3]}\n\n${ttt[0].angar[4]}\t│\t${ttt[0].angar[5]}\t│\t${ttt[0].angar[6]}\n\n${ttt[0].angar[7]}\t│\t${ttt[0].angar[8]}\t│\t${ttt[0].angar[9]}\n\n*Empieza:* @${ttt[0].player1.split`@`[0]}`
return m.reply(iniciar, m.chat, [ttt[0].player1, ttt[0].player2])
} else if (q == 'rechazar') {
if (!isPlayer2) return m.react('❌')
m.reply(`@${ttt[0].player2.split`@`[0]} Rechazo el juego.`, m.chat, [ttt[0].player2, ttt[0].player1])
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt[0].player1)
deleteitem(players2, ttt[0].player2)
return _ttt.splice(ttt, 1)
}
if (!mentionUser.length == 1) return m.reply(msg.ment)
if (isTTT) return m.reply(`Actualmente hay una sesión en juego\n*de:* @${ttt[0].player1.split`@`[0]} *vs* @${ttt[0].player2.split`@`[0]}\n\nPara eliminar la sesión\n*escribe:* ${prefix}delxo / ${prefix}delttt`, m.chat, [_ttt[0].player1, _ttt[0].player2])
angar = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
_ttt.push({ player1: m.sender, player2: user, id: m.chat, angar, gilir: user });
ttt_id.push(m.chat);
players1.push(m.sender);
players2.push(user);
sendButMessage(`*🎮 Iniciar el juego tictactoe 🎳*

*Hey @${user.split`@`[0]}!!*
*El usuario: @${m.sender.split`@`[0]} Te desafío.*

Escribe "S" para aceptar
escribe "N" para rechazar

*Nota:*
al ganar consigues $1000
Si terminan en empaté ambos obtendrán $100`,
buttons = [
{buttonId: '.xo aceptar', buttonText: {displayText: '🎮 aceptar'}, type: 1},
{buttonId: '.xo rechazar', buttonText: {displayText: '❌ rechazar'}, type: 1}
], [user, m.sender])
if (isOwner) return
xo.add(m.sender)
await sleep(900000)
xo.delete(m.sender)
};
break

case 'delttt': case 'delxo':{
if (!m.isGroup) throw msg.group
if (!isTTT) return m.reply('📌 No hay sesión en curso!')
ttt = _ttt.filter(x => x.id.includes(m.chat))
if (q === 'rendirse') {
if (!isPlayer2 && !isPlayer1) return m.react('❌')
await m.reply(`El jugador: @${ttt[0].player2 === m.sender  ? ttt[0].player2.split('@')[0] + ' (2)' : ttt[0].player1.split('@')[0] + ' (1)'} se rindió!`, m.chat, [ttt[0].player2, ttt[0].player1])
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt[0].player1)
deleteitem(players2, ttt[0].player2)
deleteitem(startXO, ttt[0].player2)
return _ttt.splice(ttt, 1)
}
// xd
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt[0].player1)
deleteitem(players2, ttt[0].player2)
deleteitem(startXO, ttt[0].player2)
_ttt.splice(ttt, 1)
m.reply("La sesión fue eliminada ☕");
};
break

case 'faketext':
if (!q) return m.reply(`Ejemplo:\n${prefix}faketext @<mención>|<texto del usuario>|<texto del bot>`)
if (!mentionUser.length == 1) return m.reply(msg.ment)
if (!q.includes("|")) return m.reply(`Ejemplo:\n${prefix}faketext @<mención>|<texto del usuario>|<texto del bot>`)
text2 = q.split("|")[1]
text3 = q.split("|")[2]
Tesla.sendMessage(m.chat, {text: text3}, {quoted:{
key: {
fromMe: false,
participant: user
},
message: {
"extendedTextMessage": {
"text": text2
}}}})
break

case 'gay': case 'gey': case 'gai': case 'gei': {
if (!mentionUser.length == 1) return m.reply(msg.ment)
if (ownerNumber.includes(mentionUser[0])) return m.reply(msg.intent)
if (mentionUser.includes(botNumber)) return m.reply(msg.intent)
m.reply("@" + user.split`@`[0] + " *Es " + Numer + "% gay🏳️‍🌈*", m.chat, [user])
}
break

case 'VoR': case 'vor':
sendButMessage(`*Verdad o Reto*`, buttons = [
{buttonId: prefix + 'reto', buttonText: {displayText: '‣ Reto'}, type: 1},
{buttonId: prefix + 'verdad', buttonText: {displayText: '‣ Verdad'}, type: 1}
])
break

case 'reto': {
let { preguntas } = require('./lib/src/reto.js')
sendButMessage(preguntas[Math.floor(Math.random() * preguntas.length)],
buttons = [
{buttonId: prefix + 'reto', buttonText: {displayText: '‣ Reto'}, type: 1},
{buttonId: prefix + 'verdad', buttonText: {displayText: '‣ Verdad'}, type: 1},
{buttonId: prefix + 'preguntas', buttonText: {displayText: '‣ Pregunta'}, type: 1}
])
}
break

case 'verdad': {
let { preguntas } = require('./lib/src/verdad.js')
sendButMessage(preguntas[Math.floor(Math.random() * preguntas.length)],
buttons = [
{buttonId: prefix + 'reto', buttonText: {displayText: '‣ Reto'}, type: 1},
{buttonId: prefix + 'verdad', buttonText: {displayText: '‣ Verdad'}, type: 1},
{buttonId: prefix + 'preguntas', buttonText: {displayText: '‣ Pregunta'}, type: 1}
])
}
break

case 'preguntas': {
let { preguntas } = require('./lib/src/pregunta.js')
sendButMessage(preguntas[Math.floor(Math.random() * preguntas.length)],
buttons = [
{buttonId: prefix + 'reto', buttonText: {displayText: '‣ Reto'}, type: 1},
{buttonId: prefix + 'verdad', buttonText: {displayText: '‣ Verdad'}, type: 1},
{buttonId: prefix + 'preguntas', buttonText: {displayText: '‣ Pregunta'}, type: 1}
])
}
break

case 'casino': case 'cassino':
addFilter(m.chat)
if (!q) return m.reply(`Ingrese el montón a apostar\n\n*• Ejemplo:*\n${prefix + command} <montón>\n${prefix + command} 300`)
if (isNaN(args[0])) return m.reply('El montón tiene que ser un numero!')
if (args[0] < 100) return m.reply('Montón minimo debe de ser de $100')
if (checkDinero(m.sender) < args[0]) return m.reply("Dinero insuficiente!")
let { w, fail } = require('./lib/src/casino');
var deck = ['5', '5', '10', '5', '5']
var ran = deck[Math.floor(Math.random() * deck.length)]
var fail1 = fail[Math.floor(Math.random() * fail.length)]
var fail2 = fail[Math.floor(Math.random() * fail.length)]
var win = w[Math.floor(Math.random() * w.length)]
if (ran < 10) {
var teks =`╭──╼┥CASSINO┝╾──╮\n╽ ┌──────────┐  ┃\n┃ │ 🍇 │ 🍎 │ 🍍\n┃ ├──────────┤  ┃\n┃ │ ${fail1}\n┃ ├──────────┤  ┃\n┃ │ ${fail2}\n╿ └──────────┘  ╿\n╰──┨⃞ 𝐂𝐀𝐒𝐒𝐈𝐍𝐎┠──\n\nBuen intento, has perdido $${q}`
removeBal(m.sender, Number(q))
} else {
var teks =`╭──╼┥CASSINO┝╾──╮\n╽ ┌──────────┐  ┃\n┃ │ 🍋 │ 🍌 │ 🍍\n┃ ├──────────┤  ┃\n┃ │ ${win}\n┃ ├──────────┤  ┃\n┃ │ ${fail1}\n╿ └──────────┘  ╿\n╰──┨⃞ 𝐂𝐀𝐒𝐒𝐈𝐍𝐎┠──\n\nFelicidades has ganado $${Number(q) * 2}`
addBal(m.sender, Number(q * 2))
}
sendButMessage(teks, buttons = [
{buttonId: prefix + 'casino ' + q, buttonText:{displayText: 'Intentar de nuevo'},type:1}
])
break

case 'ppt': case 'juego': case 'jugar': {
if (!q) return m.reply(`*• Elije una opción entré:*\n\n- Piedra\n- Papel\n- Tijera\n\n*• Ejemplo de usó:*\n${prefix + command} piedra`)
if (!["piedra", "papel", "tijera"].includes(args[0])) return m.reply('Lo siento, pero *'+q+'* no es un elemento compatible.\n\n_Solo puedes elegir entre piedra, papel o tijera!_');
const juego = ['Piedra', 'Papel', 'Tijera', 'Papel', 'Piedra', 'Tijera', 'Tijera', 'Piedra', 'Papel'];
const ppt = juego[Math.floor(Math.random() * juego.length)];
const Numer = Math.floor(Math.random() * 50)
keyppt = await m.reply(ppt);
await sleep(1000)
if (args[0] === "piedra") {
if (ppt === 'Papel') return m.reply('Papel envuelve Piedra. 📌\n*Yo gané ッ*', m.chat, [], keyppt);
if (ppt === 'Piedra') return m.reply('*Empatamos!!*', m.chat, [], keyppt);
if (ppt === 'Tijera') m.reply(`*Piedra rompe Tijera* Bien jugado!!\n\nSe te añadió:  ${Numer} a tu balance\n*Escribe:* ${prefix}bal Para checar tu balance.`);
addBal(m.sender, Numer)
} else if (args[0] === "papel") {
if (ppt === 'Papel') return m.reply('*Empatamos!!*', m.chat, [], keyppt);
if (ppt === 'Tijera') return m.reply('Tijera corta Papel. 📌\n*Yo gané ッ*', m.chat, [], keyppt);
if (ppt === 'Piedra') m.reply(`*Papel envuelve Piedra* Bien jugado!!\n\nSe te añadió:  ${Numer} a tu balance\n*Escribe:* ${prefix}bal Para checar tu balance.`);
addBal(m.sender, Numer)
} else if (args[0] === "tijera") {
if (ppt === 'Tijera') return m.reply('*Empatamos!!*', m.chat, [], keyppt);
if (ppt === 'Piedra') return m.reply('Piedra rompe Tijera. 📌\n*Yo gané ッ*', m.chat, [], keyppt);
if (ppt === 'Papel') m.reply(`*Tijera corta Papel* Bien jugado!!\n\nSe te añadió:  ${Numer} a tu balance\n*Escribe:* ${prefix}bal Para checar tu balance.`);
addBal(m.sender, Numer)
  }
}
break

case 'top': {
if (!m.isGroup) return m.reply(msg.group)
if (!q) return m.reply("Ejemplo:\n" + prefix + command + " 10 gays")
if (isNaN(args[0])) return m.react('❌')
Membs = await participants.map(v => v.id)
if (Membs.length < args[0]) return m.reply("Cantidad de participantes insuficiente en esté grupo pará crear ese top!")
txt = `*Top-${args[0]} ${args[1]} en esté grupo:*\n\n`
for (let i = 0; i < args[0]; i++) {
txt += `*${i + 1}. @${groupMetadata.participants[i].id.split`@`[0]}*\n`
}
await Tesla.reply(txt);
}
break

case 'pregunta':
if (!q) return m.reply('Y la pregunta?')
respuesta = [
"Si", "No", "Puede ser", "Puede que no", "Puede que si",
"Yo que se", "No lo sé", "Talvez si", "Talvez no", "A",
"Puede ser que si", "Puede ser que no", "Creó que sí", ":v",
"Creó que no", "😐", "🤨", "👻", "Hmm déjame lo pienso un poco",
"Hahaha si", "Hahaha no", "XD", "Sexo", "Qué quieres decir?", ".....?"
]
m.reply(respuesta[Math.floor(Math.random() * respuesta.length)])
break

case 'simi': case 'simsimi': case 'bot':
if (!q) return m.reply('Text?')
sim = await getJson(`https://simsimi.info/api/?text=${q}&lc=es`)
m.reply(sim.message)
break

//==========  [  STAFF  ] =============//


case 'save':
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!q) return m.reply('Nombre para el archivo?')
if (!m.quoted) return m.reply('Responde a un archivo para guardarlo')
var sFiles = new Array({ sticker: fs.readdirSync('./media/storage/sticker'), audio: fs.readdirSync('./media/storage/audio'), image: fs.readdirSync('./media/storage/image'), video: fs.readdirSync('./media/storage/video'), documento: fs.readdirSync('./media/storage/doc') })
if (isQuotedSticker) {
    if (sFiles[0].sticker.includes(q + '.webp')) return m.reply(msg.file)
	var media = await m.quoted.downloadMedia()
	await fs.writeFileSync(`./media/storage/sticker/${q}.webp`, media)
	m.react('✅'); m.reply(msg.save)
} else if (isQuotedAudio) {
	if (sFiles[0].audio.includes(q + '.mp3')) return m.reply(msg.file)
	var media = await m.quoted.downloadMedia()
	await fs.writeFileSync(`./media/storage/audio/${q}.mp3`, media)
	m.react('✅'); m.reply(msg.save)
} else if ((m.type == 'imageMessage') || isQuotedImage) {
	if (sFiles[0].image.includes(q + '.jpg')) return m.reply(msg.file)
	var media = isQuotedImage ? await m.quoted.downloadMedia() : await downloadMedia(m)
	await fs.writeFileSync(`./media/storage/image/${q}.jpg`, media)
	m.react('✅'); m.reply(msg.save)
} else if ((m.type == 'videoMessage') || isQuotedVideo) {
	if (sFiles[0].video.includes(q + '.mp4')) return m.reply(msg.file)
	var media = isQuotedVideo ? await m.quoted.downloadMedia() : await downloadMedia(m)
	await fs.writeFileSync(`./media/storage/video/${q}.mp4`, media)
	m.react('✅'); m.reply(msg.save)
} else if (isQuotedDocument) {
    if (sFiles[0].documento.includes(q)) return m.reply(msg.file)
    var media = await m.quoted.downloadMedia()
} else {
	m.reply('Responde a un archivo para guardarlo')
}
break

case 'storage':
var sFiles = new Array({ sticker: fs.readdirSync('./media/storage/sticker'), audio: fs.readdirSync('./media/storage/audio'), image: fs.readdirSync('./media/storage/image'), video: fs.readdirSync('./media/storage/video'), documento: fs.readdirSync('./media/storage/doc') })
teks = `*${chat2} Para obtener un archivo*
Use: *${prefix}getfile <nombre del archivo>*

*${chat2} Para eliminar un archivo*
Use: *${prefix}delfile <nombre del archivo>*


*${chat2} Total Stickers:* ${sFiles[0].sticker.length - 1}\n`
if (sFiles[0].sticker.length === 1) teks += '\n-  '
for (var x of sFiles[0].sticker) {
	if (!(x === 'six')) {
		teks += `\n- ${x.replace('.webp', '')}`
	}
}
teks += `\n\n*${chat2} Total Audios:* ${sFiles[0].audio.length - 1}\n`
if (sFiles[0].audio.length === 1) teks += '\n- '
for (var x of sFiles[0].audio) {
	if (!(x === 'six')) {
		teks += `\n- ${x.replace('.mp3', '')}`
	}
}
teks += `\n\n*${chat2} Total Imagenes:* ${sFiles[0].image.length - 1}\n`
if (sFiles[0].image.length === 1) teks += '\n- '
for (var x of sFiles[0].image) {
	if (!(x === 'six')) {
		teks += `\n- ${x.replace('.jpg', '')}`
	}
}
teks += `\n\n*${chat2} Total Videos:* ${sFiles[0].video.length - 1}\n`
if (sFiles[0].video.length === 1) teks += '\n- '
for (var x of sFiles[0].video) {
	if (!(x === 'six')) {
		teks += `\n- ${x.replace('.mp4', '')}`
	}
}
m.livelog(teks)
break

case 'getfile':
//if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!q) return m.reply("Nombre del archivo que quieres ver?")
m.react('👻')
var sFiles = new Array({ sticker: fs.readdirSync('./media/storage/sticker'), audio: fs.readdirSync('./media/storage/audio'), image: fs.readdirSync('./media/storage/image'), video: fs.readdirSync('./media/storage/video'), documento: fs.readdirSync('./media/storage/doc') })
if ((sFiles[0].sticker.includes(q + '.webp')) || (sFiles[0].audio.includes(q + '.mp3')) || (sFiles[0].image.includes(q + '.jpg')) || (sFiles[0].video.includes(q + '.mp4'))) {
	if (sFiles[0].sticker.includes(q + '.webp')) {
	  Tesla.sendMessage(m.chat, {sticker: fs.readFileSync('./media/storage/sticker/' + q + '.webp')}, {quoted: m})
	}
	if (sFiles[0].audio.includes(q + '.mp3')) {
	  Tesla.sendMessage(m.chat, {audio: fs.readFileSync('./media/storage/audio/' + q + '.mp3')}, {quoted: m})
	}
	if (sFiles[0].image.includes(q + '.jpg')) {
	  Tesla.sendMessage(m.chat, {image: fs.readFileSync('./media/storage/image/' + q + '.jpg'), caption: `*${q}*`}, {quoted: m})
	}
	if (sFiles[0].video.includes(q + '.mp4')) {
	  Tesla.sendMessage(m.chat, {video: fs.readFileSync('./media/storage/video/' + q + '.mp4'), caption: `*${q}*`}, {quoted: m})
	}
} else {
	m.react('❌'); m.reply('_• No existe ningun archivo con ese nombre!_')
}
break

case 'delfile':
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
var sFiles = new Array({ sticker: fs.readdirSync('./media/storage/sticker'), audio: fs.readdirSync('./media/storage/audio'), image: fs.readdirSync('./media/storage/image'), video: fs.readdirSync('./media/storage/video'), documento: fs.readdirSync('./media/storage/doc') })
if ((sFiles[0].sticker.includes(q + '.webp')) || (sFiles[0].audio.includes(q + '.mp3')) || (sFiles[0].image.includes(q + '.jpg')) || (sFiles[0].video.includes(q + '.mp4'))) {
	if (sFiles[0].sticker.includes(q + '.webp')) {
		await fs.unlinkSync('./media/storage/sticker/' + q + '.webp')
		m.react('✅'); m.reply(msg.delfile)
	}
	if (sFiles[0].audio.includes(q + '.mp3')) {
		await fs.unlinkSync('./media/storage/audio/' + q + '.mp3')
		m.react('✅'); m.reply(msg.delfile)
	}
	if (sFiles[0].image.includes(q + '.jpg')) {
		await fs.unlinkSync('./media/storage/image/' + q + '.jpg')
		m.react('✅'); m.reply(msg.delfile)
	}
	if (sFiles[0].video.includes(q + '.mp4')) {
		await fs.unlinkSync('./media/storage/video/' + q + '.mp4')
		m.react('✅'); m.reply(msg.delfile)
	}
} else {
	m.react('❌'); m.reply('_• No existe ningun archivo con ese nombre!_')
}
break

case 'public': case 'publico': case 'modpublic': {
              if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
               if (Publi_Priv) return m.reply('El modo *público* ya estaba activado')
                Publi_Priv = true
                m.livelog('*Modo Público Activado*')
            }
            break

            case 'self': case 'privado': case 'modself': {
             if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
              if (!Publi_Priv) return m.reply('El modo *privado* ya estaba activado')
                Publi_Priv = false
                m.livelog('*Modo Privado Activado*')
            }
            break

case 'mute': case 'chatban': case 'banchat':{
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!m.isGroup) return m.reply(msg.group)
if (isMuted) return m.reply('Este grupo ya estaba baneado!')
mute.push(m.chat)
fs.writeFileSync('./database/Json/mute.json', Json(mute))
m.reply('✅')
}
break

case 'unmute': case 'unbanchat':{
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!m.isGroup) return m.reply(msg.group)
if (!isMuted) return m.reply('Este chat no está baneado!')
deleteitem(mute, m.chat)
fs.writeFileSync('./database/Json/mute.json', Json(mute))
m.reply('✅')
}
break

case 'block':{
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!mentionUser.length == 1) return m.reply(msg.ment)
if (ownerNumber.includes(mentionUser[0])) return m.reply(msg.intent)
if (mentionUser.includes(botNumber)) return m.reply(msg.intent)
m.reply('Hola @' + user.split`@`[0] + ` por órdenes de mi *${m.key.fromMe ? 'Dueño 👑' : isOwner ? 'Owner 👑' : ''}*, Serás bloqueado`, user, [user], {key: {fromMe: false, participant: "5212213261679@s.whatsapp.net"}, message: {orderMessage: {orderId: "5212213261679@s.whatsapp.net", itemCount: -5, status: "INQUIRY", surface: "CATALOG", orderTitle: 'HadesBot - MD'}}})
await sleep(3000)
await Tesla.updateBlockStatus(user, 'block')
await m.react('✅');
m.reply('_*@'+ user.split`@`[0] +' a sido bloqueado.*_', m.chat, [user])
}
break

case 'unblock':{
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!mentionUser.length == 1) return m.reply(msg.ment)
await Tesla.updateBlockStatus(user, 'unblock')
await m.react('✅');
m.reply('_*@'+user.split`@`[0]+' a sido desbloqueado.*_', m.chat, [user])
}
break

case 'bc': case 'bloadcast':{
if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
var test = `*BroadCast | ${m.key.fromMe ? '👑 Dueño' : isOwner ? '👑 Owner' : ''} | In chat*\n\n${q}`
var faketest = {key: {fromMe: false, participant: '0@s.whatsapp.net'}, message: {viewOnceMessage:{message: {videoMessage:{mimetype: 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}
var getGroups = await Tesla.groupFetchAllParticipating()
var groupsID = Object.entries(getGroups).slice(0).map(x => x[1]).map(x => x.id)
for (let id of groupsID) {
var jids = []
var groupMdata = await Tesla.groupMetadata(id)
var groupMem = groupMdata.participants
groupMem.map(v => jids.push(v.id))
m.reply(test, id, jids, faketest)
};
users = store.chats.all().filter(v => v.id.includes('@s.whatsapp')).map(v => v.id)
for (let i of users) {
m.reply(test, ids, [], faketest)
  }
}
break

case 'addbal':{
if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
if (!mentionUser.length == 1) return m.reply(msg.ment)
if (!q) return m.reply("*• Ejemplo:*\n\n"+ prefix+command + " 500 <@user>")
if (isNaN(args[0])) return m.reply("El montón tiene que ser un número!")
if (!balance.map(v => v.id).includes(mentionUser[0])) return m.reply("*_[ × ] Lo siento, parece que el usuario @"+ user.split`@`[0] +" no se encuentra guardado en la base de datos!_*", m.chat, [user])
addBal(user,  Number(args[0]))
;;m.reply(`Se le a agregado: *[ $${formatNumber(args[0])} ]* al balance de: @`+ mentionUser[0].split`@`[0], m.chat, [user])

}
break

case 'delbal':{
if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
if (!mentionUser.length == 1) return m.reply(msg.ment)
if (!q) return m.reply("*• Ejemplo:*\n\n"+ prefix+command + " 500 <@user>")
if (isNaN(args[0])) return m.reply("El montón tiene que ser un número!")
if (!balance.map(v => v.id).includes(mentionUser[0])) return m.reply("*_[ × ] Lo siento, parece que el usuario @"+ user.split`@`[0] +" no se encuentra guardado en la base de datos!_*", m.chat, [user])
removeBal(user,  Number(args[0]))
;;m.reply(`Se le a removido: *[ $${formatNumber(args[0])} ]* al balance de: @`+ mentionUser[0].split`@`[0], m.chat, [user])
}
break

case 'clonar':{
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!q) return m.reply('...?')
if (!args[0].includes("@g.us")) return m.reply('....?')
jid = m.sender
let Metadata = await Tesla.groupMetadata(args[0])
let group = await Tesla.groupCreate(Metadata.subject, [jid])
await sleep(5000)
await Tesla.groupParticipantsUpdate(group.id, [jid], 'promote')
await Tesla.groupUpdateDescription(group.id, Metadata.desc)
await Tesla.groupSettingUpdate(group.id, 'locked')
try {
xxxxx = await Tesla.profilePictureUrl(args[0], 'image')
} catch {
xxxxx = 'https://telegra.ph/file/f5ac7ac078ce00a182a96.jpg'
};
await Tesla.updateProfilePicture(group.id, {url: xxxxx})
await Tesla.sendMessage(group.id, {text: '✅'}, {quoted: {key:{fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "6289523258649-1604595598@g.us"}, message:{imageMessage:{mimetype: "image/jpeg", caption: "HadesBot-MD", thumbnail: await m.createJpg(loli, 250, 250)}}}})
await sleep(4000)
v = await Metadata.participants.map(v => v.id)
for (let i of v) {
await Tesla.groupParticipantsUpdate(group.id, [i], 'add')
}
await Tesla.sendMessage(group.id, {text: "Grupo clonado con éxito [ ✓ ]", mentions: v}, {quoted: {key:{fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "6289523258649-1604595598@g.us"}, message:{imageMessage:{mimetype: "image/jpeg", caption: "HadesBot-MD", thumbnail: await m.createJpg(loli, 250, 250)}}}})
};
break

case 'getcase':
if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
try {
const getCase = (cases) => {
return "case" + ` '${cases}'` + fs.readFileSync('upsert.js').toString().split('case \'' + cases + '\'')[1].split("break")[0] + "break"
}
m.reply(`${getCase(args[0])}`)
} catch {
m.reply('No se encontro el case')
}
break

case 'setprefix':
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!q) return m.reply(`*• Elije una opción*\n\n*• Ejemplo de uso:*\n\n${prefix}setprefix multiprefijo\n${prefix}setprefix noprefijo\n${prefix}setprefix <personalizado>`)
if (args[0] === 'multiprefijo') {
if (multiprefix) return m.reply("El multi-prefijo ya estaba activado!")
global.multiprefix = true
global.noprefix = false
global.unprefix = false
m.reply("*La opción multi-prefijo se ah activado [ ✓ ]*\n\nAhora puedes usar cualquier símbolo del teclado para usar un comando!")
} else if (args[0] === 'noprefijo') {
if (noprefix) return m.reply("El prefijo ya estaba eliminado!")
global.multiprefix = false
global.noprefix = true
global.unprefix = false
m.reply("El prefijo se a eliminando! [ ✓ ]\n\n*Ya no necesitas poner el prefijo para usar un comando!!*")
} else if (args[0] === `${q}`) {
global.multiprefix = false
global.noprefix = false
global.unprefix = true
global.prefijo = `${args[0]}`
m.reply(`*El prefijo se cambió a: "${args[0]}" correctamente [ ✓ ]*`)
}
break

case 'readview': {
i = isQuotedMsg ? Json(m.message).includes("viewOnceMessage") ? true : false : false
if (!i) return m.reply("Etiqueta una imagen o vídeo viewOnce")
var caption = m.quoted.msg.caption ? m.quoted.msg.caption : 'Sin texto'
var users = parseMention(caption)
var teks = `*${chat2} Usuario:* @${user.split`@`[0]}\n*${chat2} Tipo:* ${m.quoted.msg.type.replace("imageMessage", "Imagen").replace("videoMessage", "Video")}\n*${chat2} Texto:* ${caption}`
users.push(user)
if (m.quoted.msg.type === 'imageMessage') {
Jpg = getRandom('')
Tesla.sendMessage(m.chat, {image: await m.quoted.download(Jpg), mimetype: 'image/jpeg', caption: teks, contextInfo: {mentionedJid: users}}, {quoted: m})
await fs.unlinkSync(Jpg + '.jpg')
} else if (m.quoted.msg.type === 'videoMessage') {
var Mp4 = getRandom('')
Tesla.sendMessage(m.chat, {video: await m.quoted.download(Mp4), mimetype: 'video/mp4', caption: teks, contextInfo: {mentionedJid: users}}, {quoted: m})
await fs.unlinkSync(Mp4 + '.mp4')
}
}
break

case 'addmod':
if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
if (mods.includes(user)) return m.reply('*_El usuario @' + user.split`@`[0] + ' ya es moderador!_*', m.chat, [user])
mods.push(user)
fs.writeFileSync('./database/Json/mods.json', Json(mods))
await m.react('✅')
await m.reply("El usuario: @"+ user.split`@`[0] + " fué agregado a la lista de moderadores [ ✓ ]", m.chat, [user])
break

case 'addpremium':
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (pre.includes(user)) return m.reply("*_El usuario @"+ user.split`@`[0] +" ya es premium!_*", m.chat, [user])
pre.push(user)
fs.writeFileSync('./database/Json/premium.json', Json(pre))
await m.react('✅')
await m.reply("El usuario: @"+ user.split`@`[0] +" fué agregado a la lista de premiums [ ✓ ]", m.chat, [user])
break

case 'addban': case 'ban':
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (isBan) return m.reply("*_[ × ] El usuario @"+ user.split`@`[0] +" ya estaba baneado!_*", m.chat, [user])
await addBan(user, ban)
fs.writeFileSync('./database/Json/ban.json', Json(ban))
await m.react('✅')
await m.reply('*@' + user.split`@`[0] + ' usted a sido baneado, lo que significa que no podra usar el bot!*', m.chat, [user])
break

case 'delmod':
if (!isOwner && !m.key.fromMe) return m.reply(msg.ownerB)
if (!mods.includes(user)) return m.reply('*_[ × ] El usuario @' + user.split`@`[0] + ' no es moderador!_*', m.chat, [user])
deleteitem(mods, user)
fs.writeFileSync('./database/Json/mods.json', Json(mods))
await m.react('✅')
await m.reply("*El usuario: @" + user.split`@`[0] + " fué eliminado de la lista de moderadores [ ✓ ]*", m.chat, [user])
break

case 'delpremium':
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!pre.includes(user)) return m.reply("*_[ × ] El usuario @"+ user.split`@`[0] +" no es premium!_*", m.chat, [user])
deleteitem(pre, user)
fs.writeFileSync('./database/Json/premium.json', Json(pre))
await m.react('✅')
await m.reply("*El usuario: @"+ user.split`@`[0] +" fué eliminado de la lista de premiums [ ✓ ]*", m.chat, [user])
break

case 'delban': case 'unban':
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (isBan) return m.reply("*_[ × ] El usuario @"+ user.split`@`[0] +" no está baneado!_*", m.chat, [user])
unBan(user, ban)
fs.writeFileSync('./database/Json/ban.json', Json(ban))
await m.react('✅');
await m.reply('*@' + user.split`@`[0] + ' usted a sido desbaneado, ahora podra usar el bot libremente!*_', m.chat, [user])
break 

case 'list': case 'lista':{
if (!isOwner && !m.key.fromMe && !isMods) return m.reply(msg.ownerB)
if (!q) return m.reply(`*• Elije una opción*\n\n- opciones\n▢ mod\n▢ premium\n▢ block\n▢ ban\n\n*• Ejemplo:*\n${prefix}list mod`)
if (args[0] === 'mod') {
teks = '*~ Lista de Moderadores:*\n\n'
for (var i of mods) {
teks += '*- @'+ i.split`@`[0] +'*\n'
}
teks += '\n*Total Moderadores:* '+ mods.length
m.key.fromMe ? await Tesla.reply(teks) : await m.livelog(teks)
} else if (args[0] === 'premium') {
teks = '*~ Lista de Premiums:*\n\n'
for (var i of pre) {
teks += '*- @'+ i.split`@`[0] +'*\n'
}
teks += '\n*Total Premiums:* '+ pre.length
m.key.fromMe ? await Tesla.reply(teks) : await m.livelog(teks);
} else if (args[0] === 'block') {
users = await Tesla.fetchBlocklist()
txt = `*Actualmente hay ${users.length} personas que han sido bloqueados por el bot o manualmente.*\n\n────────────────────────\n\n*En casó de querer desbloquear a alguien.*\n*Usa:* ${prefix}unblock + número de la persona\n*Ejemplo:* ${prefix}unblock ${users[0].split`@`[0]}\n\n─────────────────────────\n\n*~ Lista:*\n\n`
for (var i of users) {
txt += '▢ *@' + i.split`@`[0] + '* ('+i.split`@`[0]+')\n';
}
Tesla.reply(txt)
} else if (args[0] === 'ban') {
teks = '*~ Lista de personas Baneadas:*\n\n'
ids = ban.map(v => v.id)
for (var i of ids) {
teks += '*- @'+ i.split`@`[0] +'*\n'
}
teks += '\n*Total Baneados:* '+ ids.length
m.key.fromMe ? await Tesla.reply(teks) : await m.livelog(teks);
} else {
  m.react('❌'); m.reply("No existe esa opción!")
 }
}
break


//Fin Jake y maté :v
default:

if (v.body.startsWith('>')) {
   if (!isOwner && !m.key.fromMe) return
						try {
							var value = await eval(`(async () => {${v.body.slice(1)}})()`)
						 await Tesla.sendMessage(m.chat, {text: util.format(value)}, {quoted: m})
						} catch(e){
							await Tesla.sendMessage(m.chat, {text: String(e)}, {quoted: m})
						}
					}



if (v.body.startsWith('<')) {
            if (!isOwner && !m.key.fromMe) return
                    try {
                        let evaled = await eval(v.body.slice(1))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await Tesla.sendMessage(m.chat, {text: util.format(evaled)}, {quoted: m})
                    } catch (err) {
                        await Tesla.sendMessage(m.chat, {text: String(err)}, {quoted: m})
                    }
                }

	if (v.body.startsWith('$')) {
	  if (!isOwner && !m.key.fromMe) return
						exec(v.body.slice(1), (err, stdout) => {
							if (err) return m.reply(err)
							if (stdout) return m.reply(stdout)
						})
					}

      if (m.body.startsWith('-0')) {
       if (!isOwner && !m.key.fromMe) return
         let syntaxErr = require('syntax-error')
         let _syntax = ''
        let _return
          let _text = `(async () => { ${m.body.slice(2)} })()`
      try {
        _return = await eval(_text)
         } catch (e) {
        let err = await syntaxErr(_text, 'Sistema De Ejecución')
        if (err) _syntax = err + '\n\n'
        _return = e
        } finally {
        m.reply(_syntax + util.format(_return))
     }
   }
   
if (v.body.startsWith('x')) {
if (!isOwner && !m.key.fromMe) return
await m.reply(Json(eval(m.body.slice(1)), null, 2))
}



//Comienzo el juego TicTacToe

if (isTTT === true && isPlayer1 === true) {
nuber = parseInt(m.body)
if (isNaN(nuber)) return
if (nuber < 1 && nuber > 9) return m.reply('Ingresa los números correctamente!\nSolo se permite del 1 hasta el 9 :)')
ttt_player1 = _ttt.filter(x => x.id.includes(m.chat))
tttwal1 = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
if (!tttwal1.includes(ttt_player1[0].angar[nuber])) return m.reply(`El número: ${m.body} ya esta ocupado, por favor elija otro!`)
if (ttt_player1[0].gilir.includes(m.sender)) return m.react('❌')
ttt_player1[0].angar[nuber] = '❌'
ttt_player1[0].gilir = ttt_player1[0].player1
_ttt = _ttt.filter(v => !v.id.includes(m.chat))
_ttt.push(ttt_player1[0])
ttt1 = _ttt.filter(v => v.id.includes(m.chat))
ttt =`
${ttt1[0].angar[1]}\t│\t${ttt1[0].angar[2]}\t│\t${ttt1[0].angar[3]}\n
${ttt1[0].angar[4]}\t│\t${ttt1[0].angar[5]}\t│\t${ttt1[0].angar[6]}\n
${ttt1[0].angar[7]}\t│\t${ttt1[0].angar[8]}\t│\t${ttt1[0].angar[9]}`
var sala1 = () => {
ganador1 = `*🎮 Tictactoe Game 🎳*

${ttt}

*@${ttt1[0].player1.split`@`[0]}* Es el ganador.
🏆 premio: $1000`
m.reply(ganador1, m.chat, [ttt1[0].player1])
addBal(ttt1[0].player1, 1000)
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt1[0].player1)
deleteitem(players2, ttt1[0].player2)
deleteitem(startXO, ttt1[0].player2)
return _ttt.splice(ttt1, 1)
};
if (ttt1[0].angar[1] == '❌' && ttt1[0].angar[2] == '❌' && ttt1[0].angar[3] == '❌') return sala1()
if (ttt1[0].angar[1] == '❌' && ttt1[0].angar[4] == '❌' && ttt1[0].angar[7] == '❌') return sala1()
if (ttt1[0].angar[1] == '❌' && ttt1[0].angar[5] == '❌' && ttt1[0].angar[9] == '❌') return sala1()
if (ttt1[0].angar[2] == '❌' && ttt1[0].angar[5] == '❌' && ttt1[0].angar[8] == '❌') return sala1()
if (ttt1[0].angar[4] == '❌' && ttt1[0].angar[5] == '❌' && ttt1[0].angar[6] == '❌') return sala1()
if (ttt1[0].angar[7] == '❌' && ttt1[0].angar[8] == '❌' && ttt1[0].angar[9] == '❌') return sala1()
if (ttt1[0].angar[3] == '❌' && ttt1[0].angar[5] == '❌' && ttt1[0].angar[7] == '❌') return sala1()
if (ttt1[0].angar[3] == '❌' && ttt1[0].angar[6] == '❌' && ttt1[0].angar[9] == '❌') return sala1()
if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && !ttt.includes('4️⃣') && !ttt.includes('5️⃣') && !ttt.includes('6️⃣') && !ttt.includes('7️⃣') && !ttt.includes('8️⃣') && !ttt.includes('9️⃣')){
m.reply(`*🎮 Tictactoe Game 🎳*

${ttt}

Terminó En Empaté
Ambos recibirán $100`)
addBal(ttt1[0].player1, 100)
addBal(ttt1[0].player2, 100)
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt1[0].player1)
deleteitem(players2, ttt1[0].player2)
deleteitem(startXO, ttt1[0].player2)
return _ttt.splice(ttt1, 1)
}
user1 = `*🎮 Tictactoe Game 🎳*

*Jugador 1*
❌ = @${ttt1[0].player1.split`@`[0]}

*Jugador 2*
⭕ = @${ttt1[0].player2.split`@`[0]}

${ttt}

Turno de: @${ttt1[0].player2.split`@`[0]}`
sendButMessage(user1, buttons = [{buttonId: '.delxo rendirse', buttonText: {displayText: '🚩 Rendirse'}, type: 1}], [ttt1[0].player1, ttt1[0].player2])
}



/*.                     */

if (isTTT === true && isPlayer2 === true) {
nuber = parseInt(m.body)
if (isNaN(nuber)) return
if (nuber < 1 && nuber > 9) return m.reply('Ingresa los números correctamente!\nSolo se permite del 1 hasta el 9 :)')
ttt_player2 = _ttt.filter(v => v.id.includes(m.chat))
tttwal2 = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
if (!tttwal2.includes(ttt_player2[0].angar[nuber])) return m.reply(`El número: ${m.body} ya esta ocupado, por favor elija otro!`)
if (ttt_player2[0].gilir.includes(m.sender)) return m.react('❌')
ttt_player2[0].angar[nuber] = '⭕';
ttt_player2[0].gilir = ttt_player2[0].player2
_ttt = _ttt.filter(v => !v.id.includes(m.chat))
_ttt.push(ttt_player2[0])
ttt2 = _ttt.filter(v => v.id.includes(m.chat))
ttt = `
${ttt2[0].angar[1]}\t│\t${ttt2[0].angar[2]}\t│\t${ttt2[0].angar[3]}\n
${ttt2[0].angar[4]}\t│\t${ttt2[0].angar[5]}\t│\t${ttt2[0].angar[6]}\n
${ttt2[0].angar[7]}\t│\t${ttt2[0].angar[8]}\t│\t${ttt2[0].angar[9]}`
var sala2 = () =>{
ganador2 = `*🎮 Tictactoe Game 🎳*

${ttt}

*@${ttt2[0].player2.split`@`[0]}* Es el ganador.
🏆 Premio: $1000`
m.reply(ganador2, m.chat, [ttt2[0].player2])
addBal(ttt2[0].player2, 1000)
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt2[0].player1)
deleteitem(players2, ttt2[0].player2)
deleteitem(startXO, ttt2[0].player2)
return _ttt.splice(ttt2, 1)
};
if (ttt2[0].angar[1] == '⭕' && ttt2[0].angar[2] == '⭕' && ttt2[0].angar[3] == '⭕') return sala2()
if (ttt2[0].angar[1] == '⭕' && ttt2[0].angar[2] == '⭕' && ttt2[0].angar[3] == '⭕') return sala2()
if (ttt2[0].angar[1] == '⭕' && ttt2[0].angar[4] == '⭕' && ttt2[0].angar[7] == '⭕') return sala2()
if (ttt2[0].angar[1] == '⭕' && ttt2[0].angar[5] == '⭕' && ttt2[0].angar[9] == '⭕') return sala2()
if (ttt2[0].angar[2] == '⭕' && ttt2[0].angar[5] == '⭕' && ttt2[0].angar[8] == '⭕') return sala2()
if (ttt2[0].angar[4] == '⭕' && ttt2[0].angar[5] == '⭕' && ttt2[0].angar[6] == '⭕') return sala2()
if (ttt2[0].angar[7] == '⭕' && ttt2[0].angar[8] == '⭕' && ttt2[0].angar[9] == '⭕') return sala2()
if (ttt2[0].angar[3] == '⭕' && ttt2[0].angar[5] == '⭕' && ttt2[0].angar[7] == '⭕') return sala2()
if (ttt2[0].angar[3] == '⭕' && ttt2[0].angar[6] == '⭕' && ttt2[0].angar[9] == '⭕') return sala2()
if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && !ttt.includes('4️⃣') && !ttt.includes('5️⃣') && !ttt.includes('6️⃣') && !ttt.includes('7️⃣') && !ttt.includes('8️⃣') && !ttt.includes('9️⃣')) {
m.reply(`*🎮 Tictactoe Game 🎳*

${ttt}

Terminó En Empaté
Ambos recibirán $100`)
addBal(ttt2[0].player2, 100)
addBal(ttt2[0].player1, 100)
deleteitem(ttt_id, m.chat)
deleteitem(players1, ttt2[0].player1)
deleteitem(players2, ttt2[0].player2)
deleteitem(startXO, ttt2[0].player2)
return _ttt.splice(ttt2, 1)
}
user2 = `*🎮 Tictactoe Game 🎳*

*Jugador 1*
❌ = @${ttt2[0].player1.split`@`[0]}

*Jugador 2*
⭕ = @${ttt2[0].player2.split`@`[0]}

${ttt}

Turno de: @${ttt2[0].player1.split`@`[0]}`
sendButMessage(user2, buttons = [{buttonId: '.delxo rendirse', buttonText: {displayText: '🚩 Rendirse'}, type: 1}], [ttt2[0].player1, ttt2[0].player2])
}


/*       ANTILINK'S       */
if (m.body.includes('https://chat.whatsapp.com/')){
if (!m.isGroup) return
if (isAntiLink === false) return
if (isAdmins) return m.react("🤨");
if (isOwner && isMods && m.key.fromMe) return m.react("🧐");
linkgp = await Tesla.groupInviteCode(m.chat)
if (m.body.includes(`https://chat.whatsapp.com/${linkgp}`)) return
m.reply("Los enlaces no son permitidos ❌");
await sleep(3000)
await Tesla.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
await Tesla.sendMessage(m.chat, { delete: m.key })
}

if (isUrl(m.body)) {
if (!m.isGroup) return
if (isAntiLinkMax === false) return
if (isAdmins) return m.react("🤨");
if (isOwner && isMods && m.key.fromMe) return m.react("🧐");
linkgp = await Tesla.groupInviteCode(m.chat)
if (m.body.includes(`https://chat.whatsapp.com/${linkgp}`)) return
m.reply("Los enlaces no son permitidos ❌");
await sleep(2000)
await Tesla.sendMessage(m.chat, { delete: m.key })
}
}

} catch (e) {
console.error('Error : %s', chalk.keyword('red')(require('util').format(e)))
Tesla.sendMessage(ownerNumber[0], {text: util.format(e)+'\n\nID: '+m.chat}, {quoted: v})
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.white(`\n${__filename}:\nFue actualizado con exito [ ✓ ]`))
delete require.cache[file]
require(file)
})