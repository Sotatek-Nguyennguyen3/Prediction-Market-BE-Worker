import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1665456998059 implements MigrationInterface {
  name = "InitDatabase1665456998059";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`api_key\` (\`id\` int NOT NULL AUTO_INCREMENT, \`api_key\` varchar(150) NOT NULL, \`api_secret\` varchar(150) NOT NULL, \`admin_id\` int NOT NULL, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, UNIQUE INDEX \`api_key\` (\`api_key\`), UNIQUE INDEX \`IDX_e19efac96a8fc087cf9eea608b\` (\`api_key\`), UNIQUE INDEX \`IDX_37681a0a6c67b424c9b9e25103\` (\`api_secret\`), UNIQUE INDEX \`IDX_c8a555bbe7383ba79af17efc96\` (\`admin_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`currency_config\` (\`swap_id\` int NOT NULL, \`network\` varchar(255) NOT NULL, \`chain_name\` varchar(255) NULL, \`chain_id\` varchar(255) NULL, \`token_addresses\` varchar(1000) NULL, \`average_block_time\` int NOT NULL, \`required_confirmations\` int NOT NULL, \`temp_required_confirmations\` int NOT NULL, \`scan_api\` varchar(200) NULL, \`rpc_endpoint\` varchar(255) NULL, \`explorer_endpoint\` varchar(255) NULL, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, PRIMARY KEY (\`swap_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`kms_cmk\` (\`id\` varchar(191) NOT NULL, \`region\` varchar(255) NOT NULL, \`alias\` varchar(255) NULL DEFAULT '', \`arn\` varchar(255) NOT NULL, \`is_enabled\` tinyint(1) NOT NULL DEFAULT '0', \`created_at\` bigint NULL, \`updated_at\` bigint NULL, INDEX \`region\` (\`region\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`kms_data_key\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`cmk_id\` varchar(255) NOT NULL, \`encrypted_data_key\` varchar(500) NOT NULL, \`is_enabled\` tinyint(1) NOT NULL DEFAULT 1, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`mail_job\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`sender_name\` varchar(100) NULL, \`sender_address\` varchar(100) NOT NULL, \`recipient_address\` varchar(100) NOT NULL, \`title\` varchar(254) NULL, \`template_name\` varchar(50) NOT NULL, \`content\` text NULL, \`is_sent\` tinyint(1) NULL DEFAULT '0', \`retry_count\` tinyint(4) NULL DEFAULT '0', \`created_at\` bigint NULL, \`updated_at\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`mail_log\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`job_id\` int NOT NULL, \`status\` varchar(255) NULL, \`msg\` text NULL, \`created_at\` bigint NULL, INDEX \`job_id\` (\`job_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(256) NOT NULL, \`email\` varchar(256) NOT NULL, \`password\` varchar(256) NOT NULL, \`avatar_url\` varchar(1000) NULL, \`full_name\` varchar(100) NULL, \`code\` varchar(1000) NULL, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, \`is_active\` tinyint(1) NOT NULL DEFAULT '1', \`type\` tinyint(1) NOT NULL DEFAULT '2', \`client_id\` int NULL, UNIQUE INDEX \`IDX_5e568e001f9d1b91f67815c580\` (\`username\`), UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`latest_block\` (\`currency\` varchar(255) NOT NULL, \`block_number\` int NOT NULL, \`created_at\` bigint NOT NULL, \`updated_at\` bigint NOT NULL, PRIMARY KEY (\`currency\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` decimal(40,8) NULL, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, UNIQUE INDEX \`IDX_26489c99ddbb4c91631ef5cc79\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`order_onchain\` (\`id\` int NOT NULL AUTO_INCREMENT, \`contract_address\` varchar(255) NOT NULL, \`order_id\` int NOT NULL, \`chain_id\` varchar(255) NOT NULL, \`owner\` varchar(255) NOT NULL, \`token_address\` varchar(255) NOT NULL, \`token_id\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`price\` varchar(255) NOT NULL, \`payment_token\` varchar(255) NOT NULL, \`is_onsale\` tinyint(1) NOT NULL DEFAULT 1, \`is_ERC721\` tinyint(1) NOT NULL DEFAULT 1, \`block_timestamp\` bigint NULL, \`status\` varchar(50) NULL, \`created_at\` bigint NOT NULL, \`updated_at\` bigint NOT NULL, INDEX \`status\` (\`status\`), INDEX \`block_timestamp\` (\`block_timestamp\`), INDEX \`is_ERC721\` (\`is_ERC721\`), INDEX \`is_onsale\` (\`is_onsale\`), INDEX \`payment_token\` (\`payment_token\`), INDEX \`price\` (\`price\`), INDEX \`token_id\` (\`token_id\`), INDEX \`token_address\` (\`token_address\`), INDEX \`owner\` (\`owner\`), INDEX \`order_id\` (\`order_id\`), INDEX \`chain_id\` (\`chain_id\`), INDEX \`contract_address\` (\`contract_address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`order_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`contract_address\` varchar(255) NOT NULL, \`chain_id\` varchar(255) NOT NULL, \`order_id\` int NOT NULL, \`action\` varchar(50) NULL, \`token_address\` varchar(255) NOT NULL, \`token_id\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`price\` varchar(255) NOT NULL, \`is_onsale\` tinyint(1) NOT NULL DEFAULT 1, \`payment_token\` varchar(255) NOT NULL, \`txid\` varchar(255) NULL, \`block_number\` bigint NULL, \`block_hash\` varchar(100) NULL, \`block_timestamp\` bigint NULL, \`status\` varchar(50) NULL, \`created_at\` bigint NOT NULL, \`updated_at\` bigint NOT NULL, INDEX \`status\` (\`status\`), INDEX \`block_timestamp\` (\`block_timestamp\`), INDEX \`block_hash\` (\`block_hash\`), INDEX \`block_number\` (\`block_number\`), INDEX \`txid\` (\`txid\`), INDEX \`payment_token\` (\`payment_token\`), INDEX \`price\` (\`price\`), INDEX \`token_id\` (\`token_id\`), INDEX \`token_address\` (\`token_address\`), INDEX \`action\` (\`action\`), INDEX \`order_id\` (\`order_id\`), INDEX \`contract_address\` (\`contract_address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`from_user\` varchar(150) NULL, \`to_user\` varchar(150) NULL, \`data\` varchar(10000) NULL, \`type\` int NULL DEFAULT '0', \`is_read\` tinyint(1) NULL DEFAULT '0', \`collection_id\` int NULL, \`nft_id\` int NULL, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`currency_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token_name\` varchar(255) NULL, \`decimal\` int NULL, \`chain_id\` varchar(255) NULL, \`contract_address\` varchar(255) NULL, \`status\` int NULL, \`is_native_token\` int NULL, \`currency\` varchar(255) NULL, \`icon\` varchar(255) NULL, \`created_at\` varchar(255) NULL, \`updated_at\` bigint NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(150) NOT NULL, \`secret\` text NOT NULL, \`note\` varchar(150) NOT NULL, \`created_at\` bigint NULL, \`updated_at\` bigint NULL, UNIQUE INDEX \`IDX_0a1ed89729fa10ba8b81b99f30\` (\`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_0a1ed89729fa10ba8b81b99f30\` ON \`address\``
    );
    await queryRunner.query(`DROP TABLE \`address\``);
    await queryRunner.query(`DROP TABLE \`currency_token\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP INDEX \`contract_address\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`order_id\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`action\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`token_address\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`token_id\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`price\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`payment_token\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`txid\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`block_number\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`block_hash\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`block_timestamp\` ON \`order_log\``);
    await queryRunner.query(`DROP INDEX \`status\` ON \`order_log\``);
    await queryRunner.query(`DROP TABLE \`order_log\``);
    await queryRunner.query(
      `DROP INDEX \`contract_address\` ON \`order_onchain\``
    );
    await queryRunner.query(`DROP INDEX \`chain_id\` ON \`order_onchain\``);
    await queryRunner.query(`DROP INDEX \`order_id\` ON \`order_onchain\``);
    await queryRunner.query(`DROP INDEX \`owner\` ON \`order_onchain\``);
    await queryRunner.query(
      `DROP INDEX \`token_address\` ON \`order_onchain\``
    );
    await queryRunner.query(`DROP INDEX \`token_id\` ON \`order_onchain\``);
    await queryRunner.query(`DROP INDEX \`price\` ON \`order_onchain\``);
    await queryRunner.query(
      `DROP INDEX \`payment_token\` ON \`order_onchain\``
    );
    await queryRunner.query(`DROP INDEX \`is_onsale\` ON \`order_onchain\``);
    await queryRunner.query(`DROP INDEX \`is_ERC721\` ON \`order_onchain\``);
    await queryRunner.query(
      `DROP INDEX \`block_timestamp\` ON \`order_onchain\``
    );
    await queryRunner.query(`DROP INDEX \`status\` ON \`order_onchain\``);
    await queryRunner.query(`DROP TABLE \`order_onchain\``);
    await queryRunner.query(`DROP TABLE \`collection\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_26489c99ddbb4c91631ef5cc79\` ON \`config\``
    );
    await queryRunner.query(`DROP TABLE \`config\``);
    await queryRunner.query(`DROP TABLE \`latest_block\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5e568e001f9d1b91f67815c580\` ON \`admin\``
    );
    await queryRunner.query(`DROP TABLE \`admin\``);
    await queryRunner.query(`DROP INDEX \`job_id\` ON \`mail_log\``);
    await queryRunner.query(`DROP TABLE \`mail_log\``);
    await queryRunner.query(`DROP TABLE \`mail_job\``);
    await queryRunner.query(`DROP TABLE \`kms_data_key\``);
    await queryRunner.query(`DROP INDEX \`region\` ON \`kms_cmk\``);
    await queryRunner.query(`DROP TABLE \`kms_cmk\``);
    await queryRunner.query(`DROP TABLE \`currency_config\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_c8a555bbe7383ba79af17efc96\` ON \`api_key\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_37681a0a6c67b424c9b9e25103\` ON \`api_key\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e19efac96a8fc087cf9eea608b\` ON \`api_key\``
    );
    await queryRunner.query(`DROP INDEX \`api_key\` ON \`api_key\``);
    await queryRunner.query(`DROP TABLE \`api_key\``);
  }
}
