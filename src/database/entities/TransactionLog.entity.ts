import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

@Entity("transaction_log")
@Index("user_address", ["userAddress"], { unique: false })
@Index("txid", ["txid"], { unique: false })
@Index("chain_id", ["chainId"], { unique: false })
@Index("type", ["type"], { unique: false })
@Index("status", ["status"], { unique: false })
@Index("contract_address", ["contractAddress"], { unique: false })
export class TransactionLog {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint" })
  public id: number;

  // TransactionOnchainType in ENUM
  @Column("varchar", { length: 20, name: "type", nullable: false })
  public type: string;

  // sender or receiver
  @Column({
    name: "user_address",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  public userAddress: string;

  @Column({
    name: "contract_address",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  public contractAddress: string;

  @Column({ name: "chain_id", type: "varchar", nullable: false })
  public chainId: string;

  @Column({ name: "amount", type: "text", nullable: false })
  public amount: string;

  @Column({
    name: "fee_amount",
    type: "decimal",
    precision: 40,
    scale: 8,
    nullable: true,
  })
  public feeAmount: string;

  @Column({ name: "txid", type: "varchar", nullable: true })
  public txid: string;

  @Column({ name: "block_number", type: "bigint", nullable: true })
  public blockNumber: number;

  @Column({ name: "block_hash", type: "varchar", length: 100, nullable: true })
  public blockHash: string;

  @Column({ name: "block_timestamp", type: "bigint", nullable: true })
  public blockTimestamp: number;

  @Column({ name: "status", type: "varchar", length: 50, nullable: true })
  public status: string;

  @Column({ name: "created_at", type: "bigint", nullable: false })
  public createdAt: number;

  @Column({ name: "updated_at", type: "bigint", nullable: false })
  public updatedAt: number;

  @BeforeInsert()
  public updateCreatedAt() {
    this.createdAt = nowInMillis();
    this.updatedAt = nowInMillis();
  }

  @BeforeUpdate()
  public updateUpdatedAt() {
    this.updatedAt = nowInMillis();
  }
}
