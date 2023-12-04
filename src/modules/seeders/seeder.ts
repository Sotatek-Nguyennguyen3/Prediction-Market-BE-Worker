import { Injectable, Logger } from "@nestjs/common";
import { adminDataSeeds } from "./admin/data";
import { currencyConfigDataSeeds } from "./currency_config/data";
import { kmsCmkDataSeeds } from "./kms/data";
import { SeedService } from "./seed.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly seedService: SeedService
  ) {}

  async seed(entity: string) {
    try {
      if (entity == "admin") {
        this.logger.debug("Start seeding admin!");
        await this.admin();
      } else if (process.env.ENTITY == "currency-config") {
        this.logger.debug("Start seeding currency-config!");
        await this.currencyConfig();
      } else if (process.env.ENTITY == "currency-token") {
        this.logger.debug("Start seeding currency-token!");
        await this.currencyToken();
      } else if (process.env.ENTITY == "kms-cmk") {
        this.logger.debug("Start seeding kms-cmk!");
        await this.kmsCmk();
      } else if (process.env.ENTITY == "all") {
        this.logger.debug("Start seeding all seeders!");
        try {
          await this.admin();
        } catch (error) {
          this.logger.error("Failed seeding admin with error: ", error.message);
        }

        try {
          await this.currencyToken();
        } catch (error) {
          this.logger.error(
            "Failed seeding currency-token with error: ",
            error.message
          );
        }

        try {
          await this.currencyConfig();
        } catch (error) {
          this.logger.error(
            "Failed seeding currency-config with error: ",
            error.message
          );
        }

        try {
          await this.kmsCmk();
        } catch (error) {
          this.logger.error(
            "Failed seeding kms-cmk with error: ",
            error.message
          );
        }
      } else {
        throw Error("Cannot find any entities!!!");
      }
    } catch (error) {
      this.logger.error("Failed seeding with error: ", error.message);
    }
  }

  async admin() {
    for (let i = 0; i < adminDataSeeds.length; i++) {
      await this.seedService.createOne(adminDataSeeds[i]);
    }
    return true;
  }

  async currencyToken() {
    //await this.seedService.createCurrencyTokens(currencyTokenDataSeeds);
    return true;
  }

  async currencyConfig() {
    await this.seedService.createCurrencyConfigs(currencyConfigDataSeeds);
    return true;
  }

  async kmsCmk() {
    await this.seedService.createKmsCmks(kmsCmkDataSeeds);
    return true;
  }
}
