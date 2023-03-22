import { IsEmail, IsNotEmpty ,IsStrongPassword, IsDateString, IsString} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    FirstName:String
    @IsNotEmpty()
    LastName:String
    @IsEmail()
    Email:String
    @IsString()
    ProfilePicUrl:string
    @IsNotEmpty()
    CIN:string
    @IsNotEmpty()
    Phone:String
    @IsDateString()
    Birthday:Date
    @IsStrongPassword()
    Password:String
}