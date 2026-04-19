import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  constructor() {}

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: 'your password must be more than 5 characters' })
  password: string;
}
