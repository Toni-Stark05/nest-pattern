import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import * as path from 'path'

import { ConfigModule, ConfigService } from '@nestjs/config'
import appConfig from './config/app.config'
import { SequelizeModule } from '@nestjs/sequelize'
import postgresConfig from './config/postgres.config'

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
      load: [appConfig, postgresConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get('pg.host'),
          port: configService.get('pg.port'),
          username: configService.get('pg.username'),
          password: configService.get('pg.password'),
          database: configService.get('pg.database'),
          models: [],
          autoLoadModels: true,
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
