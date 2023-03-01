import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {

	constructor(private  dataSource: DataSource){
		super(User, dataSource.createEntityManager());
	}

	async new(userDto: UserDto){
		return await this.save(userDto);
	}

	async all(){
		return await this.find();
	}

}