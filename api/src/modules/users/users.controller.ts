import { Body, Controller, Get, Post,UsePipes,ValidationPipe } from '@nestjs/common';
import { Param, Put, Query } from '@nestjs/common/decorators';
import { NavigationOption, UserType } from 'src/utils/types';
import { UsersService } from './users.service';
interface Confirmation {
    Password:String
    id:String
}
@Controller('users')
export class UsersController {
    constructor(private UsersService : UsersService){}

    // @Get('')
    // getUsers(@Query('filter') filter: String) {
    //     console.log(filter);

    //     return { med: "tester" }
    // }
    @Post('AllUsers')
    FetchUsers(@Body() option:NavigationOption){        
        return this.UsersService.FetchUsers(option)
    }
    @Get(':id')
    getUserById(@Param('id') id: String) {
        return this.UsersService.GetUserById(id)
    }
    @Put('UpdateUser')
    UpdateUserInfo(@Body() UserInfo:UserType){        
        return this.UsersService.UpdateUser(UserInfo)
    }
    @Post('DeleteAcc')
    DeleteAcc(@Body() Confirmation:Confirmation){
        return this.UsersService.CloseAcc(Confirmation)
    }
    @Get('DeletedUsers')
    GetDeletedUsers(){
        return this.UsersService.FtechDeletedUsers()
    }
    @Put('PromoteUser')
    PromoteUser(@Body() data:{id:string}){
        return this.UsersService.PromoteUserToggler(data)
    }
}
