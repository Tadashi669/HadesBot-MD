const fs = require('fs')
const warn = JSON.parse(fs.readFileSync('./database/user/adv.json'))
const { Json } = require('../lib/functions')



  const addAdvUser = (user) => {
       let position = false
                   Object.keys(warn).forEach((i) => {
              if (warn[i].id === user) {
           position = true
                }
             }
         )
           if (position === false) {
                 warn.push({ id: user, warning: 0 })
          fs.writeFileSync('./database/user/adv.json', Json(warn))
  }
}

         const addAdv = (user) => {
     let position = false
           Object.keys(warn).forEach((i) => {
     if (warn[i].id == user) {
          position = i
        }
   })
          if (position !== false) {
      warn[position].warning += 1
        fs.writeFileSync('./database/user/adv.json', Json(warn))
    }
}

      const getAdv = (user) => {
    let position = false
  Object.keys(warn).forEach((i) => {
           if (warn[i].id === user) {
    position = i
           }
      })
      if (position !== false) {
    return warn[position].warning
        }
  }


module.exports = {
    addAdvUser,
    addAdv,
    getAdv,
    warn
}
    