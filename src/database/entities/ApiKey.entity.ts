import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

// import Kms from '../encrypt/Kms';

@Entity("api_key")
@Index("api_key", ["apiKey"], { unique: true })
export class ApiKey {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  public id: number;

  @Column({ name: "api_key", type: "varchar", length: 150, unique: true })
  public apiKey: string;

  @Column({ name: "api_secret", type: "varchar", length: 150, unique: true })
  public apiSecret: string;

  @Column({ name: "admin_id", type: "int", unique: true })
  public adminId: number;

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
