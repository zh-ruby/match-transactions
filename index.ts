import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import api from './api'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
