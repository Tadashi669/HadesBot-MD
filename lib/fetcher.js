const fetch = require('node-fetch')
const fs = require('fs')
const WebP = require('node-webpmux')
const { spawn } = require("child_process")
const { getRandom } = require('./functions')

exports.fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options).then(response => response.json()).then(json => {
            console.log(json)
            resolve(json)
            }).catch((e) => reject(new Error(String(e))))
       })

exports.getJson = async(url) => {
    try {
        const res = await fetch(url, {
        headers: {'User-Agent': 'okhttp/4.5.0'},
        method: 'GET'})
        return res.json()
        } catch (e) {
        throw e
     }}

exports.kyun = (seconds) =>{
    if (seconds === '0') return '0000'
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);
    return `${pad(hours)}Horas - ${pad(minutes)}Minutos -  ${pad(seconds)}Segundos`
}
exports.createExif = (pack, auth) =>{
    const code = [0x00,0x00,0x16,0x00,0x00,0x00]
    const exif = {
        "sticker-pack-id": "com.client.tech",
        "sticker-pack-name": pack,
        "sticker-pack-publisher": auth,
        "android-app-store-link": "https://play.google.com/store/apps/details?id=com.snowcorp.stickerly.android",
        "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857"
}
    let len = JSON.stringify(exif).length
    if (len > 256) {
        len = len - 256
        code.unshift(0x01)
    } else {
        code.unshift(0x00)
    }
    if (len < 16) {
        len = len.toString(16)
        len = "0" + len
    } else {
        len = len.toString(16)
    }
    const _ = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
    const __ = Buffer.from(len, "hex")
    const ___ = Buffer.from(code)
    const ____ = Buffer.from(JSON.stringify(exif))
    fs.writeFileSync('./lib/src/data.exif', Buffer.concat([_, __, ___, ____]), function (err) {
        console.log(err)
        if (err) return console.error(err)
        return `./lib/src/data.exif`
    })

}
exports.modStick = async(media, client, mek, from) => {
    out = getRandom('.webp')
    try {
      console.log(media)
     spawn('webpmux', ['-set','exif', './lib/src/data.exif', media, '-o', out]).on('exit', () => {
     client.sendMessage(from, {sticker: fs.readFileSync(out)}, {quoted: mek})
     fs.unlinkSync(out)
     fs.unlinkSync(media)
    })
    } catch (e) {
        console.log(e)
        fs.unlinkSync(media)
    }
}
exports.writeExif = async(media, metadata) => {
    Webp = getRandom('.webp')
    return new Promise(async(resolve, reject) => {
        let img = new WebP.Image()
        var json = {
            'sticker-pack-id': 'https://play.google.com/store/apps/details?id=com.snowcorp.stickerly.android',
            'sticker-pack-name': metadata ? metadata.packname : 'Hades Bot - MD\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
            'sticker-pack-publisher': metadata ? metadata.author : '',
            'emojis': ['']
        }
        var exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        var jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8')
        var exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(media)
        img.exif = exif
        await img.save(Webp)
        resolve(fs.readFileSync(Webp))
        await fs.unlinkSync(Webp)
    })
}
