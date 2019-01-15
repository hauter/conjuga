
import conjugaMe from './conjuga'
import dao from './dao'
import mongoClient from './mongo_client'
import express from 'express'

const main = async () => {
    try {
        // const word = await conjugaMe('ir')
        // await dao.insertWord(word)

        const app = express()
        app.get('/', (req, res) => {
            res.send('hello world')
        })

        app.listen(3000)

    } catch (e) {
        console.log("===> ", e)
    }
}


main()