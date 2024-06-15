import {
  IsEmail,
  IsString,
  IsOptional
} from 'class-validator'

export class UserUpdateDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string

  @IsOptional()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  secondName: string
}
