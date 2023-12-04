import { nowInMillis } from "src/shared/Utils";
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ICurrencyTokenInterface } from "../interfaces/ICurrencyToken.interface";

@Entity("currency_token")
export class CurrencyToken implements ICurrencyTokenInterface {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  public id: number;

  @Column({ name: "token_name", type: "varchar", nullable: true })
  public tokenName: string;

  @Column({ name: "decimal", type: "int", nullable: true })
  public decimal: number;

  @Column({ name: "chain_id", type: "varchar", nullable: true })
  public chainId: string;

  @Column({ name: "contract_address", type: "varchar", nullable: true })
  public contractAddress: string;

  @Column({ name: "status", type: "int", nullable: true })
  public status: number;

  @Column({ name: "is_native_token", type: "int", nullable: true })
  public isNativeToken: number;

  @Column({ name: "currency", type: "varchar", nullable: true })
  public currency: string;

  @Column({ name: "icon", type: "varchar", nullable: true })
  public icon: string;

  @Column({ name: "created_at", type: "varchar", nullable: true })
  public createdAt: string;

  @Column({ name: "updated_at", type: "bigint", nullable: true, default: 0 })
  public updatedAt: number;

  @BeforeUpdate()
  public updateUpdatedAt() {
    this.updatedAt = nowInMillis();
  }
}
