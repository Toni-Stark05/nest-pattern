import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import * as path from 'path'

import { ConfigModule } from '@nestjs/config'
import appConfig from './config/app.config'

function createEnvPath() {
  let envFilePath = path.resolve(__dirname, '../environment/')

  switch (process.env.NODE_ENV) {
    case 'production':
      envFilePath += `/.env.production`
      break
    case 'local':
      envFilePath += `/.env.local`
      break
    default:
      envFilePath += `/.env.development`
      break
  }

  return envFilePath
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: createEnvPath(),
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
