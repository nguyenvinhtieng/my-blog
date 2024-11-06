import express, { Request, Response } from 'express'
import { json } from 'body-parser'
import { MODE, PORT } from '@/configs/env'
import { RUNTIME_MODE } from '@/constants/CommonConstant'

const app = express()
app.use(json())

app.get('/', (_: Request, res: Response) => {
  res.json({
    mode: MODE,
    runtimeMode: RUNTIME_MODE
  })
})

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
