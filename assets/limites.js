const fs = require('fs')
const limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const { Json } = require('../lib/functions')

 
      /*       FUNCTION LIMITES       */
      
      const buyLimit = (user, amount) => {
               let position = false
       Object.keys(limit).forEach((i) => {
         if (limit[i].id === user) {
               position = i
            }
        })
     if (position !== false) {
        limit[position].limit -= amount
   fs.writeFileSync('./database/user/limit.json', Json(limit))
    }
  }

         const addLimit = (user) => {
              let position = false
        Object.keys(limit).forEach((i) => {
                      if (limit[i].id == user) {
      position = i
        }
    })
       if (position !== false) {
    limit[position].limit += 1
  fs.writeFileSync('./database/user/limit.json', Json(limit))
    }
  }

   const removeLimit = (user, num) => {
     let position = false
                  Object.keys(limit).forEach((i) => {
         if (limit[i].id == user) {
                           position = i
          }
      })
          if (position !== false) {
                 limit[position].limit += num
       fs.writeFileSync('./database/user/limit.json', Json(limit))
      }
   }

        const getLimit = (user) => {
                     let position = false
                   Object.keys(limit).forEach((i) => {
          if (limit[i].id === user) {
       position = i
         }
      })
             if (position !== false) {
    return limit[position].limit
       }
    }
    

module.exports = {
     buyLimit,
     addLimit,
     removeLimit,
     getLimit,
     limit
}