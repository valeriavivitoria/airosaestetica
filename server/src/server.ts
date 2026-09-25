import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { router } from './routes/routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()
const port = Number(process.env.PORT || 3333)
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({ origin: frontendUrl }))
app.use(express.json({ limit: '100kb' }))
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false }))
app.use(['/api/contact', '/api/appointments'], rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false }))
app.use('/api', router)
app.use((_request, response) => response.status(404).json({ error: 'Rota não encontrada.' }))
app.use(errorHandler)

app.listen(port, () => console.log(`AIROSA API listening on port ${port}`))
