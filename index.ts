import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'

import api from './api'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.get('/', (_req, res) => {
  res.render('index')
})

app.use('/api', api)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
