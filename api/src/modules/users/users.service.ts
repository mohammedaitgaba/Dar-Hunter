import { Injectable, NotFoundException, UnauthorizedException,HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from '../Auth/dto/RegiterUser.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUserDto } from '../Auth/dto/SignUser.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService:JwtService
    ){}
    async GetUserById(id:String):Promise<{user}>{
        const user = await this.userModel.findById(id).select('-Password')
        if (!user) {  
            throw new NotFoundException(`User Not found`);
        } else {
            return {user}
        }
    }
    async FetchUsers():Promise<{users}>{
        const users = await this.userModel.find().select('-Password')
        if (!users) {
            throw new  HttpException('No Users found',HttpStatus.BAD_REQUEST)
        }else{
            return {users}
        }
    }
}
