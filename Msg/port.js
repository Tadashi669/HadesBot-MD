exports.wait = "*• Espere um momento . . .*"
exports.error = "_*[ ! ]* Um erro ocorreu_"
exports.st = "Rotule um adesivo!"
exports.spam = (sender) => {
return `_*[ ! ]* Please @${sender.split`@`[0]} Aguarde 2 segundos para usar outros comandos novamente_`
}
exports.txt2 = (prefix, command) =>{
return `*• Exemplo:*\n\n${prefixo + comando} <text1>|<text2>`
}
exports.getbal = (user, formatNumber, checkDinero) => {
return "Atualmente o saldo de: @" + user.split`@`[0] + " es: *[ $" + formatNumber(checkDinero(user)) + " ]*"
}
exports.ownerB = "_*• Este comando só pode ser usado pelo dono do bot!*_"
exports.group = "_*• Este comando só pode ser usado em grupos*_"
exports.benned = "_*• Você é um usuário banido, não pode usar o bot*_"
exports.admin = "_*• Este comando só pode ser usado por administradores.*_"
exports.Botadmin = "_*• Antes de tudo eu tenho que ser admin CHTMD.*_"
exports.active = "*• ja foi ativado!*"
exports.active2 = "*• ativado com sucesso [ ✓ ]*"
exports.desative = "*• desativado com sucesso [ ✓ ]*"
exports.ment = '*• Marcar a mensagem de alguém ou mencioná-la!*'
exports.y = "*• aqui vai, espero que goste [ ✓ ]*"
exports.txt = "*• e o texto?*"
exports.result = "_• Nenhum resultado foi encontrado!!_"
exports.logos = "*• E o texto para criar o logotipo onde está?*"
exports.limit = "*_[ ! ] você atingiu seu limite de comando. [ ! ]_*\n\n_Para ter mais limites, suba de nível_"
exports.waitlimit = "*• Espere um minuto. . .*\n1 Limite aplicado"
exports.vid = "*• e o nome do vídeo?*"
exports.music = "*• e o nome da musica?*"
exports.busq = "Por favor, não procure por coisas que infrinjam minhas regras."
exports.title = (prefix, command) => {
return`• Digite o nome ou título do que você deseja pesquisar.\n\n*Exemplo:* ${prefix + command} Goku`
}
exports.link = (prefix, command) =>{
return `*• Ejemplo:*\n\n${prefix+command} <Link>`
}
exports.peso = "_• O arquivo é maior que *100 MB*, não consigo enviar!!_"
exports.file = "_• Já existe um arquivo salvo com este nome!_"
exports.save = "_• O arquivo foi salvo no banco de dados com sucesso! [ ✓ ]_"
exports.delfile = "_• O arquivo foi removido com sucesso do banco de dados! [ ✓ ]_"
exports.play = (q, res, i, formatNumber) => {
return`*▢ Pesquisa de:* ${q}

- *Title:* ${res.title ? res.title : '-'}
- *Publicados:* ${i.text ? i.text : '-'}
- *Servidor:* y2mate
- *Visualizações:* ${formatNumber(res.views ? res.views : '-')}
- *Duração:* ${res.timestamp ? res.timestamp  : '-'}
- *Canal:* ${res.author.name ? res.author.name : '-'}`
}
exports.play2 = (res, res1) => {
return`*💎 Títle:* ${res.title}
*💎 id:* ${res.id}
*💎 Qualidade:* ${res.quality}
*💎 Tamanho:* ${res.size_mp3}
*💎 Duração:* ${res1.all[0].timestamp}`
}
exports.playvid = (media, isUrl, q) => {
return`- *Title:* ${media.title}
- *Tamanho:* ${media.filesizeF}
- *link:* ${isUrl(q)}`
}



var fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(require('chalk').white(`\n${__filename}:\nFue actualizado con exito [ ✓ ]`))
delete require.cache[file]
require(file)
})