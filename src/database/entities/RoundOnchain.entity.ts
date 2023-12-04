import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

@Entity("round_on_chain")
export class RoundOnchain {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true })
  id: number;

  @Column({ name: "epoch_number", type: "bigint", nullable: false })
  epochNumber: number;

  @Column({ name: "start_time_stamp", type: "bigint", nullable: true })
  startTimeStamp: number;

  @Column({ name: "status", type: "varchar", length: 20, nullable: false })
  status: string;

  @Column({
    name: "is_success",
    type: "boolean",
    nullable: false,
    default: true,
  })
  isSuccess: boolean;

  @Column({
    name: "round_onchain_status",
    type: "varchar",
    length: 20,
    nullable: true,
  })
  roundOnchainStatus: string;

  @Column({ name: "lock_time_stamp", type: "bigint", nullable: true })
  lockTimeStamp: number;

  @Column({ name: "close_time_stamp", type: "bigint", nullable: true })
  closeTimeStamp: number;

  @Column({ name: "lock_price", type: "varchar", length: 50, nullable: true })
  lockPrice: string;

  @Column({ name: "close_price", type: "varchar", length: 50, nullable: true })
  closePrice: string;

  @Column({ name: "total_amount", type: "varchar", length: 50, nullable: true })
  totalAmount: string;

  @Column({ name: "up_amount", type: "varchar", length: 50, nullable: true })
  upAmount: string;

  @Column({ name: "down_amount", type: "varchar", length: 50, nullable: true })
  downAmount: string;

  @Column({
    name: "reward_base_cal_amount",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  rewardBaseCalAmount: string;

  @Column({
    name: "reward_amount",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  rewardAmount: string;

  @Column({ name: "round_executed", type: "boolean", nullable: false })
  roundExecuted: boolean;

  @Column({ name: "block_hash", type: "varchar", length: 100, nullable: true })
  blockHash: string;

  @Column({
    name: "block_time_stamp",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  blockTimeStamp: string;

  @Column({ name: "block_number", type: "varchar", length: 50, nullable: true })
  blockNumber: string;

  @Column({ name: "created_at", type: "bigint", nullable: true })
  createdAt: number;

  @Column({ name: "updated_at", type: "bigint", nullable: true })
  updatedAt: number;

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
