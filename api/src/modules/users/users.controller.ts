import { Body, Controller, Get, Post,UsePipes,ValidationPipe } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { CreateUserDto } from '../Auth/dto/RegiterUser.dto';
import { SignUserDto } from '../Auth/dto/SignUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService : UsersService){}
    // @Get('')
    // getUsers(@Query('filter') filter: String) {
    //     console.log(filter);

    //     return { med: "tester" }
    // }
    @Get('AllUsers')
    FetchUsers(){
        return this.UsersService.FetchUsers()
    }
    @Get(':id')
    getUserById(@Param('id') id: String) {
        return this.UsersService.GetUserById(id)
    }
}
