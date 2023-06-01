import fastify from 'fastify'
import { memoreisRoutes } from './routes/memories'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import 'dotenv/config'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

/* Declarando FastFy */
const app = fastify()
app.register(multipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(cors, {
  origin: true, // todas as urls de front pode ac essar o back
})

app.register(jwt, {
  secret: 'spacetime', // tokens gerados pelo backend -- assinatura
})
/* --------------------------------- */

app.register(memoreisRoutes)
app.register(authRoutes)
app.register(uploadRoutes)
/* --------------------------------- */
app
  .listen({
    port: 3333,
    host: '192.168.0.7',
  })
  .then(() => {
    console.log('Serve on na porta 3333')
  })
