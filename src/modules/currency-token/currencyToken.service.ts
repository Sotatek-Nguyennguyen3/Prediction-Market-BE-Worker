import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CurrencyConfig, CurrencyToken } from "../../database/entities";
import { Repository } from "typeorm";
import { ICurrencyConfigInterface } from "../../database/interfaces/ICurrencyConfig.interface";
import { ICurrencyTokenInterface } from "../../database/interfaces/ICurrencyToken.interface";

@Injectable()
export class CurrencyTokenService {
  constructor(
    @InjectRepository(CurrencyToken)
    private readonly currencyTokenRepository: Repository<CurrencyToken>,
    @InjectRepository(CurrencyConfig)
    private readonly currencyConfigRepository: Repository<CurrencyConfig>
  ) {}

  async listAllCurrencyTokens() {
    let currencyTokens = await this.currencyTokenRepository.find();
    return currencyTokens;
  }

  async listCurrencyToken(
    network: string,
    contract_address: string,
    chainName: string,
    chainId: string,
    status: number,
    isNativeToken: boolean,
    tokenName: string,
    decimal: number
  ) {
    let queryBuilder = this.currencyTokenRepository
      .createQueryBuilder("currency_token")
      .leftJoin(
        "currency_config",
        "currency_config",
        "currency_config.chain_id = currency_token.chain_id"
      )
      .select(
        "currency_token.token_name as tokenName, currency_token.decimal as 'decimal',currency_token.chain_id as chainId, currency_token.contract_address as contractAddress"
      )
      .addSelect(
        "currency_token.status as status, currency_token.is_native_token as isNativeToken, currency_token.created_at as createdAt, currency_token.updated_at as updatedAt "
      )
      .addSelect(
        "currency_token.currency as currency, currency_token.icon as icon, currency_token.id as id"
      )
      .addSelect(
        "currency_config.network as network, currency_config.chain_name as chainName, currency_config.rpc_endpoint as rpcEndpoint," +
          "currency_config.explorer_endpoint as explorerEndpoint, currency_config.scan_api as scanApi, currency_config.token_addresses as scAddress"
      );

    if (network)
      queryBuilder = queryBuilder.where(
        "currency_config.network like :network",
        { network: `%${network}%` }
      );
    if (chainName)
      queryBuilder = queryBuilder.andWhere(
        "currency_config.chain_name like :chainName",
        { chainName: `%${chainName}%` }
      );
    if (chainId)
      queryBuilder = queryBuilder.andWhere(
        "currency_token.chain_id like :chainId",
        { chainId: `%${chainId}%` }
      );
    if (tokenName)
      queryBuilder = queryBuilder.andWhere(
        "currency_token.token_name like :tokenName",
        { tokenName: `%${tokenName}%` }
      );
    if (contract_address)
      queryBuilder = queryBuilder.andWhere(
        "currency_token.contract_address = :contract_address",
        { contract_address: contract_address }
      );
    if (status)
      queryBuilder = queryBuilder.andWhere("currency_token.status = :status", {
        status: status,
      });
    if (decimal)
      queryBuilder = queryBuilder.andWhere(
        "currency_token.decimal = :decimal",
        { decimal: decimal }
      );
    if (isNativeToken)
      queryBuilder = queryBuilder.andWhere(
        "currency_token.is_native_token = :isNativeToken",
        { isNativeToken: isNativeToken }
      );

    let currencyToken = await queryBuilder.execute();
    return currencyToken.map((c) => {
      return { ...c, ...JSON.parse(c.scAddress) };
    });
  }

  async createCurrencyConfigs(currencyConfigs: ICurrencyConfigInterface[]) {
    await this.currencyConfigRepository.save(currencyConfigs);
  }

  async createCurrencyTokens(currencyTokens: ICurrencyTokenInterface[]) {
    await this.currencyTokenRepository.save(currencyTokens);
  }
}
