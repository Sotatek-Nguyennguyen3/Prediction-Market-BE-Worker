import { IKmsCmkInterface } from "../../../database/interfaces/IKmsCmk.interface";

require("dotenv").config();

export const kmsCmkDataSeeds: IKmsCmkInterface[] = [
  {
    id: process.env.KMS_CMK_ID,
    region: process.env.KMS_CMK_REGION,
    alias: process.env.KMS_CMK_ALIAS,
    arn: process.env.KMS_CMK_ARN,
    // default = true
    isEnabled: true,
  },
];
