import * as bcrypt from "bcrypt";
import {
  Injectable,
  HttpStatus,
  HttpException,
  BadRequestException,
} from "@nestjs/common";

// import { Money } from 'src/api/money/money.entity';

@Injectable()
export class Helper {

  async passwordEncrpyt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  ResponseMessage(
    message: string,
    resCode: HttpStatus,
    errorText?: string,
    resText?: string,
    resData?: object,
  ) {
    throw new HttpException(
      {
        message: [message],
        error: errorText,
        response: resText,
        statusCode: resCode,
        data: resData,
      },
      resCode,
    );
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  generateRandomName(length: number = 32): string {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomName = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomName += characters.charAt(randomIndex);
    }

    return randomName;
  }
  validate(n, max, min) {
    if (typeof n === "number" && isFinite(n)) {
      if (min <= n && n <= max) {
        return;
      } else {
        throw new BadRequestException(
          "Value must be between " + min + " and " + max,
        );
      }
    } else {
      throw new BadRequestException("Provide Valid Data");
    }
  }
}
