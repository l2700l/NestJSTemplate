import { Controller, Get, Req, Headers, } from "@nestjs/common";
import { Request } from 'express';
import { UserService } from './user.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { getId } from '../utils/getId';
import { UserDto } from './dto/user.dto';

@ApiSecurity('Authorization', ['Authorization'])
@ApiTags('users')
@Controller({version: '1', path: 'users'})
export class UserController {
    constructor(private userService: UserService,) {}
    @ApiOkResponse({type: UserDto, isArray: true})
    @Get()
    async fetchAll(@Req() request: Request):Promise<Object>{
        return await this.userService.getAll();
    }
    
    @ApiOkResponse({type: UserDto, isArray: false})
    @Get('i')
    async fetchOne(@Headers() headers) {
        const id = getId(headers['authorization']);
        return await this.userService.getOne(id);
    }

    // @Post()
    // create(@Req() request: Request, @Body() catalogDto: UserDto):Object{
    //     return  this.userService.create(catalogDto);
    // }

}
