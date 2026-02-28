import {IsEmail, IsString, MinLength} from "class-validator";

export class LoginDto {

    @IsEmail()
    @MinLength(10, {message: "Email must be at least 10 characters long"})
    email: string;

    @IsString()
    @MinLength(6, {message: "Password must be at least 6 characters long"})
    password: string;
}