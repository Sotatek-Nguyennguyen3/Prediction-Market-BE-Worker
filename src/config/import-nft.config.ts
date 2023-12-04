import { Causes } from "./exception/causes";

export const importNftConfig = {
  headers: [
    {
      name: "Token ID",
      inputName: "tokenId",
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
        return JSON.stringify(
          Causes.TOKEN_ID_IS_REQUIRED(headerName, rowNumber, columnNumber)
        );
      },
    },
    {
      name: "Amount",
      inputName: "amount",
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
        return JSON.stringify(
          Causes.AMOUNT_IS_REQUIRED(headerName, rowNumber, columnNumber)
        );
      },
    },
  ],
};
