const fs = require('fs')
const level = JSON.parse(fs.readFileSync('./database/user/nivel.json'))
const { Json } = require('../lib/functions')

    
           /*       FUNCTION LEVELING       */
           
          const getLevelingXp = (user) => {
let position = false
   Object.keys(level).forEach((i) => {
  if (level[i].id === user) {
          position = i
       }
    })
          if (position !== false) {
                return level[position].xp
      }
}

           const getLevelingLevel = (user) => {
                    let position = false
                                 Object.keys(level).forEach((i) => {
                 if (level[i].id === user) {
                         position = i
                  }
              })
                       if (position !== false) {
          return level[position].level
       }
             }

           const addLevelingXp = (user, amount) => {
              let position = false
                        Object.keys(level).forEach((i) => {
           if (level[i].id === user) {
                               position = i
                  }
              })
                       if (position !== false) {
            level[position].xp += amount
         fs.writeFileSync('./database/user/nivel.json', Json(level))
         }
     }

         const quitarXp = (user, amount) => {
       let position = false
                   Object.keys(level).forEach((i) => {
                              if (level[i].id === user) {
                     position = i
                  }
              })
                  if (position !== false) {
       level[position].xp -= amount
                fs.writeFileSync('./database/user/nivel.json', Json(level))
            }
         }

         const addLevelingLevel = (user, amount) => {
                         let position = false
            Object.keys(level).forEach((i) => {
                     if (level[i].id === user) {
             position = i
                    }
                })
          if (position !== false) {
              level[position].level += amount
                   fs.writeFileSync('./database/user/nivel.json', Json(level))
                }
          }

                    const addLevelingId = (user) => {
                      let position = false;
                     Object.keys(level).forEach((i) => {
                          if (level[i].id === user) {
                   position = true
                  }
             })
                 if (position === false) {
               level.push({ id: user, xp: 1, level: 1 })
              fs.writeFileSync('./database/user/nivel.json', Json(level))
                       }
                  }
                  

module.exports = {
    getLevelingXp,
    getLevelingLevel,
    addLevelingXp,
    quitarXp,
    addLevelingLevel,
    addLevelingId,
    level
}