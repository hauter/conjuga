
import express from 'express'
import handler from './handler'

async function main() {
    const app = express()
    
    app.route('/words/:word').get(handler.checkWord)

    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}


main()