// import {CACHE_MANAGER, HttpException, Inject, Injectable,} from "@nestjs/common";
// import {JwtService} from "@nestjs/jwt";
// import * as argon2 from "argon2";
// import {Admin, Collection, NftOwner, User,} from "../../database/entities";
// import {InjectRepository} from "@nestjs/typeorm";
// import {getConnection, Repository, SelectQueryBuilder} from "typeorm";
// import {CreatePartnership} from "./request/createPartnership.dto";
// import {IPaginationOptions} from "nestjs-typeorm-paginate";
// import {PaginationResponse} from "src/config/rest/paginationResponse";
// import {getArrayPaginationBuildTotal, getOffset} from "src/shared/Utils";
// import {PagingFilterDataAdmin, Sort,} from "./request/pagingFilterDataAdmin.dto";
// import {IAdmin} from "../../database/interfaces/IAdmin.interface";
// import {Cache} from "cache-manager";
// import {CreateAdmin} from "./request/create.dto";
// import axios from "axios";
// import {UserWhitelistLootBox} from "../../database/entities/UserWhitelistLootBox.entity";
// import {AdminStatus, UserStatus} from "src/shared/enums";
// import {Causes} from "../../config/exception/causes";

// var tokenMap = new Map();
// var limitRequestLoginMap = new Map();

// @Injectable()
// export class AuthService {
//     constructor(
//         private jwtService: JwtService,

//         @InjectRepository(Admin)
//         private adminRepository: Repository<Admin>,

//         @InjectRepository(User)
//         private endUserRepository: Repository<User>,

//         @InjectRepository(UserWhitelistLootBox)
//         private userWhitelistRepository: Repository<UserWhitelistLootBox>,

//         @Inject(CACHE_MANAGER) private cacheManager: Cache
//     ) {}

//     async createOne(admin: IAdmin): Promise<any> {
//         const hashedPassword = await argon2.hash(admin.password);

//         admin = { ...admin, password: hashedPassword };
//         return this.adminRepository.save(admin);
//     }

//     async getListAdmin(): Promise<any> {
//         const data = await this.adminRepository.find();

//         return data.map((e) => {
//             return {
//                 username: e.username,
//                 email: e.email,
//                 createdAt: e.createdAt,
//                 updatedAt: e.updatedAt,
//             };
//         });
//     }

//     //login
//     async validateAdmin(data: any): Promise<any> {
//         const { username, email } = data;
//         if (username) {
//             return this.getUserByUsername(username);
//         }
//         if (email) {
//             return this.getUserByEmail(email);
//         }
//         return null;
//     }

//     async validateAdminActive(email: any) {
//         let admin = await this.getUserByEmail(email);

//         if (admin) {
//             if (admin.isActive == 1) {
//                 return false;
//             } else {
//                 return true;
//             }
//         }

//         return false;
//     }

//     async isValidToken(token: string) {
//         return true;
//         // return await this.cacheManager.get(encrypt(token)) == '1';
//     }

//     async setValidToken(token: string) {
//         // await this.cacheManager.set(encrypt(token), '1');
//     }

//     async deleteValidToken(token: string) {
//         // await this.cacheManager.del(encrypt(token));
//     }

//     async login(user: any): Promise<any> {
//         const payload = { username: user.username, userId: user.id };
//         const token = this.jwtService.sign(payload, {
//             secret: process.env.JWT_SECRET,
//             expiresIn: process.env.JWT_EXPIRED,
//         });

//         await this.setValidToken(token);

//         return {
//             email: user.email,
//             type: user.type,
//             token,
//         };
//     }

//     async getUserByEmail(email: string): Promise<Admin | undefined> {
//         return this.adminRepository.findOne({ email: email });
//     }

//     async getUserByCode(code: string): Promise<Admin | undefined> {
//         return this.adminRepository.findOne({ code: code });
//     }

//     //register
//     async checkDuplicatedUser(data: CreatePartnership): Promise<any> {
//         //check duplicated username or email
//         const duplicatedUser = await this.getUserByEmailAndUsername(
//             data.email,
//             data.username
//         );
//         return duplicatedUser;
//     }

//     async checkPermissionUser(user: any): Promise<any> {
//         const userData = await this.adminRepository.findOne(user.id);
//         // check is super admin or not
//         if (userData.type == 1) {
//             return true;
//         }
//         return false;
//     }

