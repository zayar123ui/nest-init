import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { Helper } from "../../helper/Helper";
// Entity
import { Users } from "./entities/users.entity";

// import { Repository } from 'typeorm';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, Helper],
  exports: [Helper, TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
