import conjuga from './conjuga'
import dao from './dao'

/**
 * check a word
 * @param {*} req 
 * @param {*} res 
 */
async function checkWord(req, res) {
    try {
        if (req.params.word === undefined) {
            res.status(400).send({
                message: "word not found!"
            })
        }
    
    
        const result = await conjuga(req.params.word)
        res.send(result)
    } catch (e) {
        res.status(500).send({message: "Internal Server Error!"})
    }
}


export default {
    checkWord
}