//     async isAdmin(user: any): Promise<any> {
//         const userData = await this.adminRepository.findOne(user.id);
//         // check is super admin or not
//         if (userData.type == 1) {
//             return true;
//         }
//         return false;
//     }

//     async isPartnerShip(user: any): Promise<any> {
//         const userData = await this.adminRepository.findOne(user.id);
//         // console.log('userData: ', userData)
//         // check is partnership or not
//         if (userData.type == 2) {
//             return true;
//         }
//         return false;
//     }

//     async isActive(user: any): Promise<any> {
//         const userData = await this.adminRepository.findOne({id: user.id, isActive: AdminStatus.ACTIVE});
//         // check is active or not
//         if (userData) {
//             return true;
//         }
//         return false;
//     }

//     async checkPermissionRoleUser(user: any): Promise<any> {
//         const userData = await this.adminRepository.findOne(user.id);
//         if (userData.type == 0) {
//             return true;
//         }
//         return false;
//     }

//     async isFirstUser(token: string): Promise<any> {
//         const checkUser = await this.adminRepository.find();

//         if (!checkUser || checkUser.length == 0) return true;

//         if (!token) return false;

//         const p = this.isValidToken(token.split(" ")[1]);

//         if (!p) return false;

//         const user = this.jwtService.decode(token.split(" ")[1]);

//         const listAdmin = await this.getListAdmin();

//         if (!user || !listAdmin || listAdmin[0].username != user["username"])
//             return false;

//         return true;
//     }

//     async getUserByEmailAndUsername(
//         email: string,
//         username: string
//     ): Promise<Admin | undefined> {
//         return (
//             (await this.adminRepository.findOne({ username: username })) ||
//             (await this.adminRepository.findOne({ email: email }))
//         );
//     }

//     async health(token: string, user: Admin) {
//         if (!user || !user.username || !token) return false;

//         let dataUser = await this.getUserByUsername(user.username);
//         if (dataUser) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     async createPartnership(data: CreatePartnership): Promise<any> {
//         const hashedPassword = await argon2.hash(data.password);

//         const user = await this._registerUser(
//             data.email,
//             data.fullName,
//             data.username,
//             hashedPassword
//         );
//         return {
//             id: user.id,
//             email: user.email,
//             username: user.username,
//         };
//     }

//     async create(data: CreateAdmin): Promise<any> {
//         const hashedPassword = await argon2.hash(data.password);

//         const user = await this._registerAdmin(
//             data.email,
//             data.fullName,
//             data.username,
//             data.type,
//             hashedPassword
//         );
//         return {
//             id: user.id,
//             email: user.email,
//             username: user.username,
//             type: user.type,
//         };
//     }

//     async getToken(user: Admin) {
//         const token = this.jwtService.sign({
//             username: user.username,
//             time: Date.now(),
//         });

//         user = await this.adminRepository.save(user);

//         return token;
//     }

//     async _registerUser(
//         email: string,
//         fullname: string,
//         username: string,
//         password: string
//     ) {
//         let user = new Admin();
//         user.email = email;
//         user.fullName = fullname;
//         user.password = password;
//         user.username = username;
//         user = await this.adminRepository.save(user);
//         return user;
//     }

//     async _registerAdmin(
//         email: string,
//         fullname: string,
//         username: string,
//         type: number,
//         password: string
//     ) {
//         let user = new Admin();
//         user.email = email;
//         user.fullName = fullname;
//         user.password = password;
//         user.username = username;
//         user.type = type;
//         user = await this.adminRepository.save(user);
//         return user;
//     }

//     async logout(token: string) {
//         const tokenWithoutBearer = token.split(" ")[1];

//         await this.deleteValidToken(tokenWithoutBearer);
//     }

