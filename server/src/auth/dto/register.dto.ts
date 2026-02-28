import { IsEmail, MinLength, IsString } from "class-validator";



export class RegisterDto {
    @IsString()
    @MinLength(2, {message: "First name must be at least 2 characters long"})
    first_name: string;
    
    @IsString()
    @MinLength(2, {message: "Last name must be at least 2 characters long"})
    last_name: string;

    @IsEmail()
    @MinLength(10, {message: "Email must be at least 10 characters long"})
    email: string;

    @IsString()
    @MinLength(6, {message: "Password must be at least 6 characters long"})
    password: string;
}