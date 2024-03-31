import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Length,
  IsEmail,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Match } from "src/utils/password-match-validator";

export class CreateUserDTO {
  @ApiProperty({
    example: "zayarhtet",
    description: "Name of user",
    minimum: 4,
    maximum: 20,
  })
  @IsString({ message: "Please Enter Valid Name" })
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty({ message: "Name Required" })
  name: string;

  @ApiProperty({
    example: "zayar@gmail.com",
    description: "Email of user",
    minimum: 11,
    maximum: 20,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "asdfasdf",
    description: "Password of user",
    minimum: 8,
    maximum: 20,
  })
  @IsString()
  @IsNotEmpty({ message: "Password Required" })
  @Length(8, 12, {
    message: "Password length Must be between 8 and 12 charcters",
  })
  password: string;

  @ApiProperty({
    example: "asdfasdf",
    description: "To Confirm Password",
    minimum: 8,
    maximum: 20,
  })
  @Match(CreateUserDTO, (s) => s.password, {
    message: "Password do not match.",
  })
  confirm_password: string;
}