//     async getList(
//         params,
//         paginationOptions: IPaginationOptions
//     ): Promise<PaginationResponse<Admin>> {
//         let offset = getOffset(paginationOptions);
//         let limit = Number(paginationOptions.limit);
//         let queryBuilder = getConnection()
//             .createQueryBuilder(Admin, "admin")
//             .select(
//                 "admin.id, admin.username, admin.email,admin.is_active as isActive, admin.avatar_url as avatarUrl, " +
//                 "IFNULL(admin.client_id, admin.client_id) as clientId, " +
//                 "admin.full_name as fullName, admin.type, admin.created_at as createdAt, admin.updated_at as updatedAt"
//             )
//             .orderBy("admin.created_at", "DESC")
//             .limit(limit)
//             .offset(offset);
//         let queryCount = getConnection()
//             .createQueryBuilder(Admin, "admin")
//             .select(" Count (1) as Total")
//             .orderBy("admin.created_at", "DESC");
//         if (params.username && params.username !== "") {
//             if (
//                 params.username &&
//                 params.username.includes("%") != true &&
//                 params.username.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `admin.username like '%${params.username.trim()}%'`
//                 );
//                 queryCount.andWhere(
//                     `admin.username like '%${params.username.trim()}%'`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `admin.username like '%!${params.username.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.andWhere(
//                     `admin.username like '%!${params.username.trim()}%' ESCAPE '!'`
//                 );
//             }
//         }
//         if (params.isActive) {
//             queryBuilder.andWhere(`admin.is_active =:isActive`, {
//                 isActive: params.isActive,
//             });
//             queryCount.andWhere(`admin.is_active =:isActive`, {
//                 isActive: params.isActive,
//             });
//         }
//         if (params.email && params.email !== "") {
//             if (
//                 params.email.includes("%") != true &&
//                 params.email.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `admin.email like '%${params.email.trim()}%'`
//                 );
//                 queryCount.andWhere(
//                     `admin.email like '%${params.email.trim()}%'`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `admin.email like '%!${params.email.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.andWhere(
//                     `admin.email like '%!${params.email.trim()}%' ESCAPE '!'`
//                 );
//             }
//         }
//         if (params.type) {
//             queryBuilder.andWhere(`admin.type  =:type`, { type: params.type });
//             queryCount.andWhere(`admin.type  =:type`, { type: params.type });
//         }
//         const admins = await queryBuilder.execute();
//         const adminsCountList = await queryCount.execute();

//         const { items, meta } = getArrayPaginationBuildTotal<Admin>(
//             admins,
//             adminsCountList,
//             paginationOptions
//         );

//         return {
//             results: items,
//             pagination: meta,
//         };
//     }

//     async getListEndUser(
//         params,
//         paginationOptions: IPaginationOptions
//     ): Promise<PaginationResponse<Admin>> {
//         let offset = getOffset(paginationOptions);
//         let limit = Number(paginationOptions.limit);
//         let queryBuilder = getConnection()
//             .createQueryBuilder(User, "user")
//             .select(
//                 "user.id, user.username, user.email, user.status as status, user.avatar_url as avatarUrl, user.background_url as backgroundUrl, user.first_name as firstName, user.last_name as lastName, user.wallet as walletAddress, user.type as type, user.created_at as createdAt"
//             )
//             .orderBy("user.created_at", "DESC")
//             .limit(limit)
//             .offset(offset);
//         let queryCount = getConnection()
//             .createQueryBuilder(User, "user")
//             .select(" Count (1) as Total")
//             .orderBy("user.created_at", "DESC");
//         if (params.username && params.username !== "") {
//             if (
//                 params.username &&
//                 params.username.includes("%") != true &&
//                 params.username.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `user.username like '%${params.username.trim()}%'`
//                 );
//                 queryCount.andWhere(
//                     `user.username like '%${params.username.trim()}%'`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `user.username like '%!${params.username.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.andWhere(
//                     `user.username like '%!${params.username.trim()}%' ESCAPE '!'`
//                 );
//             }
//         }
//         if (params.status) {
//             queryBuilder.andWhere(`user.status =:status`, {
//                 status: params.status,
//             });
//             queryCount.andWhere(`user.status =:status`, {
//                 status: params.status,
//             });
//         }
//         if (params.email && params.email !== "") {
//             if (
//                 params.email.includes("%") != true &&
//                 params.email.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `user.email like '%${params.email.trim()}%'`
//                 );
//                 queryCount.andWhere(
//                     `user.email like '%${params.email.trim()}%'`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `user.email like '%!${params.email.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.andWhere(
//                     `user.email like '%!${params.email.trim()}%' ESCAPE '!'`
//                 );
//             }
//         }

