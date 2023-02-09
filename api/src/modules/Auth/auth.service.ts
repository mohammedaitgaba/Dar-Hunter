import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../../shared/dto/RegiterUser.dto';
import { SignUserDto } from '../../shared/dto/SignUser.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService:JwtService
    ){}

    async SignUp(CreateUserDto:CreateUserDto):Promise<{token:string}> {
        const {FirstName,LastName,Email,Phone, Birthday,Password}=CreateUserDto
        const hashedPassword = await bcrypt.hash(Password,10) 
        const UserExist = await this.userModel.findOne({Email})
        if (UserExist) {
            throw new UnauthorizedException('There is already an account with this email')
        }
            const user = await this.userModel.create({
            FirstName,
            LastName,
            Email,
            Phone, 
            Birthday,
            Password:hashedPassword
        })
    
        const token = this.jwtService.sign({id:user._id})
        return {token}
    }
    async SignIn(SignUserDto:SignUserDto):Promise<{token:String}>{
        const {Email ,Password} = SignUserDto
        const user = await this.userModel.findOne({Email})
        if (!user) {
            throw new UnauthorizedException('invalide email or password')
        }
        const isPasswordValide = await bcrypt.compare(Password,user.Password)
        if (!isPasswordValide) {
            throw new UnauthorizedException('invalide email or password')
        }
        const token = this.jwtService.sign({id:user._id})
        return {token}
    }
}
