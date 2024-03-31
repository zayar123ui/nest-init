import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDTO {

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

}