//         if (params.wallet_address && params.wallet_address !== "") {
//             if (
//                 params.wallet_address.includes("%") != true &&
//                 params.wallet_address.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `user.wallet like '%${params.wallet_address.trim()}%'`
//                 );
//                 queryCount.andWhere(
//                     `user.wallet like '%${params.wallet_address.trim()}%'`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `user.wallet like '%!${params.wallet_address.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.andWhere(
//                     `user.wallet like '%!${params.wallet_address.trim()}%' ESCAPE '!'`
//                 );
//             }
//         }

//         const admins = await queryBuilder.execute();
//         const adminsCountList = await queryCount.execute();

//         const { items, meta } = getArrayPaginationBuildTotal<Admin>(
//             admins,
//             adminsCountList,
//             paginationOptions
//         );

//         return {
//             results: items,
//             pagination: meta,
//         };
//     }

//     async getListEndUserInWhitelist(
//         params,
//         paginationOptions: IPaginationOptions
//     ): Promise<PaginationResponse<User>> {
//         let offset = getOffset(paginationOptions);
//         let limit = Number(paginationOptions.limit);
//         let queryBuilder = getConnection()
//             .createQueryBuilder(User, "user")
//             .innerJoin(UserWhitelistLootBox, "user_whitelist", "user_whitelist.creator_id = user.id")
//             .innerJoin(Admin, "creator", "user_whitelist.user_id = creator.id")
//             .select(
//                 "user_whitelist.id as id, user.username, user.email, user.status as status, user.avatar_url as avatarUrl, " +
//                 "user.background_url as backgroundUrl, user.first_name as firstName, user.last_name as lastName, " +
//                 "user.wallet as walletAddress, creator.username as creatorBy, user_whitelist.created_at as createdAt"
//             )
//             .orderBy("user.created_at", "DESC")
//             .limit(limit)
//             .offset(offset);
//         let queryCount = getConnection()
//             .createQueryBuilder(User, "user")
//             .innerJoin(UserWhitelistLootBox, "user_whitelist", "user_whitelist.creator_id = user.id")
//             .select(" Count (1) as Total")
//             .orderBy("user_whitelist.created_at", "DESC");

//         if (params.filter && params.filter !== "") {
//             if (
//                 params.filter &&
//                 params.filter.includes("%") != true &&
//                 params.filter.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `(user.username like '%${params.filter.trim()}%') or (user.wallet like '%${params.filter.trim()}%')`
//                 );
//                 queryCount.andWhere(
//                     `(user.username like '%${params.filter.trim()}%') or (user.wallet like '%${params.filter.trim()}%')`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `user.username like '%!${params.filter.trim()}%' ESCAPE '!'`
//                 );
//                 queryBuilder.orWhere(
//                     `user.wallet like '%!${params.filter.trim()}%' ESCAPE '!'`
//                 )
//                 queryCount.andWhere(
//                     `user.username like '%!${params.filter.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.orWhere(
//                     `user.wallet like '%!${params.filter.trim()}%' ESCAPE '!'`
//                 )
//             }
//         }

//         const users = await queryBuilder.execute();
//         const usersCountList = await queryCount.execute();

//         const { items, meta } = getArrayPaginationBuildTotal<User>(
//             users,
//             usersCountList,
//             paginationOptions
//         );

//         return {
//             results: items,
//             pagination: meta,
//         };
//     }

