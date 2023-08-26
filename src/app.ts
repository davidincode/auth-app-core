import express from 'express'
import 'express-async-errors'

import cors from 'cors'
import morgan from 'morgan'

import appRouter from './router'
import globalErrorHandler from './middleware/globalErrorHandler'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', appRouter)
app.use('*', globalErrorHandler)

export default app
