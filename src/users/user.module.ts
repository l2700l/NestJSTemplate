import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    providers: [UserService, UserRepository],
    controllers: [UserController],
  })

  
export class UserModule {}
