import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';

import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UserModule } from './users/user.module';
import { VkSignMiddleware } from './middlewares/VkSign.middleware';
import { CheckUserMiddleware } from './middlewares/CheckUser.middleware';
import { User } from './users/user.entity';
import { UserRepository } from './users/user.repository';
import * as process from 'process';
import { UserService } from './users/user.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
    
  ConfigModule.forRoot({
    envFilePath: './.env',
    load: [appConfig, databaseConfig, cacheConfig],
    isGlobal: true,
  }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:  (configService: ConfigService) => {
     return configService.get('database');
    }
  }),

  RedisModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return configService.get('cache');
    },
  }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  TypeOrmModule.forFeature([User, UserRepository]),
  UserModule
  ],
	controllers: [],
	providers: [UserService, UserRepository],
})


export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    if (process.env.NODE_ENV !== 'development') {
      consumer.apply(VkSignMiddleware).forRoutes('/api/*');
    }
    consumer.apply(CheckUserMiddleware).forRoutes('/api/*');
  }
}

