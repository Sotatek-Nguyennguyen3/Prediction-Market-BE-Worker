import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

@Entity("socket_notification")
@Index("recipient_id", ["recipientId"], { unique: false })
@Index("type", ["type"], { unique: false })
@Index("is_read", ["isRead"], { unique: false })
@Index("created_at", ["createdAt"], { unique: false })
@Index("updated_at", ["updatedAt"], { unique: false })
export class SocketNotification {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  public id: number;

  @Column({ name: "recipient_id", type: "bigint", nullable: false })
  public recipientId: string;

  @Column({ name: "content", type: "text", nullable: false })
  public content: string;

  // SocketNotificationTypes in ENUM
  @Column({ name: "type", type: "varchar", length: 100, nullable: true })
  public type: string;

  // Socket emit event for read notification
  @Column({
    name: "is_read",
    type: "tinyint",
    width: 1,
    nullable: false,
    default: 0,
  })
  public isRead: boolean;

  @Column({ name: "sent_at", type: "bigint", nullable: true })
  public sentAt: number;

  @Column({ name: "created_at", type: "bigint", nullable: false })
  public createdAt: number;

  @Column({ name: "updated_at", type: "bigint", nullable: false })
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
