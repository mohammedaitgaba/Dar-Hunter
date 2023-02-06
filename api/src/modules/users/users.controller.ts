import { Body, Controller, Get, Post,UsePipes,ValidationPipe } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private authService : UsersService){}
    // @Get('')
    // getUsers(@Query('filter') filter: String) {
    //     console.log(filter);

    //     return { med: "tester" }
    // }
    @Post('AddUser')
    @UsePipes(new ValidationPipe())
    AddNewUser(@Body() userData: CreateUserDto):Promise<{token:String}> {
        return this.authService.SignUp(userData)
    }
    @Get(':id')
    getUserById(@Param('id') id: String) {
        return { id }
    }
}