//     async pagingFilterDataAdmin(
//         params: PagingFilterDataAdmin
//     ): Promise<PaginationResponse<Admin>> {
//         let offset = getOffset(params);
//         let limit = Number(params.limit);
//         let queryBuilder = getConnection()
//             .createQueryBuilder(Admin, "admin")
//             .select(
//                 "admin.id, admin.username, admin.email,admin.is_active as isActive, admin.avatar_url as avatarUrl, admin.full_name as fullName, admin.group, admin.status, admin.updated_at as updatedAt"
//             )
//             .orderBy("admin.updated_at", "DESC")
//             .limit(limit)
//             .offset(offset);
//         let queryCount = getConnection()
//             .createQueryBuilder(Admin, "admin")
//             .select(" Count (1) as Total")
//             .orderBy("admin.updated_at", "DESC");
//         if (params.username && params.username !== "") {
//             if (
//                 params.username &&
//                 params.username.includes("%") != true &&
//                 params.username.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `admin.username like '%${params.username.trim()}%'`
//                 );
//                 queryCount.andWhere(
//                     `admin.username like '%${params.username.trim()}%'`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `admin.username like '%!${params.username.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.andWhere(
//                     `admin.username like '%!${params.username.trim()}%' ESCAPE '!'`
//                 );
//             }
//         }
//         if (params.isActive) {
//             queryBuilder.andWhere(`admin.is_active =:isActive`, {
//                 isActive: params.isActive,
//             });
//             queryCount.andWhere(`admin.is_active =:isActive`, {
//                 isActive: params.isActive,
//             });
//         }
//         if (params.email && params.email !== "") {
//             if (
//                 params.email.includes("%") != true &&
//                 params.email.includes("_") != true
//             ) {
//                 queryBuilder.andWhere(
//                     `admin.email like '%${params.email.trim()}%'`
//                 );
//                 queryCount.andWhere(
//                     `admin.email like '%${params.email.trim()}%'`
//                 );
//             } else {
//                 queryBuilder.andWhere(
//                     `admin.email like '%!${params.email.trim()}%' ESCAPE '!'`
//                 );
//                 queryCount.andWhere(
//                     `admin.email like '%!${params.email.trim()}%' ESCAPE '!'`
//                 );
//             }
//         }
//         if (params.group) {
//             queryBuilder.andWhere(`admin.group  =:group`, {
//                 group: params.group,
//             });
//             queryCount.andWhere(`admin.group  =:group`, {
//                 group: params.group,
//             });
//         }
//         if (params.sort) {
//             this.scopeBySort(queryBuilder, params.sort);
//         }

//         const admins = await queryBuilder.execute();
//         const adminsCountList = await queryCount.execute();

//         let paginationOptions = {
//             page: params.page,
//             limit: params.limit,
//         };
//         const { items, meta } = getArrayPaginationBuildTotal<Admin>(
//             admins,
//             adminsCountList,
//             paginationOptions
//         );

//         return {
//             results: items,
//             pagination: meta,
//         };
//     }

//     /**
//      *
//      * @param query
//      * @param sort
//      */
//     scopeBySort(query: SelectQueryBuilder<Admin>, sort: Sort[]): void {
//         if (sort.includes(Sort.FULLNAME_DESC)) {
//             query.addOrderBy("admin.full_name", "DESC");
//         }
//         if (sort.includes(Sort.FULLNAME_ASC)) {
//             query.addOrderBy("admin.full_name", "ASC");
//         }
//         if (sort.includes(Sort.USERNAME_DESC)) {
//             query.addOrderBy("admin.username", "ASC");
//         }
//         if (sort.includes(Sort.USERNAME_ASC)) {
//             query.addOrderBy("admin.username", "DESC");
//         }
//         if (sort.includes(Sort.EMAIL_DESC)) {
//             query.addOrderBy("admin.email", "DESC");
//         }
//         if (sort.includes(Sort.EMAIL_ASC)) {
//             query.addOrderBy("admin.email", "ASC");
//         }
//         if (sort.includes(Sort.GROUP_DESC)) {
//             query.addOrderBy("admin.group", "ASC");
//         }
//         if (sort.includes(Sort.GROUP_ASC)) {
//             query.addOrderBy("admin.group", "DESC");
//         }
//         if (sort.includes(Sort.UPDATEAT_DESC)) {
//             query.addOrderBy("admin.updated_at", "ASC");
//         }
//         if (sort.includes(Sort.UPDATEAT_ASC)) {
//             query.addOrderBy("admin.updated_at", "DESC");
//         }
//     }

//     async getListAdminGroup(
//         params,
//         paginationOptions: IPaginationOptions
//     ): Promise<PaginationResponse<Admin>> {
//         let offset = getOffset(paginationOptions);
//         let limit = Number(paginationOptions.limit);
//         let queryBuilder = getConnection()
//             .createQueryBuilder(Admin, "admin")
//             .select(
//                 "admin.id, admin.username, admin.email, admin.avatar_url, admin.full_name, admin.group, admin.status, admin.updated_at"
//             )
//             .orderBy("admin.updated_at", "DESC")
//             .limit(limit)
//             .offset(offset)
//             .where("admin.group = :group", { group: params.group });
//         let queryCount = getConnection()
//             .createQueryBuilder(Admin, "admin")
//             .select(" Count (1) as Total")
//             .orderBy("admin.updated_at", "DESC")
//             .where("admin.group = :group", { group: params.group });
//         const admins = await queryBuilder.execute();
//         const adminsCountList = await queryCount.execute();

