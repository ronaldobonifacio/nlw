import { randomUUID } from 'crypto'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'fs'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })
    if (!upload) {
      return reply.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply.status(400).send()
    }
    const fileID = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileID.concat(extension)
    console.log(upload.filename)

    const witreStream = createWriteStream(
      resolve(__dirname, '../../uploads', fileName),
    )
    await pump(upload.file, witreStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })
}
