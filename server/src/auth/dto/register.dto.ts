import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  constructor() {}

  @IsString()
  @MinLength(5, { message: 'your name must be more than 5 characters.' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: 'your password must be more than 5 characters' })
  password: string;
}
