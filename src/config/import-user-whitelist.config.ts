import { Causes } from "./exception/causes";

export const importUserWhitelistConfig = {
  headers: [
    {
      name: "Wallet Address",
      inputName: "address",
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
        return Causes.USER_WHITELIST_IS_REQUIRED(
          headerName,
          rowNumber,
          columnNumber
        );
      },
    },
  ],
};
