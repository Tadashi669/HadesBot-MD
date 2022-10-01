exports.wait = "*• Esperɑ un momento . . .*"
exports.error = "*[ ! ] Ocurrió un error*"
exports.st = "Etiqueta un sticker!"
exports.spam = (sender) => {
return `_*[ ! ]* Porfavor @${sender.split`@`[0]} Espere 2 segundos para volver a usar otros comandos_`
}
exports.txt2 = (prefix, command) =>{
return `*• Ejemplo de usó:*\n\n${prefix + command} <texto1>|<texto2>`
}
exports.getbal = (user, formatNumber, checkDinero) => {
return "Actualmente el balance de: @" + user.split`@`[0] + " es: *[ $" + formatNumber(checkDinero(user)) + " ]*"
}
exports.ownerB = "• Este comando solo puede ser utilizado por el dueñor del bot!"
exports.group = "• Este comando solo puede ser utilizado en grupos"
exports.benned = "• Eres un usuario baneado, no puedes hacer usó de el bot"
exports.admin = "• Este comando solo puede ser utilizado por los administradores."
exports.Botadmin = "• Primero que nada tengo que ser admin CHTMD."
exports.premium = "• Este comando solo puede ser utilizado por usuarios premium!"
exports.active = "*• Ya estaba activado!*"
exports.active2 = "*• Activado con éxito [ ✓ ]*"
exports.desative = "*• Desactivado con éxito [ ✓ ]*"
exports.ment = '• Etiqueta un mensaje de alguien o mencionalo!'
exports.intent = "Que intentas hacer?"
exports.y = "*• aquí tienes, espero te guste [ ✓ ]*"
exports.txt = "*• Y el texto?*"
exports.result = "• No se encontró ningún resultado!!"
exports.logos = "*• Y el texto para crear el logo donde esta?*"
exports.busq = "Por favor no busques cosas que infringen mis reglas."
exports.limit = (prefix) => {
return `[ ! ] has alcanzado tu límite de comandos.\n\nPara poder tener mas límites suba de nivel\nO puedes comprar con el comando:\n${prefix}comprar limites <cantidad>`
}
exports.waitlimit = "*• Esperɑ un momento . . .*\n1 Limite aplicado"
exports.vid = "*• Y el nombre del vídeo?*"
exports.music = "*• Y el nombre de la música?*"
exports.title = (prefix, command) => {
return `• Ingresá el nombre o titulo de lo que deseas buscar.\n\n*Ejemplo:* ${prefix + command} Goku`
}
exports.link = (prefix, command, q) =>{
return `*• Ejemplo de usó:*\n\n${prefix+command} <Link>`
}
exports.peso = "• El archivo pesa más de *100 MB*, no lo puedo enviar!!"
exports.file = "_• Ya existe un archivo guardado con éste nombre!_"
exports.save = "_• El archivo fue guardado en la base de datos con éxito! [ ✓ ]_"
exports.delfile = "_• El archivo fue eliminado correctamente de la base de datos! [ ✓ ]_"
exports.play = (q, res, i, formatNumber) => {
return`*▢ Busqueda de:* ${q}

- *Titulo:* ${res.title ? res.title : '-'}
- *Publicado:* ${i.text ? i.text : '-'}
- *Servidor:* y2mate
- *Vistas:* ${formatNumber(res.views ? res.views : '-')}
- *Duracion:* ${res.timestamp ? res.timestamp  : '-'}
- *Canal:* ${res.author.name ? res.author.name : '-'}`
}
exports.play2 = (res, res1) => {
return`*💎 Título:* ${res.title}
*💎 ID:* ${res.id}
*💎 Calidad:* ${res.quality}
*💎 Tamaño:* ${res.size_mp3}
*💎 Duracion:* ${res1.all[0].timestamp}`
}
exports.playvid = (media, isUrl, q) => {
return`- *Titulo:* ${media.title}
- *Tamaño:* ${media.filesizeF}
- *Link:* ${isUrl(q)}`
}



var fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(require('chalk').white(`\n${__filename}:\nFue actualizado con exito [ ✓ ]`))
delete require.cache[file]
require(file)
})