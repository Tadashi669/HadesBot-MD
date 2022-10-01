let Code = String.fromCharCode(8206)
let v = Code.repeat(4001)

exports.menuofc = (isOwner, id, hourTime, week1, calender1, PubliPriv, prefix) => {
return `Hola @${id.split('@')[0]}
*${hourTime}*

*Fecha:* ${week1} ${calender1}

${v}≡ *INFO BOT*
▢ Modo: ${PubliPriv ? '*Público*' : '*Privado*'}
▢ Prefijo: *⌜ ${prefix} ⌟*
▢ Librería: *baileys Multi-Device*
▢ Lenguaje: *Javascript*


≡ *List Menú*
*▢ ${prefix}bug / ${prefix}report*
*▢ ${prefix}menus*
*▢ ${prefix}owner*
*▢ ${prefix}reglas*
*▢ ${prefix}speed*
*▢ ${prefix}react*
*▢ ${prefix}infobot*


≡ *List Descargas*
*▢ ${prefix}play* <búsqueda>
*▢ ${prefix}play2* <búsqueda>
*▢ ${prefix}ytshorts* <link>
*▢ ${prefix}instagram* <link>
*▢ ${prefix}mediafire* <link>
*▢ ${prefix}gitclone* <link>
*▢ ${prefix}asupan*
*▢ ${prefix}tiktok* <link>
*▢ ${prefix}fb* <link>


≡ *List Stickers*
*▢ ${prefix}attp*
*▢ ${prefix}sticker* <mención imagen/video>
*▢ ${prefix}robar* <mención sticker>


≡ *List Creadores*
*▢ ${prefix}toimg* <mencion sticker>
*▢ ${prefix}tomp3* <mención vídeo>
*▢ ${prefix}shortlink* <link>
*▢ ${prefix}tourl*


≡ *List Búsquedas*
*▢ ${prefix}lyrics* <búsqueda>
*▢ ${prefix}ytsearch* <búsqueda>
*▢ ${prefix}yts* <búsqueda>
*▢ ${prefix}shazam* <mención audio>
*▢ ${prefix}githubsearch* <usuario>
*▢ ${prefix}stalkrepos* <usuario de github>
*▢ ${prefix}igstalk* <usuario>
*▢ ${prefix}githubstalk* <usuario>
*▢ ${prefix}google* <búsqueda>
*▢ ${prefix}wallpaper* <búsqueda>
*▢ ${prefix}pinterest* <búsqueda>
*▢ ${prefix}imagen* <búsqueda>
*▢ ${prefix}wp* <búsqueda>


≡ *List Premium's*
*▢ ${prefix}xnxxdl* <url>
*▢ ${prefix}gore*
*▢ ${prefix}join* <link grupo>
*▢ ${prefix}nowa* <número + x>


≡ *List Rpg*
*▢ ${prefix}minar*
*▢ ${prefix}pescar*
*▢ ${prefix}cosechar*
*▢ ${prefix}talar*
*▢ ${prefix}inventario*
*▢ ${prefix}vender* <opción> <cantidad>


≡ *List Grupos*
*▢ ${prefix}tagall* <text>
*▢ ${prefix}agregar* <número>
*▢ ${prefix}kick* <@user>
*▢ ${prefix}kickall* <prefijo>
*▢ ${prefix}grupo*
*▢ ${prefix}linkgp*
*▢ ${prefix}resetlink*
*▢ ${prefix}cerrar*
*▢ ${prefix}abrir*
*▢ ${prefix}listadmins*
*▢ ${prefix}listonline*
*▢ ${prefix}setname* <text>
*▢ ${prefix}setdesc* <text>
*▢ ${prefix}infogp*
*▢ ${prefix}setfotogp* <mención imagen>
*▢ ${prefix}invitar* <número>
*▢ ${prefix}hidetag* <text>
*▢ ${prefix}tag*
*▢ ${prefix}promote* <@user>
*▢ ${prefix}demote* <@user>
*▢ ${prefix}delete* <mención msg bot>

≡ *List Activaciones*
*▢ ${prefix}leveling* <opción>
*▢ ${prefix}ephemeral* <opción>
*▢ ${prefix}nsfw* <opción>
*▢ ${prefix}antilink* <opción>
*▢ ${prefix}autosticker* <opción>
*▢ ${prefix}antilinkmx* <opción>
*▢ ${prefix}welcome* <opción>
*▢ ${prefix}antitravas* <opción>


≡ *List Entretenimiento*
*▢ ${prefix}vor*
*▢ ${prefix}gay* <@user>
*▢ ${prefix}pregunta* <pregunta>
*▢ ${prefix}casino* <apuesta>
*▢ ${prefix}ppt* <piedra>/<papel>/<tijera>
*▢ ${prefix}simsimi* <text>
*▢ ${prefix}top* <número> <text>
*▢ ${prefix}faketext* <@tag>/<txt user>/<txt bot>


≡ *List Tols*
*▢ ${prefix}styletext* <text>
*▢ ${prefix}leermas* <text1>|<text2>
*▢ ${prefix}getsticker* <@user/número>
*▢ ${prefix}getexif* <mención sticker>
*▢ ${prefix}getbalance* <@user/número>
*▢ ${prefix}encode* <text>
*▢ ${prefix}decode* <text encode>
*▢ ${prefix}calcular* <ecuación>
*▢ ${prefix}traducir* <idioma> <text / mención text>
*▢ ${prefix}tts* <idioma> <text>
*▢ ${prefix}ssweb* <link>


≡ *List Economía*
*▢ ${prefix}balance*
*▢ ${prefix}limites*
*▢ ${prefix}perfil*
*▢ ${prefix}comprar* <opción>
*▢ ${prefix}transferir* <cantidad> <@user>
*▢ ${prefix}encuesta* <text>
*▢ ${prefix}topbal*
*▢ ${prefix}topxp*


≡ *List Others*
*▢ ${prefix}emojimix* <emoji1>/<emoji2>
*▢ ${prefix}contar* <text>
*▢ ${prefix}quoted* <mención mensaje>
*▢ ${prefix}grupos*
*▢ ${prefix}readview* <mención viewOnce Mensaje>
*▢ ${prefix}copy* <mención mensaje>


≡ *List Animé*
*▢ ${prefix}megumin*
*▢ ${prefix}pat*
*▢ ${prefix}shinobu*
*▢ ${prefix}bully*
*▢ ${prefix}cuddle*
*▢ ${prefix}cry*
*▢ ${prefix}hug*
*▢ ${prefix}kiss*
*▢ ${prefix}lick*
*▢ ${prefix}smug*
*▢ ${prefix}bonk*
*▢ ${prefix}yeet*
*▢ ${prefix}blush*
*▢ ${prefix}smile*
*▢ ${prefix}wave*
*▢ ${prefix}highfive*
*▢ ${prefix}handhold*
*▢ ${prefix}nom*
*▢ ${prefix}bite*
*▢ ${prefix}glomp*
*▢ ${prefix}slap*
*▢ ${prefix}kill*
*▢ ${prefix}par*
*▢ ${prefix}happy*
*▢ ${prefix}wink*
*▢ ${prefix}poke*
*▢ ${prefix}dance*
*▢ ${prefix}cringe*


≡ *List Owner & Me* (algunas opciones pueden ser usadas por moderadores.)
*▢ ${prefix}getcase* <case>
*▢ ${prefix}addmod* <@user>
*▢ ${prefix}delmod* <@user>
*▢ ${prefix}addpremium* <@user>
*▢ ${prefix}delpremium* <@user>
*▢ ${prefix}ban* <@user>
*▢ ${prefix}unban* <@user>
*▢ ${prefix}lista* <opción>
*▢ ${prefix}block* <@user>/<número>
*▢ ${prefix}unblock* <@user/<número>>
*▢ ${prefix}addbal* <cantidad> <@user>
*▢ ${prefix}delbal* <cantidad> <@user>
*▢ ${prefix}self*
*▢ ${prefix}public*
*▢ ${prefix}setprefix*
*▢ ${prefix}mute*
*▢ ${prefix}unmute*
*▢ ${prefix}leave*
*▢ ${prefix}clonar* <id grupo>
*▢ ${prefix}groups*
*▢ ${prefix}storage*
*▢ ${prefix}save* <mención media>
*▢ ${prefix}getfile* <nombre del archivo>
*▢ ${prefix}delfile* <nombre del archivo>
*▢ ${prefix}bc* <text>
▢ >
▢ $`
}