//         const { items, meta } = getArrayPaginationBuildTotal<Admin>(
//             admins,
//             adminsCountList,
//             paginationOptions
//         );

//         return {
//             results: items,
//             pagination: meta,
//         };
//     }

//     async getUserById(id: number): Promise<Admin | undefined> {
//         return this.adminRepository.findOne(id);
//     }

//     async getEndUserById(id: number): Promise<User | undefined> {
//         return this.endUserRepository.findOne(id);
//     }

//     async getEndUserByWallet(wallet: string): Promise<User | undefined> {
//         return await this.endUserRepository.findOne({
//             wallet: wallet
//         });
//     }

//     async getAdminWithNftInfoById(id: number): Promise<Admin | undefined> {
//         const admin = await getConnection()
//             .createQueryBuilder(Admin, "admin")
//             .select(
//                 "admin.id, admin.username, admin.email,admin.is_active as isActive, admin.avatar_url as avatarUrl, " +
//                 "admin.full_name as fullName, admin.type, IFNULL(admin.client_id, admin.client_id) as clientId, " +
//                 "admin.created_at as createdAt, admin.updated_at as updatedAt"
//             )
//             .leftJoin(
//                 Collection,
//                 "collection",
//                 "admin.id = collection.creator_id"
//             )
//             .addSelect(" Count(collection.id) as totalAmountCollection")
//             .where("admin.id = :adminId", { adminId: id })
//             .execute();
//         const collections = await getConnection()
//             .createQueryBuilder(Collection, "collection")
//             .select("*")
//             .where("collection.creator_id = :id", { id })
//             .execute();

//         let totalAmountNft = 0;
//         for (let i = 0; i < collections.length; i++) {
//             let currentCollection = collections[i];
//             const nftOwner = await getConnection()
//                 .createQueryBuilder(NftOwner, "nft_owner")
//                 .select("sum(nft_owner.amount) as totalAmountNft")
//                 .where("nft_owner.contract_address = :address", {
//                     address: currentCollection.address,
//                 })
//                 .andWhere("nft_owner.chain_id = :chainId", {
//                     chainId: currentCollection.chain_id,
//                 })
//                 .execute();
//             if (nftOwner[0] && nftOwner[0].totalAmountNft) {
//                 totalAmountNft += Number(nftOwner[0].totalAmountNft);
//             }
//         }
//         admin[0].totalAmountNft = totalAmountNft;
//         return admin[0];
//     }

//     async getEndUserWithNftInfoById(id: number): Promise<User | undefined> {
//         return await getConnection()
//             .createQueryBuilder(User, "user")
//             .select(
//                 "user.id, user.username, user.email, user.status as status, user.avatar_url as avatarUrl, user.background_url as backgroundUrl, user.first_name as firstName, user.last_name as lastName, user.wallet as walletAddress, user.type as type, user.created_at as createdAt"
//             )
//             .leftJoin(NftOwner, "nft_owner", "nft_owner.owner = user.wallet")
//             .addSelect("IFNULL(sum(nft_owner.amount), 0) as amountNft")
//             .where("user.id = :userId", { userId: id })
//             .getRawOne();
//     }

//     async getUserByUsername(username: string): Promise<Admin | undefined> {
//         return this.adminRepository.findOne({ username: username });
//     }

//     async updatePassword(user: Admin, data: any) {
//         if (!user || !user.username || !data) return false;

//         let dataUser = await this.getUserByEmailAndUsername(
//             user.email,
//             user.username
//         );
//         if (!dataUser) return false;

//         const isPassword = await argon2.verify(
//             dataUser.password,
//             data.oldPassword
//         );

//         if (!isPassword) return false;

//         const hashedNewPassword = await argon2.hash(data.newPassword);

//         dataUser.password = hashedNewPassword;
//         dataUser = await this.adminRepository.save(dataUser);

//         const { password, ...dataReturn } = dataUser;

//         return dataReturn;
//     }

//     async updateResetPassword(user: Admin, password: string) {
//         const hashedNewPassword = await argon2.hash(password);

