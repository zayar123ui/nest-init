import * as moment from "moment-timezone";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  del_flg: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

  @BeforeInsert()
  updateDatesBeforeInsert() {
    const localTime = new Date();
    this.created_at = localTime;
    this.updated_at = moment().tz("Asia/Bangkok").toDate();
  }

  @BeforeUpdate()
  updateDatesBeforeUpdate() {
    this.updated_at = moment().tz("Asia/Bangkok").toDate();
  }
}
