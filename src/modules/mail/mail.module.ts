import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || "smtp.gmail.com",
        secure: false,
        auth: {
          user: process.env.MAIL_USER || "....@gmail.com",
          pass: process.env.MAIL_PASS || "...",
        },
      },
      defaults: {
        from: "gmail.com",
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
