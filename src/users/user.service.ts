import { Injectable, Body } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRedis() private readonly redis: Redis
    ) {}

    async getAll() {
        return this.userRepository.all();
    }

    async getOne(id: number) {
        return this.userRepository.findOneBy({id});
    }

    async create(catalogDto: UserDto) {
        return this.userRepository.new(catalogDto);
    }

}
