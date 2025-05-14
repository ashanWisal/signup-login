import { IsString, IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
  password: string;
}

export class LoginDto {
     
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
    password: string;
  }