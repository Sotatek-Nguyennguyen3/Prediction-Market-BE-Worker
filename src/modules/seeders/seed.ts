import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./seeder.module";
import { Seeder } from "./seeder";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext) => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(Seeder);
      seeder
        .seed(process.env.ENTITY)
        .then(() => {
          logger.debug("Seeding complete!");
        })
        .catch((error) => {
          logger.error("Seeding failed!");
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
