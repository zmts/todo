import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class UserRegistrationDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  firstName: string
}
