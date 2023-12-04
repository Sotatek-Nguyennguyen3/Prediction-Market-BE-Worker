import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendNotification(message: string) {
    try {
      await this.mailerService.sendMail({
        to: process.env.MAIL_RECEIVED_ADDRESS,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: "Please check bridge system",
        template: "./notification", // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: "Alex",
          content: message,
        },
      });
    } catch (error) {}
  }

  async sendMail(email: string, subject: string, html: any) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: subject,
        html: html,
      });
    } catch (error) {
      console.log("error: ", error.message);
    }
  }
}
