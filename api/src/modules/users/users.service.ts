import { Injectable, NotFoundException, UnauthorizedException,HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { NavigationOption, UserType } from 'src/utils/types';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>
    ){}
    async GetUserById(id:String):Promise<{user:{}}>{
        const user = await this.userModel.findById(id).select('-Password')
        if (!user||user.Deleted==true) {  
            throw new NotFoundException(`User Not found`);
        }
        return {user}
    }
    async FetchUsers(option:NavigationOption):Promise<{users:{},Total:number}>{
        const {Limit,Page}=option
        const Total = await this.userModel.count({Deleted: false})
        const users = await this.userModel.find({
            Deleted: false
        }).select('-Password').skip((Page -1)*Limit).limit(Limit)
        if (!users) {
            throw new  HttpException('No Users found',HttpStatus.BAD_REQUEST)
        }
        return {"users":users,"Total":Total}
        
    }
    async FtechDeletedUsers():Promise<{deletedUser:{}}>{
        const deletedUser = await this.userModel.find({
            Deleted:true
        })
        if (!deletedUser) {
            throw new  HttpException('No Deleted Users found',HttpStatus.BAD_REQUEST)     
        }
        return {deletedUser}
    }
    async UpdateUser(UserInfo:UserType):Promise<{message:string}>{
        const checkUser = await this.userModel.findById(UserInfo.id)
        if (!checkUser) {
            throw new  HttpException('User Not Found',HttpStatus.BAD_REQUEST)
        } 
        const updatedUser = await this.userModel.findByIdAndUpdate(UserInfo.id,UserInfo,{
            new:true
        })
         if (!updatedUser) {
            throw new  HttpException('Update failed',HttpStatus.BAD_REQUEST)
        }
        return{message:'Updated succesfully'}
    
}
async CloseAcc(Confirmation:any):Promise<{message:string}>{
    // check user if he is existed
    const checkUser = await this.userModel.findOne({_id:Confirmation.id,Deleted:false})
    if (!checkUser) {
        throw new  HttpException('oops User not found ',HttpStatus.BAD_REQUEST) 
    }

    // when the user is existed we need to check his password if correct
    const isPasswordValide = await bcrypt.compare(Confirmation.Password,checkUser.Password)
    if (!isPasswordValide) { 
        throw new  HttpException('Password invalid',HttpStatus.BAD_REQUEST)     
    }
    const deleted = await this.userModel.findByIdAndUpdate(Confirmation.id, {
        $set: {
            Deleted: true
        }
    })
    if (!deleted) {
        throw new  HttpException('Delete failed ',HttpStatus.NOT_MODIFIED)     
    }
    return {message:"Deleted"}
    }
    async PromoteUserToggler(data:{id:string}):Promise<{message:string}>{        
        const checkUser = await this.userModel.findOne({_id:data.id,Deleted:false})
        if (!checkUser) {
            throw new  HttpException('User Not Found',HttpStatus.BAD_REQUEST)     
        }
        if (checkUser.Trusted == false) {
            const promoted =  await this.userModel.findByIdAndUpdate({_id:data.id}, {
                $set: {
                    Trusted: true
                }
            })
            if(!promoted){
                throw new  HttpException('Somthing went worng...',HttpStatus.BAD_REQUEST)     
            }
            return {message:'Promoted successfully'}
        }
        if (checkUser.Trusted == true) {
            const demoted =  await this.userModel.findByIdAndUpdate({_id:data.id}, {
                $set: {
                    Trusted: false
                }
            })
            if(!demoted){
                throw new  HttpException('Somthing went worng...',HttpStatus.BAD_REQUEST)     
            }
            return {message:'Demoted successfully'}
        }
    }
}
