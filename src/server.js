import express from 'express'
import mongoose from 'mongoose'

import routes from './routes/index.js'

const app = express()
const port = 3001

app.use(express.json())
app.use('/api', routes)

mongoose.connect('mongodb+srv://peltierblanche:Rnpbxko6PJO4Kk8T@cluster0.0ozwdke.mongodb.net/')
.then(() => {
  console.log('Connected to mongodb');
  app.listen(port, () => {
      console.log(`Serveur listening at http://localhost:${port}`)
  })
})
.catch(() => {
  console.log('Failed to connect to mongodb');
})
