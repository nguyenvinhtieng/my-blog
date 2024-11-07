import express from 'express'
import { json } from 'body-parser'
import { PORT } from '@/configs/env.config'
import { connectToDatabase } from '@/configs/mongodb.config'
import logger from '@/utils/logger'
import routes from '@/routes'

const app = express()

// Middlewares for parsing JSON
app.use(json())

// Connect to MongoDB
connectToDatabase()

// Routes
app.use('/api', routes)

// Start server
app.listen(PORT, async () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
