//require('../../config');
const fs = require('fs')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const Jimp = require('jimp')

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " Dia, " : " dias, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " Hora, " : " horas, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " Minuto, " : " minutos, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " Segundo" : " segundos") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = function(seconds) {
    let h = isNaN(seconds) ? 'No Function' : Math.floor(seconds % (3600 * 24) / 3600)
    let m = isNaN(seconds) ? 'No Function' : Math.floor(seconds % 3600 / 60)
    let s = isNaN(seconds) ? 'No Function' : Math.floor(seconds % 60)
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join('')
}

exports.ToTime = (duration) =>{
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds
  return hours + " Hora(s) " + minutes + " Minuto(s)"
}

exports.isUrl = (url) => {
    return url.match(
    new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')
   )
}

exports.formatp = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.ProfilePicture = async(buffer) => {
	const jimp = await Jimp.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
	img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
	preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
	}
}

     