import {MongoClient} from 'mongodb'
import config from './config'


class ClientInstance {
    close = async () => {
        await this.client.close()
    }

    getDb = async () => {
        if (this.client == undefined) {
            console.log("connect to mongo")
            this.client = await MongoClient.connect(config.mongo.url, {useNewUrlParser: true})
            console.log("[success] connect to mongo")
        }
        
        return this.client.db(config.db)
    }
}


export default new ClientInstance()