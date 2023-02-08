import { IsEmail,IsStrongPassword } from "class-validator";

export class SignUserDto{
    @IsEmail()
    Email:String
    @IsStrongPassword()
    Password:String
}