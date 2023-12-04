import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

// import Kms from '../encrypt/Kms';

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  public id: number;

  @Column({ name: "address", type: "varchar", length: 150, unique: true })
  public address: string;

  @Column("text", { name: "secret", nullable: false })
  public secret: string;

  @Column({ name: "note", type: "varchar", length: 150 })
  public note: string;

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
