import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import appRouter from './router'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', appRouter)

export default app
