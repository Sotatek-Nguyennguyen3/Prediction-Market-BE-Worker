import { IAdmin } from "../../../database/interfaces/IAdmin.interface";

export const adminDataSeeds: IAdmin[] = [
  {
    username: "tutheblue",
    password: "Tu@theblue123",
    email: "tutheblue@gmail.com",
    avatarUrl: null,
    fullName: "tutheblue",
    isActive: 1,
    type: 1, // super admin
  },
];
