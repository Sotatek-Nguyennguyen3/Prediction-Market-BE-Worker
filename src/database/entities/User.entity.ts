import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

@Entity("user")
@Index("wallet", ["wallet"], { unique: true })
export class User {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  public id: number;

  @Column({ name: "wallet", type: "varchar", length: 255, nullable: true })
  public wallet: string;

  @Column({ name: "nonce", type: "int", default: 0 })
  public nonce: number;

  @Column({ name: "created_at", type: "bigint", nullable: true })
  public createdAt: number;

  @Column({ name: "updated_at", type: "bigint", nullable: true })
  public updatedAt: number;

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