//         user.password = hashedNewPassword;
//         user = await this.adminRepository.save(user);

//         delete user.code;
//         delete user.password;

//         return user;
//     }

//     async updateCode(user: Admin, code: string) {
//         user.code = code;
//         user = await this.adminRepository.save(user);

//         delete user.code;
//         delete user.password;

//         return user;
//     }

//     async genCode() {
//         const hashedSecret = await argon2.hash(Date.now().toString());
//         const code = this.jwtService.sign(
//             { data: hashedSecret },
//             {
//                 expiresIn: process.env.JWT_EXPIRED,
//                 secret: process.env.JWT_SECRET,
//             }
//         );
//         return code;
//     }

//     async updateProfileFileAdmin(user: Admin, data: any) {
//         //if (!user || !user.username || !data) return false;
//         if (!user || !user.username) return false;
//         let dataUser = await this.getUserByUsername(user.username);

//         if (!dataUser) return false;
//         if (data) {
//             for (const [key, value] of Object.entries(data)) {
//                 if (["fullName", "group", "isActive"].includes(key)) {
//                     dataUser[key] = value;
//                 }
//             }
//         }

//         dataUser = await this.adminRepository.save(dataUser);

//         const { password, ...dataReturn } = dataUser;

//         return dataReturn;
//     }

//     async updateProfileAdmin(user: Admin) {
//         let userAdmin = await this.adminRepository.findOne(user.id);

//         userAdmin.fullName = user.fullName;
//         userAdmin.type = user.type;
//         userAdmin.isActive = user.isActive;
//         userAdmin = await this.adminRepository.save(userAdmin);
//         return userAdmin;
//     }

//     async updateAdmin(user: Admin) {
//         return await this.adminRepository.save(user);
//     }

//     async updateStatus(is_active: number, user: Admin) {
//         user.isActive = is_active;
//         user = await this.adminRepository.save(user);
//         return user;
//     }

//     async updateEndUserStatus(status: string, user: User, token: string) {
//         if (user.status == UserStatus.REQUEST) {
//             throw Causes.CANNOT_BLOCK_REQUESTED_USER;
//         }
//         const currentStatus = user.status;
//         user.status = status;
//         user = await this.endUserRepository.save(user);
//         try {
//             if (user.status == UserStatus.ACTIVE) {
//                 await axios.post(
//                     process.env.ENDPOINT_API_SSO + `/users/update-status`,
//                     {
//                         isDisabled: 0,
//                         email: user.email,
//                     },
//                     {
//                         headers: { Authorization: 'Bearer ' +  token },
//                     }
//                 );
//             } else if (user.status == UserStatus.INACTIVE) {
//                 await axios.post(
//                     process.env.ENDPOINT_API_SSO + `/users/update-status`,
//                     {
//                         isDisabled: 1,
//                         email: user.email,
//                     },
//                     {
//                         headers: { Authorization: 'Bearer ' + token },
//                     }
//                 );
//             }
//         } catch (error) {
//             user.status = currentStatus;
//             await this.endUserRepository.save(user);
//             this.throwErrorSSO(error);
//         }
//         return user;
//     }

//     async deleteAdminById(id: number) {
//         const user = await this.adminRepository.findOne(id);
//         if (user) {
//             return this.adminRepository
//                 .createQueryBuilder("admin")
//                 .select("admin.id")
//                 .where("admin.id = :id", { id: id })
//                 .delete()
//                 .execute();
//         } else {
//             return false;
//         }
//     }

//     async deleteInvalidUserById(id: number) {
//         const user = await this.endUserRepository.findOne(id);
//         if (user) {
//             return this.endUserRepository
//                 .createQueryBuilder("user")
//                 .select("user.id")
//                 .where("user.id = :id", { id: id })
//                 .delete()
//                 .execute();
//         } else {
//             return false;
//         }
//     }

//     async removeUserFromWhitelist(id: number) {
//         return await this.userWhitelistRepository.delete(id)
//     }

//     async getWhitelistById(id: number) {
//         return await this.userWhitelistRepository.findOne(id)
//     }

//     private throwErrorSSO(error) {
//         throw new HttpException({
//             error: error.response.data.error,
//             error_code: error.response.data.error_code,
//         }, error.response.status);
//     }
// }
