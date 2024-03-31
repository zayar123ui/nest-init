import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/users.entity";
import { Helper } from "../../helper/Helper";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { ServiceResponse } from "../../utils/service-response-interface";
import { ChangePasswordDTO } from "./dtos/change-password.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private helper: Helper,
  ) {}

  // async findAll() {
  //   try {
  //     const data = await this.userRepository.find({
  //       where: {
  //         del_flg: 0,
  //       },
  //       select: {
  //         id: true,
  //         phone: true,
  //         name: true,
  //       },
  //     });
  //     return this.helper.ResponseMessage(
  //       'All User',
  //       HttpStatus.OK,
  //       '',
  //       'Success',
  //       data,
  //     );
  //   } catch (error) {
  //     return this.helper.ResponseMessage(
  //       error,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       '',
  //       'Internal Server Error',
  //     );
  //   }
  // }

  async findOne(id: number): Promise<ServiceResponse> {
    try {
      const data = await this.userRepository.findOneBy({ id: id });

      return !data
        ? {
            status_code: HttpStatus.NOT_FOUND,
            message: "Not Found",
          }
        : {
            status_code: HttpStatus.OK,
            message: { message: "Current User", data: data },
          };
    } catch (error) {
      this.helper.ResponseMessage(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
      );
    }
  }

  async findByEmail(email: CreateUserDTO["email"]): Promise<Users | null> {
    try {
      return await this.userRepository.findOneBy({ email: email });
    } catch (error) {
      this.helper.ResponseMessage(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
      );
    }
  }

  async create(user: CreateUserDTO): Promise<ServiceResponse> {
    const accountExists = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (accountExists)
      return {
        status_code: HttpStatus.CONFLICT,
        message: "User already exists",
      };
    // throw new HttpException("User already exists", HttpStatus.CONFLICT);

    const hashedPassword = await this.helper.passwordEncrpyt(user.password);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return {
      status_code: HttpStatus.OK,
      message: { message: "User Created Successfully", data: newUser },
    };
  }

  async change_password(
    id: number,
    req: ChangePasswordDTO,
  ): Promise<ServiceResponse> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user)
      return {
        status_code: HttpStatus.NOT_FOUND,
        message: "User not found",
      };

    if (!(await this.helper.comparePassword(req.old_password, user.password)))
      return {
        status_code: HttpStatus.CONFLICT,
        message: "Old Password is incorrect",
      };

    const hashedNewPassword = await this.helper.passwordEncrpyt(
      req.new_password,
    );
    user.password = hashedNewPassword;
    await this.userRepository.save(user);
    return {
      status_code: HttpStatus.OK,
      message: { message: "Password Changed Successfully", data: user },
    };
  }
  async update(
    id: number,
    req: UpdateUserDTO,
  ): Promise<ServiceResponse> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user)
      return {
        status_code: HttpStatus.NOT_FOUND,
        message: "User not found",
      };
    user.name = req.name;
    user.email = req.email;
    await this.userRepository.save(user);
    return {
      status_code: HttpStatus.OK,
      message: { message: "Password Changed Successfully", data: user },
    };
  }
}
