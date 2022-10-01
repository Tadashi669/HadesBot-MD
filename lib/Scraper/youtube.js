const ytdl = require('ytdl-core');
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

//Kevin
const formatBytes = (bytes, decimals = 2) => {
    if (bytes == 0) {
        return '0 Bytes'
    }
    let k = 1024
    let dm = decimals < 0 ? 0 : decimals
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const youtube = async(link) => {
    let nameMp4 = `${Math.floor(Math.random() * 2500)}.mp4`
    let nameMp3 = `${Math.floor(Math.random() * 2500)}.mp3`
    return new Promise((resolve, reject) => {
        ytdl.getInfo(link).then(async(result) => {
        let dl = ytdl(link)
        let wS = fs.createWriteStream(nameMp4)
        dl.pipe(wS)
        dl.on('end', function() {
            let mp4 = fs.readFileSync(nameMp4)
            exec(`ffmpeg -i ${nameMp4} ${nameMp3}`, (err) => {
                if (!err) {
                    let mp3 = fs.readFileSync(nameMp3)
                    resolve({
                        titulo: result.videoDetails.title,
                        descripcion: result.videoDetails.description,
                        vistas: result.videoDetails.viewCount,
                        likes: result.videoDetails.likes,
                        dislike: result.videoDetails.dislikes,
                        canal: result.videoDetails.ownerChannelName,
                        canal_url: result.videoDetails.ownerProfileUrl,
                        publicado: result.videoDetails.uploadDate,
                        categoria: result.videoDetails.category,
                        tags: result.videoDetails.keywords,
                        calidad: '480p',
                        audio: '128kbps',
                        duracion: result.videoDetails.lengthSeconds,
                        imagen: result.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url,
                        mp3: {
                            buffer: mp3,
                            tamaño: formatBytes(mp3.length),
                            output: result.videoDetails.title+'.mp3'
                        },
                        mp4: {
                            buffer: mp4,
                            tamaño: formatBytes(mp4.length),
                            output: result.videoDetails.title+'.mp4'
                        }
                    })
                    fs.unlinkSync(nameMp3)
                    fs.unlinkSync(nameMp4)
                } else {
                    fs.unlinkSync(nameMp4)
                    reject(err)
                    }
                })
            })
        })
    })
}

module.exports = { youtube };