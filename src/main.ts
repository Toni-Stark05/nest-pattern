import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function start() {
  const PORT = process.env.PORT || 3001
  const PROCESS = process.pid
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT, () => {
    console.log('\x1b[32m', `[APP] ${PROCESS} -`, `App working from port`, '\x1b[33m', `${PORT}!`)
  })
}
start()
