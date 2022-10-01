const fs = require('fs')
const gaming = JSON.parse(fs.readFileSync('./database/user/rpg.json'))
const { Json } = require('../lib/functions')


     /*       FUNCTION RPG       */
     
  const addRpgUser = (user) => {
        let position = false
            Object.keys(gaming).forEach((i) => {
                 if (gaming[i].id === user) {
             position = true
                      }
                   })
                  if (position === false) {
                     gaming.push({
                      id: user, 
                      mineria: {
                        oro: 0,
                        hierro: 0,
                        gemas: 0,
                        diamante: 0
                       },
                        frutos: {
                         piña: 0,
                         sandia: 0,
                         melon: 0,
                         manzana: 0
                        },
                         pescaderia: {
                          pez: 0,
                          pez_tropical: 0
                          },
                       arbol: {
                         madera: 0
                        }
                        })
                    fs.writeFileSync('./database/user/rpg.json', Json(gaming))
            }
       }
       

module.exports = {
    addRpgUser,
    gaming
}
