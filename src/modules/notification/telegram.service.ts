import { Injectable } from "@nestjs/common";
import { Telegraf } from "telegraf";
import { getLogger } from "../../shared/logger";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const groupId = process.env.TELEGRAM_CHAT_ID;
const logger = getLogger("TelegramService");
@Injectable()
export class TelegramService {
  constructor() {
    this.init();
  }

  async init() {
    try {
      await bot.telegram.sendMessage(groupId, "Start server...", {});
    } catch (error) {
      logger.warn(
        "Incorrect setting for telegram notification, error = " + error.message
      );
    }
  }

  async sendNotification(message: string) {
    try {
      await bot.telegram.sendMessage(groupId, message, {});
    } catch (error) {}
  }
}
