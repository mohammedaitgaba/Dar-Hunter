import { IsEmail, IsNotEmpty ,IsStrongPassword, IsDate, IsDateString} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    FirstName:String
    @IsNotEmpty()
    LastName:String
    @IsEmail()
    Email:String
    @IsNotEmpty()
    CIN:string
    @IsNotEmpty()
    Phone:String
    @IsDateString()
    Birthday:Date
    @IsStrongPassword()
    Password:String
}