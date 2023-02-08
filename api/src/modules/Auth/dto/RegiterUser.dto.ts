import { IsEmail, IsNotEmpty,IsDateString ,IsStrongPassword} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    FirstName:String
    @IsNotEmpty()
    LastName:String
    @IsEmail()
    Email:String
    @IsNotEmpty()
    Phone:String
    @IsDateString()
    Birthday:Date
    @IsStrongPassword()
    Password:String
}