import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index.js'


const app = express()
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credientials: true
}));
app.use('/api', routes)

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to mongodb');
  app.listen(port, () => {
      console.log(`Serveur listening at http://localhost:${port}`)
  })
})
.catch(() => {
  console.log('Failed to connect to mongodb');
})
