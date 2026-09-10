import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'

dotenv.config()

connectDB()

const app = express()

// Habilitar lectura de archivos JSON (req.body)
app.use(express.json())

// Routes
app.use('/api/projects', projectRoutes)


export default app