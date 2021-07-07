import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import cors from 'cors'
import api from './routes/api.js'
import path from 'path'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', api)
//-----------------------------------------------------------------------
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))
// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})
//-----------------------------------------------------------------------
const { DB_USER, DB_PASSWORD, DB_URL, DB_NAME, PORT } = process.env

const initDB = async () => {
  mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: DB_NAME,
    }
  )

  mongoose.connection
    .once('open', () => {
      console.info('Connected to MongoDB')
    })
    .on('error', (error) => {
      console.error('MongoDB connection error: ', error)
    })
}

initDB()

app.use((err, req, res, next) => {
  res.status(500).json({ message: err })
})

// csrf
const csrfProtection = csrf({
  cookie: true,
})
app.use(csrfProtection)

app.listen(PORT, () => {
  console.info(`Server listening on localhost:${PORT}`)
})