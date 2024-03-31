//auth.controller.ts
import {
  Body,
  Controller,
  Post,
  Get,
  HttpStatus,
  Request,
  UseGuards,
  ValidationPipe,
  HttpException,
} from "@nestjs/common";
import { AuthGuardJwt } from "./auth.guard";
import { AuthService } from "./auth.service";
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { LoginDto } from "./login.dto";
import { LoggedInUser } from "../../helper/CurrentUserFetch";
@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private authService: AuthService) {}

  //-----------------------
  @Post("login")
  @ApiBody({
    description: "User credentials for login",
    type: LoginDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Login successful",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid credentials",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Phone number not found",
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <access-token>",
  })
  @ApiBearerAuth()
  async signIn(@Body(new ValidationPipe()) signInDto: LoginDto) {
    const data = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    throw new HttpException(
      {
        response: data.message,
      },
      data.status_code,
    );
  }

  //03/30/2024
  @UseGuards(AuthGuardJwt)
  @Get("current_user")
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
  getProfile(@LoggedInUser() user) {
    return user;
  }


  @UseGuards(AuthGuardJwt)
  @Get("refreshToken")
  async refreshToken(@Request() req) {
    // Get the user from the request
    const user = req.user;
    console.log(user.id);
  }
}
