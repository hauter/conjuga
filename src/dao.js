import conjugaMe from './conjuga'
import mongoClient from './mongo_client'

async function insertConjuga(conjugaObj) {
    const db = await mongoClient.getDb()
    const conjugaColl = db.collection("conjuga")

    conjugaObj._id = conjugaObj.verbo
    conjugaColl.insertOne(conjugaObj)
}

async function checkConjuga(verbo) {
    const db = await mongoClient.getDb()
    const conjugaColl = db.collection("conjuga")

    return await conjugaColl.findOne({
        _id: verbo
    })
}



export default {
    insertConjuga, 
    checkConjuga
}