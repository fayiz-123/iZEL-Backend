import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'


//routes importing

import userRoutes from './routes/userRoute.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hai From iZel Studio')
})

app.use('/user',userRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})