import {
  IsString,
  IsNotEmpty,
  Length,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsDifferent, Match } from "src/utils/password-match-validator";

export class ChangePasswordDTO {
  @ApiProperty({
    example: "asdfasdf",
    description: "Old Password of user",
    minimum: 8,
    maximum: 20,
  })
  @IsString()
  @IsNotEmpty({ message: "Old Password Required" })
  @Length(8, 12, {
    message: "Old Password length Must be between 8 and 12 charcters",
  })
  old_password: string;

  @ApiProperty({
    example: "asdfasdf",
    description: "Password of user",
    minimum: 8,
    maximum: 20,
  })
  @IsString()
  @IsNotEmpty({ message: "New Password Required" })
  @Length(8, 12, {
    message: "New Password length Must be between 8 and 12 charcters",
  })
  @IsDifferent("old_password", {
    message: "New Password cannot be the same as Old Password",
  })
  new_password: string;
  @ApiProperty({
    example: "asdfasdf",
    description: "To Confirm Password",
    minimum: 8,
    maximum: 20,
  })
  @Match(ChangePasswordDTO, (s) => s.new_password, {
    message: "New Password and Confirm Password do not match.",
  })
  confirm_password: string;
}
