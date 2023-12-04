import { Injectable } from "@nestjs/common";
import { getLogger } from "../../shared/logger";
import { getConnection, Repository } from "typeorm";
import { Notification } from "../../database/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { MailService } from "../mail/mail.service";
// import {TelegramService} from "./telegram.service";

const NOTIFICATION_INTERVAL = 1000 * 60 * 60; // 1 hour
var lastSendTime = {};
const logger = getLogger("NotificationService");
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    private mailService: MailService
  ) // private telegramService: TelegramService
  {}

  async notificationException(exception: string) {
    let message = this.convertMessage(exception);
    if (message == "") {
      return;
    }
    let now = new Date();
    if (now.getTime() - lastSendTime[message] < NOTIFICATION_INTERVAL) {
      logger.info("Error: " + message);
      return;
    }

    lastSendTime[message] = now.getTime();
    this.mailService.sendNotification(message);
    // this.telegramService.sendNotification(message);
    logger.info("Sent notification: " + message);
  }

  async notificationLowBalance(
    network: string,
    address: string,
    balance: string,
    token: string
  ) {
    let message = `${network.toLocaleUpperCase()} has low balance (${balance} ${token}). Please add more ${token} to ${address}.`;
    await this.notificationException(message);
  }

  convertMessage(message: string) {
    if (message.indexOf("execution reverted: Invalid amount") >= 0) {
      return (
        message.split(" ")[0].toLocaleUpperCase() +
        " does not have enough ZennyToken in funding pool to proceed a pending transaction. Please add more ZennyToken to funding pool."
      );
    }
    if (message.indexOf("execution reverted: Only admin") >= 0) {
      return (
        message.split(" ")[0].toLocaleUpperCase() +
        " You have NOT set the admin permission for master wallet address."
      );
    }
    if (message.indexOf("Could not construct tx because of lacking fee") >= 0) {
      return (
        message.split(" ")[0].toLocaleUpperCase() +
        " Could not construct tx because of lacking fee. Please add more native coin to master wallet address."
      );
    }
    return "";
  }

  // async getTotalNotReadNotification(owner: User) {
  //   let user = await this.userRepo.findOne(owner.id);
  //   let queryBuilder = getConnection()
  //     .createQueryBuilder(Notification, 'notification')
  //     .select("Count (1) as Total")
  //     .where('(notification.to_user = :toUser and notification.is_read = :isRead and notification.type in (7,8,9,10,11)) or notification.type = 0', { toUser: user.wallet, isRead: false })

  //   const data = await queryBuilder.execute();
  //   return data;
  // }

  async update(data: any) {
    let notification = await this.notificationRepo.findOne(data.id);
    notification.isRead = true;
    notification = await this.notificationRepo.save(notification);

    return notification;
  }

  getOffset(paginationOptions: IPaginationOptions) {
    let offset = 0;
    if (paginationOptions.page && paginationOptions.limit) {
      if (paginationOptions.page > 0) {
        offset =
          (Number(paginationOptions.page) - 1) *
          Number(paginationOptions.limit);
      }
    }
    return offset;
  }
}
