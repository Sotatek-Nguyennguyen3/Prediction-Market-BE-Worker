// import {ExecutionContext, Injectable} from '@nestjs/common';
// import {AuthGuard} from '@nestjs/passport';
// import {AuthService} from './auth.service';
// import {JwtService} from '@nestjs/jwt';
// import {Causes} from "../../config/exception/causes";

// var jwt = require('jsonwebtoken');

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {

//     constructor(
//         private jwtService: JwtService,
//         private authService: AuthService
//     ) {
//         super();
//     }

//     async canActivate(context: ExecutionContext) {
//         try {
//             const req = context.switchToHttp().getRequest();
//             const headers = req.headers;
//             const token = headers.authorization ? headers.authorization : '';
//             if (!token) {
//                 return false;
//             }

//             const user = this.jwtService.decode(token.split(' ')[1]);
//             if (!user || !(user['username'] || user['email'])) return false;

//             jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

//             const userDB = await this.authService.getUserByEmailAndUsername(user['email'], user['username']);
//             if (!userDB) return false;

//             const p = await this.authService.isValidToken(token.split(' ')[1]);
//             req.user = userDB;

//             return p;
//         } catch (error) {
//             // console.log('error: ', error);
//             if (error.message == 'jwt expired') {
//                 throw Causes.JWT_EXPIRED;
//             }
//             return false;
//         }
//     }
// }
