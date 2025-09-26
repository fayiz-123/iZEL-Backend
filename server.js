import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


//routes importing

import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import adminRoute from './routes/adminRoute.js'
import subScriptionRoute from './routes/subscriptionRoute.js'
import notificationRoute from './routes/notificationRoute.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // or React dev server port
    credentials: true,
  })
);

app.get('/health', (req,res) => {
    res.send('Server is Healthy')
})

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/admin',adminRoute)
app.use('/subscription',subScriptionRoute)
app.use('/notification',notificationRoute)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
