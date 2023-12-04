import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryColumn,
} from "typeorm";
import { random } from "lodash";
import { nowInMillis } from "../../shared/Utils";

@Entity("transaction_request")
//TODO: update into composite index after write query
@Index("creator_id", ["creatorId"], { unique: false })
@Index("creator_address", ["creatorAddress"], { unique: false })
@Index("chain_id", ["chainId"], { unique: false })
@Index("type", ["type"], { unique: false })
@Index("status", ["status"], { unique: false })
@Index("retry_timestamp", ["retryTimestamp"], { unique: false })
@Index("created_at", ["createdAt"], { unique: false })
@Index("updated_at", ["updatedAt"], { unique: false })
export class TransactionRequest {
  @PrimaryColumn({ name: "id", type: "bigint" })
  public id: number;

  @Column({ name: "creator_id", type: "bigint", nullable: false })
  public creatorId: number;

  @Column({
    name: "creator_address",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  public creatorAddress: string;

  @Column({ name: "chain_id", type: "varchar", length: 100, nullable: false })
  public chainId: string;

  @Column({ name: "signature", type: "varchar", length: 255, nullable: false })
  public signature: string;

  @Column({ name: "amount", type: "text", nullable: false })
  public amount: string;

  // TransactionRequestType in ENUM
  @Column({ name: "type", type: "varchar", length: 20, nullable: false })
  public type: string;

  // TransactionRequestStatus in ENUM
  @Column({ name: "status", length: 20, type: "varchar", nullable: false })
  public status: string;

  @Column({
    name: "error_message",
    type: "varchar",
    length: 5000,
    nullable: true,
  })
  public errorMessage: string | null;

  @Column({
    name: "retry_timestamp",
    type: "bigint",
    nullable: true,
    default: true,
  })
  public retryTimestamp: number;

  @Column({ name: "created_at", type: "bigint", nullable: false })
  public createdAt: number;

  @Column({ name: "updated_at", type: "bigint", nullable: false })
  public updatedAt: number;

  @BeforeInsert()
  public updateCreatedAt() {
    this.id = parseInt(
      random(10, 99) + "" + nowInMillis() + "" + random(100, 999)
    );
    this.createdAt = nowInMillis();
    this.updatedAt = nowInMillis();
  }

  @BeforeUpdate()
  public updateUpdatedAt() {
    this.updatedAt = nowInMillis();
  }
}
