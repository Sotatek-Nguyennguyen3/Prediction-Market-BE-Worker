import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { nowInMillis } from "../../shared/Utils";
import { ICurrencyConfigInterface } from "../interfaces/ICurrencyConfig.interface";

@Entity("currency_config")
export class CurrencyConfig implements ICurrencyConfigInterface {
  @PrimaryColumn("int", { name: "swap_id", nullable: false })
  public swapId: number;

  @Column({ name: "network", type: "varchar", nullable: false })
  public network: string;

  @Column({ name: "chain_name", type: "varchar", nullable: true })
  public chainName: string;

  @Column({ name: "chain_id", type: "varchar", nullable: true })
  public chainId: string;

  @Column({
    name: "token_addresses",
    type: "varchar",
    length: 1000,
    nullable: true,
  })
  public tokenAddresses: string;

  @Column("int", { name: "average_block_time", nullable: false })
  public averageBlockTime: number;

  @Column("int", { name: "required_confirmations", nullable: false })
  public requiredConfirmations: number;

  @Column("int", { name: "temp_required_confirmations", nullable: false })
  public tempRequiredConfirmations: number;

  @Column({ name: "scan_api", type: "varchar", length: 200, nullable: true })
  public scanApi: string;

  @Column({ name: "rpc_endpoint", type: "varchar", nullable: true })
  public rpcEndpoint: string;

  @Column({ name: "explorer_endpoint", type: "varchar", nullable: true })
  public explorerEndpoint: string;

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
