import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Admin,
  CurrencyConfig,
  CurrencyToken,
  KmsCmk,
} from "../../database/entities";
import { Repository } from "typeorm";
import { ICurrencyConfigInterface } from "../../database/interfaces/ICurrencyConfig.interface";
import { ICurrencyTokenInterface } from "../../database/interfaces/ICurrencyToken.interface";
import { IAdmin } from "../../database/interfaces/IAdmin.interface";
import * as argon2 from "argon2";
import { IKmsCmkInterface } from "../../database/interfaces/IKmsCmk.interface";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(CurrencyToken)
    private readonly currencyTokenRepository: Repository<CurrencyToken>,

    @InjectRepository(CurrencyConfig)
    private readonly currencyConfigRepository: Repository<CurrencyConfig>,

    @InjectRepository(KmsCmk)
    private kmsCmkRepository: Repository<KmsCmk>
  ) {}

  async createOne(admin: IAdmin): Promise<any> {
    const hashedPassword = await argon2.hash(admin.password);

    admin = { ...admin, password: hashedPassword };
    return this.adminRepository.save(admin);
  }

  async createCurrencyConfigs(currencyConfigs: ICurrencyConfigInterface[]) {
    await this.currencyConfigRepository.save(currencyConfigs);
  }

  async createCurrencyTokens(currencyTokens: ICurrencyTokenInterface[]) {
    await this.currencyTokenRepository.save(currencyTokens);
  }

  async createKmsCmks(kmsCmks: IKmsCmkInterface[]) {
    await this.kmsCmkRepository.save(kmsCmks);
  }
}
