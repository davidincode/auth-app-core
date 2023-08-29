import express from 'express'
import 'module-alias/register'
import 'express-async-errors'

import cookieParser from 'cookie-parser'

import cors from 'cors'
import morgan from 'morgan'

import appRouter from './router'
import globalErrorHandler from './middleware/globalErrorHandler'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api', appRouter)
app.use('*', globalErrorHandler)

export default app
