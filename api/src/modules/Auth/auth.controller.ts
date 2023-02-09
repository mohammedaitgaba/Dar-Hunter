import { Body, Controller, Get, Post,UsePipes,ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../../shared/dto/RegiterUser.dto';
import { SignUserDto } from '../../shared/dto/SignUser.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @Post('Register')
    @UsePipes(new ValidationPipe())
    AddNewUser(@Body() userData: CreateUserDto):Promise<{token:String}> {
        return this.authService.SignUp(userData)
    }
    @Post('SignIn')
    @UsePipes(new ValidationPipe())
    SignInUser(@Body() signInData:SignUserDto):Promise<{token:String}>{
        return this.authService.SignIn(signInData)
    }
}
