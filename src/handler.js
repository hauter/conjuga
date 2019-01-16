import {checkConjuga} from './service'

/**
 * Http handler for checking a verb
 * @param {*} req 
 * @param {*} res 
 */
async function checkVerb(req, res) {
    try {
        if (req.params.verb === undefined) {
            res.status(400).send({
                message: "verb not found!"
            })
            return
        }
    
        const conjugaObj = await checkConjuga(req.params.verb)
        res.status(200).send(conjugaObj)
    } catch (e) {
        console.error('checkVerb error', e)
        res.status(500).send({message: "Check word fail!"})
    }
}


export default {
    checkVerb
}