const fs = require('fs')
const balance = JSON.parse(fs.readFileSync('./database/user/balance.json'))
const { Json } = require('../lib/functions')


  /*       FUNCTION BALANCE       */
  
    const addBalance = (user) => {
let position = false
  Object.keys(balance).forEach((i) => {
     if (balance[i].id === user) {
   position = true
    }
  })
        if (position === false) {
   balance.push({ id: user, balance: 10000 })
 fs.writeFileSync('./database/user/balance.json', Json(balance))
    }
}
  
   const addBal = (user, amount) => {
       let position = false
    Object.keys(balance).forEach((i) => {
 if (balance[i].id === user) {
position = i
      }
   })
 if (position !== false) {
   balance[position].balance += amount
     fs.writeFileSync('./database/user/balance.json', Json(balance))
  }
}

            const checkBal = (user) => {
                    let position = false
              Object.keys(balance).forEach((i) => {
          if (balance[i].id === user) {
                  position = i
                }
             })
                if (position !== false) {
          return balance[position].balance
           }
         }
         
                     const removeBal = (user, amount) => {
                           let position = false
                   Object.keys(balance).forEach((i) => {
              if (balance[i].id === user) {
            position = i
          }
       })
            if (position !== false) {
                   balance[position].balance -= amount
               fs.writeFileSync('./database/user/balance.json', Json(balance))
             }
           }


module.exports = {
    addBalance,
    addBal,
    checkBal,
    removeBal,
    balance
}