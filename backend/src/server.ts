import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'
import { corsConfig } from './config/cors'

dotenv.config()

connectDB()

const app = express()

// permitir las conexiones de CORS
app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))

// Habilitar lectura de archivos JSON (req.body)
app.use(express.json())

// Routes
app.use('/api/projects', projectRoutes)


export default app