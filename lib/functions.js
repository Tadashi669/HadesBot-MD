const fetch = require('node-fetch')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const FileType = require('file-type');

exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

exports.uploadImages = (buffData) => {
  return new Promise(async (resolve, reject) => {
      const { ext } = await FileType.fromBuffer(buffData)
      const filePath = './' + ext
      fs.writeFile(filePath, buffData, {encoding: 'base64'}, (err) => {
          if (err) return reject(err)
          console.log('Subiendo imagen/video al servidor Telegra.ph...')
          const fileData = fs.readFileSync(filePath)
          const form = new FormData()
          form.append('file', fileData, 'tmp.' + ext)
          fetch('https://telegra.ph/upload', {method: 'POST', body: form}).then(res => res.json()).then(res => {
            if (res.error) return reject(res.error)
            resolve('https://telegra.ph' + res[0].src)
          }).then(() => fs.unlinkSync(filePath)).catch(err => reject(err))
      })
  })
}

exports.getBuffer = async(url, options) => {
	try {
		options ? options : {};
		const res = await axios({
		    method: "get", url,
			headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1},
			...options, responseType: 'arraybuffer'})
		   return res.data;
	       } catch (e) {
		   console.log(e)
}}

exports.getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.formatNumber = (integer) => {
    let numb = parseInt(integer)
    return Number(numb).toLocaleString().replace(/,/g, '.')
   }


exports.h2k = (number) => {
    var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}

exports.niceBytes = (x) => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    if (x == 0) return '0 bytes';
    let l = 0, n = parseInt(x, 10) || 0
    while(n >= 1024 && ++l) {
        n = n/1024;
    }
    // incluya un punto decimal y un dígito de décimas si presenta
    // menos de diez de KB o unidades mayores
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

exports.Json = (string) => {
    return JSON.stringify(string, null, 2)
    
}
exports.JsonFile = (file) => {
    return JSON.parse(fs.readFileSync(file))
}

exports.create = (numers, type) =>{
	return new Date(Number(numers) * 1000).toLocaleString(type ? type : 'es', {
	year: "numeric",
	month: "short",
	weekday: 'short',
    day: "numeric"
	})
  }