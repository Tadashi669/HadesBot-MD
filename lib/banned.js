//El archivo original es de NyanBot

const fs = require('fs')
const toMs = require('ms')

 const addBan = (userId, _data) => {
    const obj = {
        id: userId,
        expired: "PERMANENT"
    }
    _data.push(obj)
    fs.writeFileSync('./database/Json/ban.json', JSON.stringify(_data))
}


 const unBan = (userId, _data) => {
    let position = null
    Object.keys(_data).forEach((i) => {
        if (_data[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _data.splice(position, 1)
        fs.writeFileSync('./database/Json/ban.json', JSON.stringify(_data))
    }
    return true
}


 const cekBannedUser = (userId, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true
        }
    })
    return status
}

module.exports = {
    addBan,
    unBan,
    cekBannedUser
}
