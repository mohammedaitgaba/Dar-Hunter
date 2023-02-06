import { Body, Controller, Get, Post,UsePipes,ValidationPipe } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    @Get('')
    getUsers(@Query('filter') filter: String) {
        console.log(filter);

        return { med: "tester" }
    }
    @Post('AddUser')
    @UsePipes(new ValidationPipe())
    AddNewUser(@Body() userData: CreateUserDto) {
        console.log(userData);
        return { userData }
    }
    @Get(':id')
    getUserById(@Param('id') id: String) {
        return { id }
    }
}
