import express from 'express'
import mongoose from 'mongoose'
import itemsRoute from './routes/ItemsRoute.js'
import userRoute from './routes/userRoute.js'
import billRoute from './routes/billRoute.js'
import auth from './middleware/auth.js'
import connectToDB from './dbConnect.js'
import path from 'path'
import cors from 'cors'
connectToDB()
const app =express()
// mongoose.connect('mongodb://localhost:27017/marketFresh-POS').then(()=>{
//     console.log('connected to the database successfully')
// }).catch(()=>{
//     console.log('unable to connect')
// })
app.use(cors())
app.use(express.json())
app.use('/api/marketFresh',itemsRoute)
app.use('/api/marketFresh',userRoute)
app.use('/api/marketFresh',billRoute)
const port=process.env.PORT ||3000
app.listen(port,()=>console.log('app is listening on port 3000'))
