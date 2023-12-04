import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";
import { IAdmin } from "../interfaces/IAdmin.interface";

@Entity("admin")
export class Admin implements IAdmin {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  public id: number;

  @Column({
    name: "username",
    type: "varchar",
    length: 256,
    nullable: false,
    unique: true,
  })
  public username: string;

  @Column({
    name: "email",
    type: "varchar",
    length: 256,
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({ name: "password", type: "varchar", length: 256, nullable: false })
  public password: string;

  @Column({ name: "avatar_url", type: "varchar", length: 1000, nullable: true })
  public avatarUrl: string;

  @Column({ name: "full_name", type: "varchar", length: 100, nullable: true })
  public fullName: string;

  @Column({ name: "code", type: "varchar", length: 1000, nullable: true })
  public code: string;

  @Column({ name: "created_at", type: "bigint", nullable: true })
  public createdAt: number;

  @Column({ name: "updated_at", type: "bigint", nullable: true })
  public updatedAt: number;

  @Column({
    name: "is_active",
    type: "tinyint",
    width: 1,
    nullable: false,
    default: 1,
  })
  public isActive: number;

  @Column({
    name: "type",
    type: "tinyint",
    nullable: false,
    default: 2,
    width: 1,
  })
  public type: number;
  // 1: super admin
  // 2: partnership

  @Column({ name: "client_id", type: "int", nullable: true })
  public clientId: number;

  @BeforeInsert()
  public updateCreateDates() {
    this.createdAt = nowInMillis();
    this.updatedAt = nowInMillis();
  }

  @BeforeUpdate()
  public updateUpdateDates() {
    this.updatedAt = nowInMillis();
  }
}
