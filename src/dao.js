import conjugaMe from './conjuga'
import mongoClient from './mongo_client'

const insertWord = async (conjugaObj) => {
    const db = await mongoClient.getDb()
    const wordsColl = db.collection("words")

    wordsColl.insertOne(conjugaObj)
}

export default {
    insertWord
}