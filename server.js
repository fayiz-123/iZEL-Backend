import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'


//routes importing

import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hai From iZEL Studio')
})

app.use('/user',userRoute)
app.use('/product',productRoute)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


///When using Cors cookies credentials should be written
///When using Cors cookies credentials should be written
///When using Cors cookies credentials should be written
///When using Cors cookies credentials should be written
///When using Cors cookies credentials should be written
///When using Cors cookies credentials should be written