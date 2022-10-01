const { generateWAMessageFromContent, generateForwardMessageContent, downloadContentFromMessage, proto, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const FileType = require('file-type')
var { parseMention } = require('./src/Functions.js')


const downloadMediaMessage = async (m, filename) => {
        if (m.type === 'viewOnceMessage') {
		m.type = m.msg.type
     	}
        let quoted = m.msg ? m.msg : m
        let mime = (m.msg || m).mimetype || ''
        let messageType = m.type ? m.type.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = filename ? filename + '.' + type.ext : 'undefined.'+type.ext
        await fs.writeFileSync(trueFileName, buffer)
        return fs.readFileSync(trueFileName)
    }

const downloadMedia = async (m) => {
        let quoted = m.msg ? m.msg : m
        let mime = (m.msg || m).mimetype || ''
        let messageType = m.type ? m.type.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }


exports.smsg = (conn, m, store) => {
if (!m) return m
let M = proto.WebMessageInfo
if (m.key) {
m.id = m.key.id
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16
m.chat = m.key.remoteJid
m.fromMe = m.key.fromMe
m.isGroup = m.chat.endsWith('@g.us')
m.sender = m.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (m.key.participant || m.key.remoteJid)
}

if (m.message) {
m.type = getContentType(m.message)
//m.msg = (m.type === 'viewOnceMessage') ? m.message[m.type].message[getContentType(m.message[m.type].message)] : m.message[m.type]
m.body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
m.budy = (m.type === 'conversation') ? m.message.conversation : (m.type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
m.msg = m.message[m.type]


/*       Txt's       */
m.mentionedJid = m.msg?.contextInfo?.mentionedJid || []
m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        
if (m.quoted) {
m.quoted.type = getContentType(m.quoted)
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.isBot = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
m.quoted.sender = m.msg.contextInfo.participant.split(":")[0] || m.msg.contextInfo.participant
m.quoted.fromMe = m.quoted.sender.split('@')[0].includes(conn.user.id.split(':')[0])
m.quoted.text = m.quoted[m.quoted.type]?.text || m.quoted[m.quoted.type]?.caption || m.quoted[m.quoted.type]?.contentText || m.quoted[m.quoted.type]?.hydratedFourRowTemplate?.hydratedContentText || m.quoted?.conversation || ''
m.quoted.key = { remoteJid: m.chat, fromMe: m.quoted.fromMe, id: m.quoted.id, participant: m.quoted.sender }
m.quoted.msg = (m.quoted.type === 'viewOnceMessage') ? m.quoted[m.quoted.type].message[getContentType(m.quoted[m.quoted.type].message)] : m.quoted[m.quoted.type]
if (m.quoted.type === 'viewOnceMessage') {
m.quoted.msg.type = getContentType(m.quoted[m.quoted.type].message)
}
let vM = m.quoted.fakeObj = proto.WebMessageInfo.fromObject({ key: m.quoted.key, message: m.quoted })
m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)
m.quoted.delete = () => conn.sendMessage(m.chat, { delete: vM.key })
m.quoted.download = (filename) => downloadMediaMessage(m.quoted, filename)
m.quoted.downloadMedia = () => downloadMedia(m.quoted)
m.quoted.react = (emoji) => conn.sendMessage(m.chat, { react:{ text: emoji, key: m.quoted.key }})

m.getQuotedObj = m.getQuotedMessage = async () => {
	if (!m.quoted.id) return false
		let q = await store.loadMessage(m.chat, m.quoted.id, conn)
  return exports.smsg(conn, q, store)
   }
};

m.serializeM = (v) => exports.smsg(conn, v, store)
m.download = (filename) => downloadMediaMessage(m, filename)
m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
m.react = (emoji) => conn.sendMessage(m.chat, {react: { text: emoji, key: m.key }})

m.createJpg = async(thumb, length1, length2) => {
           return new Promise(async(resolve, reject) => {
        var buffer = await require('jimp').read(thumb);
        var FotoJpg = await buffer.resize(length1, length2).getBufferAsync(require('jimp').MIME_JPEG)
        resolve(FotoJpg)
       })
     }
     
conn.reply = async(text, jid, options) => {
await conn.sendPresenceUpdate('recording', m.chat) 
await conn.sendMessage(jid ? jid : m.chat, {
       text: text,
         mentions: parseMention(text),
         ...options
      }, {
         quoted: m
      })
   }
};

            /*      MSG       */
m.reply = (teks = "HadesBot-MD", id = m.chat, mention = [m.sender], _quoted = m) => conn.sendMessage(id, {text: teks, mentions: mention}, {quoted: _quoted})

// Favor de no cambiar nada aquí gracias.
m.katalog = (teks, id = m.chat) => {
res = generateWAMessageFromContent(m.chat, { orderMessage: { orderId: "808966887130345", thumbnail: require('fs').readFileSync('./media/loli.jpg'), itemCount: 1, status: "INQUIRY", surface: "CATALOG", message: teks, orderTitle: "i am not programer", sellerJid: "5212213261679@s.whatsapp.net", token: "AR5OWjGKMCNmBcaa+k/6VuyXxbU5+31H6DZdC4X3t7VYww==", totalAmount1000: "66666666000", totalCurrencyCode: "MXN", contextInfo: { mentionedJid: parseMention(teks) } }}, {quoted: m})
conn.relayMessage(id, res.message, {})
}

m.livelog = (teks, id = m.chat) => {
res = generateWAMessageFromContent(m.chat, { liveLocationMessage: { degreesLatitude: 0, degreesLongitude: 0, caption: teks, sequenceNumber: "0", contextInfo: { mentionedJid: parseMention(teks) } }}, {quoted: m})
conn.relayMessage(id, res.message, {})
}

m.payment = (teks, id = m.chat) => {
conn.relayMessage(id, { sendPaymentMessage:{ noteMessage: { extendedTextMessage: { text: teks, contextinfo: { mentionedJid: parseMention(teks) }}}}}, {})
}

m.requestpay = (teks, id = m.chat) => {
conn.relayMessage(id, { requestPaymentMessage: { currencyCodeIso4217: "MXN", amount1000: 80000, requestFrom: m.sender, noteMessage: { extendedTextMessage: { text: teks }}, amount: { value: 80000, offset: 1000, currencyCode: "MXN" }}}, {})
}

return m
}

//Export
exports.downloadMediaMessage = downloadMediaMessage
exports.downloadMedia = downloadMedia

//Auto Update
fss = require('fs')
let file = require.resolve(__filename)
fss.watchFile(file, () => {
fss.unwatchFile(file)
console.log(require('chalk').white(`\n${__filename}:\nFue actualizado con exito [ ✓ ]`))
delete require.cache[file]
require(file)
})