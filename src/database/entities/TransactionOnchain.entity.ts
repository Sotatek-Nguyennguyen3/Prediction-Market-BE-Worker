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

@Entity("transaction_onchain")
//TODO: update into composite index after write query
@Index("creator_id", ["creatorId"], { unique: false })
@Index("transaction_request_id", ["transactionRequestId"], { unique: false })
@Index("creator_address", ["creatorAddress"], { unique: false })
@Index("chain_id", ["chainId"], { unique: false })
@Index("txid", ["txid"], { unique: false })
@Index("unsigned_txid", ["unsignedTxid"], { unique: false })
@Index("type", ["type"], { unique: false })
@Index("status", ["status"], { unique: false })
@Index("retry_timestamp", ["retryTimestamp"], { unique: false })
@Index("updated_at", ["updatedAt"], { unique: false })
export class TransactionOnchain {
  @PrimaryColumn({ name: "id", type: "bigint" })
  public id: number;

  @Column({ name: "transaction_request_id", type: "bigint", nullable: false })
  public transactionRequestId: number;

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

  @Column("varchar", { name: "txid", length: 255, nullable: true })
  public txid: string | null;

  @Column("varchar", { length: 100, name: "unsigned_txid", nullable: true })
  public unsignedTxid: string;

  @Column({ name: "amount", type: "text", nullable: false })
  public amount: string;

  @Column("varchar", { length: 5000, name: "error_message", nullable: true })
  public errorMessage: string | null;

  // TransactionOnchainStatus in ENUM
  @Column("varchar", { length: 20, name: "status", nullable: false })
  public status: string;

  // TransactionOnchainType in ENUM
  @Column("varchar", { length: 20, name: "type", nullable: false })
  public type: string;

  // gas price
  @Column({
    name: "fee_amount",
    type: "decimal",
    precision: 40,
    scale: 8,
    nullable: true,
  })
  public feeAmount: string;

  @Column("text", { name: "unsigned_raw", nullable: true })
  public unsignedRaw: string | null;

  @Column("text", { name: "signed_raw", nullable: true })
  public signedRaw: string | null;

  @Column({
    name: "retry_timestamp",
    type: "bigint",
    nullable: true,
    default: true,
  })
  public retryTimestamp: number;

  @Column({ name: "retry_count", type: "tinyint", nullable: true, default: 0 })
  public retryCount: number;

  @Column({ name: "block_number", type: "bigint", nullable: true })
  public blockNumber: number;

  @Column({ name: "block_hash", type: "varchar", length: 100, nullable: true })
  public blockHash: string;

  @Column({ name: "block_timestamp", type: "bigint", nullable: true })
  public blockTimestamp: number;

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
