const { sleep } = require('./functions.js')
const TimerSet = new Set()

exports.isFiltered = (from) => !!TimerSet.has(from)

exports.addFilter = async(from) => {
    TimerSet.add(from)
    await sleep(2000) //Tiempo de espera para eliminar el id del grupo :v
    TimerSet.delete(from)
}