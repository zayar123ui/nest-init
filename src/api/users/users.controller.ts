import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  HttpStatus,
  Get,
  UseGuards,
  Put,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { HttpException } from "@nestjs/common";

import { LoggedInUser } from "../../helper/CurrentUserFetch";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuardJwt } from "../auth/auth.guard";
import { ChangePasswordDTO } from "./dtos/change-password.dto";

// import { LoggedInUser } from 'src/common/commonVariable';
// import { PasswordsNotEqualPipe } from 'src/common/password_not_equal.validator';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get("/:id")
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: "Found",
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: "Not Found",
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: "Internal Server Error",
  // })
  // async findOne(@Param("id") id: string) {
  //   const data = await this.usersService.findOne(+id);
  //   throw new HttpException({ response: data.message }, data.status_code);
  // }

  @Post()
  @ApiBody({
    description: "Register",
    type: CreateUserDTO,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Created Successful",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Email already in use",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server Error",
  })
  async create(@Body(new ValidationPipe()) user: CreateUserDTO) {
    const data = await this.usersService.create(user);
    throw new HttpException({ response: data.message }, data.status_code);
  }

  //03/30/2024
  @UseGuards(AuthGuardJwt)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized",
  })
  @ApiTags("Authentication")
  @ApiBearerAuth()
  async getCurrentUser(@LoggedInUser() user) {
    const data = await this.usersService.findOne(user.id);
    throw new HttpException({ response: data.message }, data.status_code);
  }

  //03/30/2024
  @UseGuards(AuthGuardJwt)
  @Post("change_password")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized",
  })
  @ApiTags("Authentication")
  @ApiBearerAuth()
  async changePassword(
    @Body(new ValidationPipe()) req: ChangePasswordDTO,
    @LoggedInUser() user,
  ) {
    const data = await this.usersService.change_password(user.id, req);
    throw new HttpException({ response: data.message }, data.status_code);
  }

  //03/30/2024
  @UseGuards(AuthGuardJwt)
  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized",
  })
  @ApiTags("Authentication")
  @ApiBearerAuth()
  async update(
    @Body() req: UpdateUserDTO,
    @LoggedInUser() user,
  ) {
    const data = await this.usersService.update(user.id, req);
    throw new HttpException({ response: data.message }, data.status_code);
  }
}
