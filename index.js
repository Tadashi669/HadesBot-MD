const { default: HadesConnect, useMultiFileAuthState, makeInMemoryStore, DisconnectReason, jidDecode, generateWAMessageFromContent, generateForwardMessageContent } = require('@adiwajshing/baileys')
const pino = require('pino')
const chalk = require('chalk')
const { color } = require('./lib/color')
const welcome = JSON.parse(require('fs').readFileSync('./database/Json/welcome.json'))
const { getBuffer, create } = require('./lib/functions')
const PhoneNumber = require('awesome-phonenumber')


// Important
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const simple = require('./lib/simple')

// HadesConnect
  const connect = async() => {
     const { state, saveCreds } = await useMultiFileAuthState('session')
     const Tesla = HadesConnect({
		logger: pino({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state
	})
	store.bind(Tesla.ev)
	
	Tesla.ev.on('connection.update', (update) => {
     const { connection, lastDisconnect } = update
      if (connection === 'close') {
       if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
				connect()
			} else {
				console.log(color('La conexión con WhatsApp a cerrado.', 'red'), color('\nPor favor vuelva a escanear el código QR', 'yellow'))
			}
      }
       console.log('actualización de conexión', update)
    })
    Tesla.ev.on('creds.update', saveCreds)


// Upsert
Tesla.ev.on('messages.upsert', async (up) => {
if (!up.messages) return
const v = up.messages[0]
let m = simple.smsg(Tesla, v, store)
if (!v.message) return
v.message = (Object.keys(v.message)[0] === 'ephemeralMessage') ? v.message.ephemeralMessage.message : v.message
require("./upsert")(Tesla, m, v, store, welcome)
  }
)



Tesla.ev.on('group-participants.update', async(m) => {
if (!welcome.includes(m.id)) return
console.log(m)
const groupMetadata = await Tesla.groupMetadata(m.id)
const num = m.participants[0]
const admins = await groupMetadata.participants.filter(v => v.admin !== null).map(v => v.id)
const ppuser = await Tesla.profilePictureUrl(num, 'image').catch(e => 'https://tinyurl.com/2afpgt2t')
try {
biouser = (await Tesla.fetchStatus(num)).status
} catch {
biouser = "Bio privada."
}
switch (m.action) {
case 'add':
await Tesla.relayMessage(m.id, {
"extendedTextMessage":{
"text": `*Hola @${num.split`@`[0]}*
*Bio:* ${biouser}\n
Se Bienvenido(a) a *${groupMetadata.subject}*\n
*❑ Participantes:* ${groupMetadata.participants.length}
*❑ Administradores:* ${admins.length}
*❑ Creador:* ${groupMetadata.owner ? '@' + groupMetadata.owner.split`@`[0] : 'Grupo sin creador.'}
*❑ Grupo Creado:* ${create(groupMetadata.creation)}\n
*Lee la descripción:*\n\n${groupMetadata.desc ? groupMetadata.desc : 'Sin Descripción'}`,
"contextInfo":{
"mentionedJid": [num, groupMetadata.owner ? groupMetadata.owner : ''],
"externalAdReply":{
"title": `🍉 Welcome To ${groupMetadata.subject}`,
"thumbnail": await getBuffer(ppuser),
"renderLargerThumbnail": true,
"mediaType": 1,
"showAdAttribution": true
}}}}, {})
break

case 'promote':{
await Tesla.sendMessage(m.id, {image:{url: ppuser}, mentions: admins, caption: `≡ *NUEVO ADMIN*

*❑ Usuario:* @${num.split`@`[0]}
*❑ Número:* ${PhoneNumber('+' + num.split`@`[0]).getNumber('international')}
*❑ Bio:* ${biouser}
*❑ Mensaje:* Nuevo Administrador.`
}, {quoted: {"key": {"fromMe": false, "participant": '0@s.whatsapp.net'}, "message": {"viewOnceMessage": {"message":{"videoMessage":{"mimetype": 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
}
break

case 'demote':{
await Tesla.sendMessage(m.id, {image:{url: ppuser}, mentions: admins, caption: `≡ *UN ADMIN MENOS*

*❑ Usuario:* @${num.split`@`[0]}
*❑ Número:* ${PhoneNumber('+' + num.split`@`[0]).getNumber('international')}
*❑ Bio:* ${biouser}
*❑ Mensaje:* Un administrador menos.`
}, {quoted: {"key": {"fromMe": false, "participant": '0@s.whatsapp.net'}, "message": {"viewOnceMessage": {"message":{"videoMessage":{"mimetype": 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
}
break
}
})

Tesla.ev.on('groups.update', async(v) => {
console.log(v)
res = v[0]
  try {
     ppgc = await Tesla.profilePictureUrl(res.id, 'image')
   } catch {
     ppgc = 'https://tinyurl.com/yx93l6da'
   }
if (res.announce === true) {
await Tesla.sendMessage(res.id, {image: {url: ppgc}, caption: `
*- [   Ajustes Cambiados   ] -*

El grupo ha sido cerrado por un administrador.

Ahora solo el administrador puede enviar mensajes!`
}, {quoted: {"key": {"fromMe": false, "participant": '0@s.whatsapp.net'}, "message": {"viewOnceMessage": {"message":{"videoMessage":{"mimetype": 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
} else if (res.announce === false) {
await Tesla.sendMessage(res.id, {image: {url: ppgc}, caption: `
*- [   Ajustes Cambiados   ] -*

Un administrador ha abierto el grupo.

Ahora todos los participantes pueden enviar mensajes!`
}, {quoted: {"key": {"fromMe": false, "participant": '0@s.whatsapp.net'}, "message": {"viewOnceMessage": {"message":{"videoMessage":{"mimetype": 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
} else if (res.restrict === true) {
await Tesla.sendMessage(res.id, {image: {url: ppgc}, caption: `
*- [   Ajustes Cambiados   ] -*

La información del grupo ha sido restringida.

ahora solo los administradores puede editar la información del grupo!`
}, {quoted: {"key": {"fromMe": false, "participant": '0@s.whatsapp.net'}, "message": {"viewOnceMessage": {"message":{"videoMessage":{"mimetype": 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
} else if (res.restrict === false) {
await Tesla.sendMessage(res.id, {image: {url: ppgc}, caption: `
*- [    Ajustes Cambiados   ] -*

Un administrador ha abierto la información del grupo.

Ahora todos los participantes pueden editar la información del grupo!`
}, {quoted: {"key": {"fromMe": false, "participant": '0@s.whatsapp.net'}, "message": {"viewOnceMessage": {"message":{"videoMessage":{"mimetype": 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
} else {
await Tesla.sendMessage(res.id, {image: {url: ppgc}, caption: `
*- [    Ajustes Cambiados   ] -*

El nombre del grupo ha sido cambiado a *${res.subject}*`
     }, {quoted: {"key": {"fromMe": false, "participant": '0@s.whatsapp.net'}, "message": {"viewOnceMessage": {"message":{"videoMessage":{"mimetype": 'video/mp4', "viewOnce": true,  thumbnail: ''}}}}}})
  }
})

/*     Functions     */

Tesla.decodeJid = (jid) => {
if (!jid && /:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {};
return decode.user && decode.server && decode.user + '@' + decode.server || jid
  } else {
 return jid
 }
}


Tesla.ev.on('contacts.update', v => {
for (let contact of v) {
let id = Tesla.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
    };
  }
)


Tesla.getName = (jid, withoutContact = false) => {
withoutContact = Tesla.withoutContact || withoutContact 
let v
if (jid.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[jid] || {}
if (!(v.name || v.subject)) v = Tesla.groupMetadata(jid) || {}
resolve(v.name || v.subject || '-')
})
else v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' } : id === Tesla.decodeJid(Tesla.user.id) ? Tesla.user : (store.contacts[jid] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || '-'
}


Tesla.copyNForward = async(jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}} : {})} : {})
await Tesla.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

}
connect()
