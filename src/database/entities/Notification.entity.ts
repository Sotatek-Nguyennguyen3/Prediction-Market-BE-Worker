import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

// import Kms from '../encrypt/Kms';

@Entity("notification")
export class Notification {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  public id: number;

  @Column({ name: "from_user", type: "varchar", length: 150, nullable: true })
  public fromUser: string;

  @Column({ name: "to_user", type: "varchar", length: 150, nullable: true })
  public toUser: string;

  @Column({ name: "data", type: "varchar", length: 10000, nullable: true })
  public data: string;

  @Column({ name: "type", type: "int", nullable: true, default: 0 })
  public type: number;

  @Column({
    name: "is_read",
    type: "tinyint",
    width: 1,
    nullable: true,
    default: 0,
  })
  public isRead: boolean;

  @Column({ name: "collection_id", type: "int", nullable: true })
  public collectionId: number;

  @Column({ name: "nft_id", type: "int", nullable: true })
  public nftId: number;

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
