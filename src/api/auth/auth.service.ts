//auth.service.ts
import { HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Helper } from "../../helper/Helper";
import { LoginDto } from "./login.dto";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private helper: Helper,
  ) {}

  async signIn(email: LoginDto["email"], password: LoginDto["password"]) {
    const user = await this.usersService.findByEmail(email);

    if (user === null)
      return { message: "No account found", status_code: HttpStatus.NOT_FOUND };
    if (!(await this.helper.comparePassword(password, user.password)))
      return {
        message: "Wrong Credential",
        status_code: HttpStatus.UNAUTHORIZED,
      };

    const payload = { id: user.id, email: user.email };

    return {
      message: {
        message: "Login Success",
        access_token: await this.jwtService.signAsync(payload),
      },
      status_code: HttpStatus.OK,
    };
  }
}
