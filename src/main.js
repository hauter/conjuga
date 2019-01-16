
import express from 'express'
import handler from './handler'
import morgan from 'morgan'

async function main() {
    const app = express()
    app.use(morgan('combined'))
    
    app.route('/words/:verb').get(handler.checkVerb)

    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}


main()