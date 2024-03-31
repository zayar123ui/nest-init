import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'zayar@gmail.com', type: String })
  @IsNotEmpty({ message: 'Email required' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Sdfgsdfg3' })
  @IsString({ message: 'Provide Valid Password' })
  @Length(8, 12, {
    message: 'Password length Must be between 8 and 12 characters',
  })
  @IsNotEmpty({ message: 'Password Required' })
  password: string;

  accessToken?: string;
}
