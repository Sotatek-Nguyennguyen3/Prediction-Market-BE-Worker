// import {Module} from '@nestjs/common';
// import {AuthService} from './auth.service';
// import {AuthService as AuthUserService} from '../user/auth.service';
// import {AuthController} from './auth.controller';
// import {PassportModule} from '@nestjs/passport';
// import {JwtModule} from '@nestjs/jwt';
// import {JwtStrategy} from './jwt.strategy';
// import {TypeOrmModule} from '@nestjs/typeorm';
// import {Admin, Collection, User, UserWhitelistLootBox, WhitelistSale} from '../../database/entities';
// import {MailService} from "../mail/mail.service";
// import {SingleSignOnService} from "../user/sso.service";
// import {TwoFactorAuthenticationService} from "../user/twoFactorAuthentication.service";
// import {UsersService} from "../user/user.service";
// import {S3Handler} from "../../shared/S3Handler";
// import {WhitelistSaleService} from "../whitelistsale/whitelistSale.service";

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Admin, User, Collection, UserWhitelistLootBox, WhitelistSale]),
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'abcxyz',
//       // signOptions: { expiresIn: 24 * 60 * 60 },
//     })],
//   providers: [AuthService, AuthUserService, TwoFactorAuthenticationService, UsersService, S3Handler,
//     MailService, JwtStrategy, SingleSignOnService, WhitelistSaleService],
//   controller: [AuthController],
// })
// export class AuthModule {}
