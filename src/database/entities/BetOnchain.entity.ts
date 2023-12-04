import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";

@Entity("bet_on_chain")
export class BetOnchain {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true })
  id: number;

  //up || down
  @Column({ name: "position", type: "varchar", length: 50, nullable: false })
  position: string;

  @Column({
    name: "amount",
    type: "decimal",
    precision: 65,
    scale: 18,
    nullable: false,
  })
  amount: number;

  @Column({
    name: "win_amount",
    type: "decimal",
    precision: 65,
    scale: 18,
    nullable: true,
    default: 0,
  })
  winAmount: number;

  @Column({ name: "claim", type: "boolean", nullable: false })
  claim: boolean;

  //wallet address of user
  @Column({ name: "sender", type: "varchar", length: 50, nullable: false })
  sender: string;

  @Column({ name: "round_epoch", type: "bigint", nullable: false })
  roundEpoch: number;

  //0: lose and 1: win
  @Column({ name: "status", type: "int", nullable: true })
  status: number;

  @Column({ name: "block_hash", type: "varchar", length: 100, nullable: false })
  blockHash: string;

  @Column({ name: "start_time_stamp", type: "bigint", nullable: true })
  startTimeStamp: number;

  @Column({
    name: "block_time_stamp",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  blockTimeStamp: string;

  @Column({
    name: "block_number",
    type: "varchar",
    length: 100,
    nullable: false,
  })
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
