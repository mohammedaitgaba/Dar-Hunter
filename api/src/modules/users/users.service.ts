import { Injectable, NotFoundException, UnauthorizedException,HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from '../Auth/dto/RegiterUser.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUserDto } from '../Auth/dto/SignUser.dto';
import { NavigationOption, UserType } from 'src/utils/types';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService:JwtService
    ){}
    async GetUserById(id:String):Promise<{user:{}}>{
        const user = await this.userModel.findById(id).select('-Password')
        if (!user||user.Deleted==true) {  
            throw new NotFoundException(`User Not found`);
        } else {
            return {user}
        }
    }
    async FetchUsers(option:NavigationOption):Promise<{users:{},Total:number}>{
        const {Limit,Page}=option
        const Total = await this.userModel.count({Deleted: false})
        const users = await this.userModel.find({
            Deleted: false
        }).select('-Password').skip((Page -1)*Limit).limit(Limit)
        if (!users) {
            throw new  HttpException('No Users found',HttpStatus.BAD_REQUEST)
        }else{
            return {"users":users,"Total":Total}
        }
    }
    async UpdateUser(UserInfo:UserType):Promise<{message:String}>{
        const checkUser = await this.userModel.findById(UserInfo.id)
        if (!checkUser) {
            throw new  HttpException('User Not Found',HttpStatus.BAD_REQUEST)
        } 
        else{
         const updatedUser = await this.userModel.findByIdAndUpdate(UserInfo.id,UserInfo,{
            new:true
         })
         if (!updatedUser) {
            throw new  HttpException('Update failed',HttpStatus.BAD_REQUEST)
         }
         return{message:'Updated succesfully'}
        }
    }
}
