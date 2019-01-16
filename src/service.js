import conjuga from './conjuga'
import dao from './dao'


/**
 * To check a word, this will query mongoDb, if not exists, will carwl from the internet
 * @param {the portuguese verb needs to check} verbo 
 */
async function checkConjuga(verbo) {
    let conjugaObj = await dao.checkConjuga(verbo)

    // Doesn't exist in mongoDB
    if (conjugaObj == null) {
        conjugaObj = await conjuga(verbo)
        dao.insertConjuga(conjugaObj)
    }

    return conjugaObj
}

export {
    checkConjuga
}