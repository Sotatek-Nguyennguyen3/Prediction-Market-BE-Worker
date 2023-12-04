import { HttpException, HttpStatus } from "@nestjs/common";
import { JsonException } from "./exception.dto";

export class Causes {
  public static INTERNAL_ERROR = new JsonException(
    "Server internal error",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "INTERNAL_ERROR"
  );
  public static EMAIL_OR_PASSWORD_INVALID = new JsonException(
    "Email or Password is invalid",
    HttpStatus.UNAUTHORIZED,
    "EMAIL_OR_PASSWORD_INVALID"
  );
  public static NON_RECORDED_USERNAME = new JsonException(
    "This user is not registered, please register.",
    HttpStatus.UNAUTHORIZED,
    "NON_RECORDED_USERNAME"
  );
  public static USER_IN_BLACKLIST = new JsonException(
    "Your account has been locked. Please contact email support.verdant@gmail.com for inquiries!",
    HttpStatus.BAD_REQUEST,
    "USER_IN_BLACKLIST"
  );
  public static ADMIN_IS_NOT_ACTIVE = new JsonException(
    "Your account has been locked!",
    HttpStatus.BAD_REQUEST,
    "ADMIN_IS_NOT_ACTIVE"
  );
  public static TWOFA_INVALID = new JsonException(
    "TwoFactorAuthentication code is invalid",
    HttpStatus.BAD_REQUEST,
    "TWOFA_INVALID"
  );
  public static EMAIL_CODE_INVALID = new JsonException(
    "Email code is invalid",
    HttpStatus.BAD_REQUEST,
    "EMAIL_CODE_INVALID"
  );
  public static DUPLICATED_EMAIL_OR_USERNAME = new JsonException(
    "Email or username or Wallet was registered",
    HttpStatus.CONFLICT,
    "DUPLICATED_EMAIL_OR_USERNAME"
  );
  public static DUPLICATED_EMAIL = new JsonException(
    "This email already registered, please check",
    HttpStatus.CONFLICT,
    "DUPLICATED_EMAIL"
  );
  public static DUPLICATED_USERNAME = new JsonException(
    "This username already in use, please use other username",
    HttpStatus.CONFLICT,
    "DUPLICATED_USERNAME"
  );
  public static DUPLICATED_WALLET = new JsonException(
    "This wallet was registered, please check",
    HttpStatus.CONFLICT,
    "DUPLICATED_WALLET"
  );
  public static DUPLICATED_COMMISSION = new JsonException(
    "Commission already exist",
    HttpStatus.CONFLICT,
    "DUPLICATED_COMMISSION"
  );
  public static DUPLICATED_ACCOUNT = new JsonException(
    "wallet was registered",
    HttpStatus.CONFLICT,
    "DUPLICATED_ACCOUNT"
  );

  public static DUPLICATED_CLIENT_ID = new JsonException(
    "Client id exists",
    HttpStatus.CONFLICT,
    "DUPLICATED_CLIENT_ID"
  );

  public static ERROR_SSO = new JsonException(
    "Some error happen is sso server",
    HttpStatus.CONFLICT,
    "ERROR_SSO"
  );

  public static INVALID_SIGNATURE_WALLET = new JsonException(
    "Signature is not valid",
    HttpStatus.CONFLICT,
    "INVALID_SIGNATURE_WALLET"
  );
  public static NOT_ACCESS_CREATE_USER = new JsonException(
    "You cant access create new user",
    HttpStatus.CONFLICT,
    "NOT_ACCESS_CREATE_USER"
  );
  public static USER_NOT_ACCESS = new JsonException(
    "You can not access",
    HttpStatus.UNAUTHORIZED,
    "USER_NOT_ACCESS"
  );
  public static TOKEN_INVALID = new JsonException(
    "Token invalid",
    HttpStatus.UNAUTHORIZED,
    "TOKEN_INVALID"
  );
  public static IPAGINATION_OPTIONS_INVALID = new JsonException(
    "Page and limit have to greater than 0.",
    HttpStatus.BAD_REQUEST,
    "IPAGINATION_OPTIONS_INVALID"
  );
  public static LOCKED_ROUND = new JsonException(
    "Current round was locked",
    HttpStatus.BAD_REQUEST,
    "LOCKED_ROUND"
  );
  public static QUERY_OPTIONS_INVALID = new JsonException(
    "Query options is not valid",
    HttpStatus.BAD_REQUEST,
    "QUERY_OPTIONS_INVALID"
  );
  public static CURRENCY_INVALID = new JsonException(
    "Currency is not valid in system",
    HttpStatus.BAD_REQUEST,
    "CURRENCY_INVALID"
  );

  public static DATA_INVALID = new JsonException(
    "Data is not valid in system",
    HttpStatus.BAD_REQUEST,
    "DATA_INVALID"
  );

  public static PASSWORD_IS_FALSE = new JsonException(
    "The password you entered didn't match our record",
    HttpStatus.BAD_REQUEST,
    "PASSWORD_IS_FALSE"
  );

  public static NO_CHANGE_PASS = new JsonException(
    "Password can't be changed because the account is registered with Metamask wallet account",
    HttpStatus.BAD_REQUEST,
    "NO_CHANGE_PASS"
  );

  public static NO_USER_BY_WALLET = new JsonException(
    "Can't find account by wallet",
    HttpStatus.BAD_REQUEST,
    "NO_USER_BY_WALLET"
  );

  public static USER_IS_BLACKLIST = new JsonException(
    "This account has been added to the blacklist before",
    HttpStatus.BAD_REQUEST,
    "USER_IS_BLACKLIST"
  );

  public static DATA_DUPLICATE = new JsonException(
    "Data cannot be the same as the old Data",
    HttpStatus.BAD_REQUEST,
    "DATA_DUPLICATE"
  );

  public static FILE_SIZE_OVER = new JsonException(
    "Upload file size exceeds the allowed limit",
    HttpStatus.BAD_REQUEST,
    "FILE_SIZE_OVER"
  );

  public static FILE_TYPE_INVALID = new JsonException(
    "File type upload invalid",
    HttpStatus.BAD_REQUEST,
    "FILE_TYPE_INVALID"
  );

  public static PHONE_INVALID = new JsonException(
    "Phone is not valid",
    HttpStatus.BAD_REQUEST,
    "PHONE_INVALID"
  );

  public static DUPLICATE_PASSWORD = new JsonException(
    "The new password cannot be the same as the old password",
    HttpStatus.BAD_REQUEST,
    "DUPLICATE_PASSWORD"
  );

  public static DUPLICATE_SECRET = new JsonException(
    "The new client secret cannot be the same as the old client secret",
    HttpStatus.BAD_REQUEST,
    "DUPLICATE_SECRET"
  );

  public static UPDATE_PASSWORD_FAIL = new JsonException(
    "Update password failed",
    HttpStatus.BAD_REQUEST,
    "UPDATE_PASSWORD_FAIL"
  );

  public static USER_ERROR = new JsonException(
    "User does not exist or User has been't activated",
    HttpStatus.BAD_REQUEST,
    "USER_ERROR"
  );

  public static USER_BET_ONCHAIN_NOT_FOUND = new JsonException(
    "Can't find any bet with this wallet address",
    HttpStatus.BAD_REQUEST,
    "USER_BET_ONCHAIN_NOT_FOUND"
  );

  public static CURRENCY_INIT_FAIL = new JsonException(
    "Currency init process was failed",
    HttpStatus.BAD_REQUEST,
    "CURRENCY_INIT_FAIL"
  );
  /**
   * address
   */
  public static ADDRESS_NOT_FOUND = new JsonException(
    "Address not found",
    HttpStatus.NOT_FOUND,
    "ADDRESS_NOT_FOUND"
  );
  public static ADDRESS_NOT_BELONG_TO_WALLET = new JsonException(
    "Address does not belong to wallet",
    HttpStatus.BAD_REQUEST,
    "ADDRESS_NOT_BELONG_TO_WALLET"
  );
  public static CREATE_ADDRESS_FAILED = new JsonException(
    "Create address failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "CREATE_ADDRESS_FAILED"
  );
  public static ENCRYPT_PRIVATE_KEY_ERROR = new JsonException(
    "Encrypted private key invalid",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "ENCRYPT_PRIVATE_KEY_ERROR"
  );
  public static ADDRESS_INSIDE_SYSTEM = new JsonException(
    "Address is inside the system",
    HttpStatus.BAD_REQUEST,
    "ADDRESS_INSIDE_SYSTEM"
  );
  public static ADDRESS_INVALID = new JsonException(
    "Address invalid",
    HttpStatus.BAD_REQUEST,
    "ADDRESS_INVALID"
  );
  public static ADDRESS_NEED_MEMO = new JsonException(
    "Memo is required for the address",
    HttpStatus.BAD_REQUEST,
    "ADDRESS_NEED_MEMO"
  );

  /**
   * wallet
   */
  public static WALLET_NOT_FOUND = new JsonException(
    "Wallet not found",
    HttpStatus.NOT_FOUND,
    "WALLET_NOT_FOUND"
  );
  public static MISMATCH_WALLET_COIN_TYPE = new JsonException(
    "msg_coin_type_incorrect",
    HttpStatus.BAD_REQUEST,
    "MISMATCH_WALLET_COIN_TYPE"
  );
  public static WALLET_WITH_CURRENCY_EXISTED = new JsonException(
    "Wallet with currency existed",
    HttpStatus.BAD_REQUEST,
    "WALLET_WITH_CURRENCY_EXISTED"
  );
  public static WALLET_WITH_CURRENCY_NOT_CREATED = new JsonException(
    "Wallet with currency was not created",
    HttpStatus.BAD_REQUEST,
    "WALLET_WITH_CURRENCY_NOT_CREATED"
  );
  /**
   * hot wallet
   */
  public static HOT_WALLET_NOT_FOUND = new JsonException(
    "Hot wallet not found",
    HttpStatus.NOT_FOUND,
    "HOT_WALLET_NOT_FOUND"
  );
  public static HOT_WALLET_EXISTED = new JsonException(
    "Hot wallet of user existed",
    HttpStatus.BAD_REQUEST,
    "HOT_WALLET_EXISTED"
  );
  public static HOT_WALLET_TYPE_INVALID = new JsonException(
    "Hot wallet type is not invalid",
    HttpStatus.BAD_REQUEST,
    "HOT_WALLET_TYPE_INVALID"
  );
  public static LOWER_THRESHOLD_MUST_BE_GREATER_THAN_0 = new JsonException(
    "Lower threshold must be greater than 0",
    HttpStatus.BAD_REQUEST,
    "LOWER_THRESHOLD_MUST_BE_GREATER_THAN_0"
  );
  public static LOWER_THRESHOLD_MUST_BE_LESS_THAN_UPPER_MIDDLE =
    new JsonException(
      "Lower threshold must be less than upper threshold and middle threshold",
      HttpStatus.BAD_REQUEST,
      "LOWER_THRESHOLD_MUST_BE_LESS_THAN_UPPER_MIDDLE"
    );
  public static MIDDLE_THRESHOLD_MUST_BE_LESS_THAN_UPPER = new JsonException(
    "Middle threshold must be less than upper threshold",
    HttpStatus.BAD_REQUEST,
    "MIDDLE_THRESHOLD_MUST_BE_LESS_THAN_UPPER"
  );
  /**
   * kms
   **/
  public static KMS_DATA_KEY_NOT_FOUND = new JsonException(
    "msg_kms_data_key_not_found",
    HttpStatus.NOT_FOUND,
    "KMS_DATA_KEY_NOT_FOUND"
  );
  public static KMS_CMK_NOT_FOUND = new JsonException(
    "msg_kms_cmk_not_found",
    HttpStatus.NOT_FOUND,
    "KMS_CMK_NOT_FOUND"
  );
  public static KMS_CMK_INVALID = new JsonException(
    "msg_kms_cmk_invalid",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "KMS_CMK_INVALID"
  );
  public static ONLY_SUPPORT_STRING = new JsonException(
    "msg_only_support_encrypt_string",
    HttpStatus.BAD_REQUEST,
    "ONLY_SUPPORT_STRING"
  );

  /**
   * blockchain
   */
  public static GET_BALANCE_FAIL = new JsonException(
    "Get balance fail",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "GET_BALANCE_FAIL"
  );

  /**
   * deposit
   */
  public static DEPOSIT_AMOUNT_GREATER_THAN_BALANCE = new JsonException(
    "Deposit amount is greater than address balance",
    HttpStatus.BAD_REQUEST,
    "DEPOSIT_AMOUNT_GREATER_THAN_BALANCE"
  );
  public static DEPOSIT_NOT_FOUND = new JsonException(
    "Deposit not found",
    HttpStatus.NOT_FOUND,
    "DEPOSIT_NOT_FOUND"
  );
  public static LOCAL_TX_NOT_INSERTED_AFTER_COLLECTING = new JsonException(
    "Local tx not inserted after collecting",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "LOCAL_TX_NOT_INSERTED_AFTER_COLLECTING"
  );

  /**
   * withdrawals
   */
  public static WITHDRAW_FROM_INTERNAL_ADDRESS = new JsonException(
    "Cannot withdraw to an address inside the system",
    HttpStatus.BAD_REQUEST,
    "WITHDRAW_FROM_INTERNAL_ADDRESS"
  );
  public static WALLET_BALANCE_NOT_FOUND_COIN = new JsonException(
    "Wallet balance not found, hot wallet need platform coin to send token.",
    HttpStatus.NOT_FOUND,
    "WALLET_BALANCE_NOT_FOUND_COIN"
  );
  public static WITHDRAWAL_AMOUNT_MUST_GREATER_THAN_ZERO = new JsonException(
    "Withdrawal amount must greater than 0",
    HttpStatus.BAD_REQUEST,
    "WITHDRAWAL_AMOUNT_MUST_GREATER_THAN_ZERO"
  );

  /**
   * webhook
   **/
  public static WEBHOOK_NOT_FOUND = new JsonException(
    "Webhook not found.",
    HttpStatus.NOT_FOUND,
    "WEBHOOK_NOT_FOUND"
  );
  public static WEBHOOK_ALREADY_EXIST = new JsonException(
    "Webhook already exist.",
    HttpStatus.BAD_REQUEST,
    "WEBHOOK_ALREADY_EXIST"
  );
  public static CURRENCY_NOT_SUPPORT = new JsonException(
    "Currency not support",
    HttpStatus.BAD_REQUEST,
    "CURRENCY_NOT_SUPPORT"
  );
  public static METHOD_NOT_SUPPORT = new JsonException(
    "Method not support",
    HttpStatus.BAD_REQUEST,
    "METHOD_NOT_SUPPORT"
  );
  public static INVALID_ID = new JsonException(
    "id is not valid",
    HttpStatus.BAD_REQUEST,
    "INVALID_ID"
  );
  public static TOKEN_NOT_FOUND = new JsonException(
    "Tokens are not found",
    HttpStatus.BAD_REQUEST,
    "TOKEN_NOT_FOUND"
  );

  /**
   * Admin authentication
   * */

  public static CODE_RESET_PASS_INVALID = new JsonException(
    "Code to reset password invalid",
    HttpStatus.BAD_REQUEST,
    "CODE_RESET_PASS_INVALID"
  );

  public static USER_DONT_HAVE_PERMISSION = new JsonException(
    "You don't have permission to access",
    HttpStatus.UNAUTHORIZED,
    "USER_DONT_HAVE_PERMISSION"
  );

  public static USER_IS_NOT_PARTNERSHIP = new JsonException(
    "User is not partnership",
    HttpStatus.UNAUTHORIZED,
    "USER_IS_NOT_PARTNERSHIP"
  );

  public static USER_CANNOT_CHANGE_STATUS_OF_YOURSELF = new JsonException(
    "You cannot freeze/unfreeze yourself",
    HttpStatus.UNAUTHORIZED,
    "USER_CANNOT_CHANGE_STATUS_OF_YOURSELF"
  );

  public static USER_WITH_ID_NOT_EXIST = new JsonException(
    "User with this id does not exist in system",
    HttpStatus.BAD_REQUEST,
    "USER_WITH_ID_NOT_EXIST"
  );

  public static JWT_EXPIRED = new JsonException(
    "jwt expired",
    HttpStatus.UNAUTHORIZED,
    "JWT_EXPIRED"
  );

  public static COLLECTION_NAME_EXISTS = new JsonException(
    "Collection name exists, please use another name",
    HttpStatus.BAD_REQUEST,
    "COLLECTION_NAME_EXISTS"
  );

  public static COLLECTION_ADDRESS_EXISTS = new JsonException(
    "Collection address exists, please use another address",
    HttpStatus.BAD_REQUEST,
    "COLLECTION_ADDRESS_EXISTS"
  );

  public static COLLECTION_NOT_EXISTS = new JsonException(
    "Collection does not exists",
    HttpStatus.BAD_REQUEST,
    "COLLECTION_NOT_EXISTS"
  );

  public static CHAIN_ID_NOT_EXISTS = new JsonException(
    "Chain id does not exists",
    HttpStatus.BAD_REQUEST,
    "CHAIN_ID_NOT_EXISTS"
  );

  public static CONTRACT_ADDRESS_IS_CONFLICT_WITH_TYPE = new JsonException(
    "Contract address is conflict with type",
    HttpStatus.BAD_REQUEST,
    "CONTRACT_ADDRESS_IS_CONFLICT_WITH_TYPE"
  );

  public static BLOCKCHAIN_IS_NOT_STARTED = new JsonException(
    `blockchain service is not started yet...`,
    HttpStatus.INTERNAL_SERVER_ERROR,
    "BLOCKCHAIN_IS_NOT_STARTED"
  );

  public static DISCOUNT_CODE_IN_USE_BY_LOOTBOX = (lootBoxName: string) =>
    new JsonException(
      `Code cannot be delete because ${lootBoxName} still using this code`,
      HttpStatus.BAD_REQUEST,
      "DISCOUNT_CODE_IN_USE_BY_LOOTBOX",
      { value_1: lootBoxName }
    );

  public static REASON_EMPTY = new JsonException(
    "You must provide a reason",
    HttpStatus.BAD_REQUEST,
    "REASON_EMPTY"
  );

  public static FILES_CANNOT_UPLOAD = new JsonException(
    "Files cannot upload",
    HttpStatus.BAD_REQUEST,
    "FILES_CANNOT_UPLOAD"
  );

  /**
   * home config management
   */
  public static TYPE_CONFIG_INVALID = new JsonException(
    "Type config is invalid",
    HttpStatus.BAD_REQUEST,
    "TYPE_CONFIG_INVALID"
  );

  public static ITEM_LIST_ID_NOT_NUMBER = new JsonException(
    "ID in list is not number",
    HttpStatus.BAD_REQUEST,
    "ITEM_LIST_ID_NOT_NUMBER"
  );

  public static ITEM_LIST_ID_NOT_EXISTS_IN_SYSTEM = new JsonException(
    "ID in list not exist in system",
    HttpStatus.BAD_REQUEST,
    "ITEM_LIST_ID_NOT_EXISTS_IN_SYSTEM"
  );

  public static EXIST_AT_LEAST_A_NFT_CENSORED = new JsonException(
    "There exists a nft is censored",
    HttpStatus.BAD_REQUEST,
    "EXIST_AT_LEAST_A_NFT_CENSORED"
  );

  public static EXIST_AT_LEAST_A_NFT_IS_NOT_AUCTION = new JsonException(
    "There exists a nft is not in auction",
    HttpStatus.BAD_REQUEST,
    "EXIST_AT_LEAST_A_NFT_IS_NOT_AUCTION"
  );

  public static AUCTION_DOES_NOT_EXIST = new JsonException(
    "auction does not exist with this id",
    HttpStatus.BAD_REQUEST,
    "AUCTION_DOES_NOT_EXIST"
  );

  public static CANNOT_UPLOAD_IMAGE = new JsonException(
    "Cannot upload image",
    HttpStatus.BAD_REQUEST,
    "CANNOT_UPLOAD_IMAGE"
  );

  public static CANNOT_DELETE_IMAGE = new JsonException(
    "Cannot delete image",
    HttpStatus.BAD_REQUEST,
    "CANNOT_DELETE_IMAGE"
  );

  public static FAQ_DUPLICATE = new JsonException(
    "FAQ with question duplicate",
    HttpStatus.BAD_REQUEST,
    "FAQ_DUPLICATE"
  );

  public static CATEGORY_UNDEFINED = new JsonException(
    "Category undefined",
    HttpStatus.BAD_REQUEST,
    "CATEGORY_UNDEFINED"
  );

  public static USER_DOES_NOT_EXIST_WITH_THIS_EMAIL = new JsonException(
    "User does not exist with this email",
    HttpStatus.BAD_REQUEST,
    "USER_DOES_NOT_EXIST_WITH_THIS_EMAIL"
  );

  public static USER_DOES_NOT_EXIST_WITH_THIS_WALLET = new JsonException(
    "User does not exist with this wallet address",
    HttpStatus.BAD_REQUEST,
    "USER_DOES_NOT_EXIST_WITH_THIS_WALLET"
  );

  public static USER_ALREADY_IN_WHITELIST = new JsonException(
    "User is already in whitelist",
    HttpStatus.BAD_REQUEST,
    "USER_ALREADY_IN_WHITELIST"
  );

  public static USER_IS_NOT_IN_WHITELIST = new JsonException(
    "User is not in whitelist",
    HttpStatus.BAD_REQUEST,
    "USER_IS_NOT_IN_WHITELIST"
  );

  public static USER_INACTIVE_OR_BLOCKED = new JsonException(
    "User is inactive or blocked",
    HttpStatus.BAD_REQUEST,
    "USER_INACTIVE_OR_BLOCKED"
  );

  public static CANNOT_BLOCK_REQUESTED_USER = new JsonException(
    "You cannot block requested user",
    HttpStatus.BAD_REQUEST,
    "CANNOT_BLOCK_REQUESTED_USER"
  );

  public static DISCOUNT_CODE_EXISTS = new JsonException(
    "Discount code already exists",
    HttpStatus.BAD_REQUEST,
    "DISCOUNT_CODE_EXISTS"
  );

  public static LOOT_BOX_OUT_OF_BUYABLE = (lootBoxMaxOpen: number) =>
    new JsonException(
      `You cannot buy over ${lootBoxMaxOpen} loot boxes at the same time`,
      HttpStatus.BAD_REQUEST,
      "LOOT_BOX_OUT_OF_BUYABLE",
      { value_1: lootBoxMaxOpen }
    );

  public static LOOT_BOX_NAME_CODE_EXISTS = new JsonException(
    "Loot box name already exists",
    HttpStatus.BAD_REQUEST,
    "LOOT_BOX_NAME_CODE_EXISTS"
  );

  public static LOOT_BOX_DOES_NOT_EXIST = new JsonException(
    "Loot box does not exist",
    HttpStatus.BAD_REQUEST,
    "LOOT_BOX_DOES_NOT_EXIST"
  );

  public static CANNOT_UPDATE_OWNER_OF_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot update owner of this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_UPDATE_OWNER_OF_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_UPDATE_TYPE_OF_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot update type of this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_UPDATE_TYPE_OF_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_UPDATE_MAX_QUANTITY_PER_OPEN_OF_CONFIRMED_LOOT_BOX =
    new JsonException(
      `You cannot update max quantity per open of this confirmed loot box`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_UPDATE_MAX_QUANTITY_PER_OPEN_OF_CONFIRMED_LOOT_BOX"
    );

  public static CANNOT_UPDATE_COLLECTION_ADDRESS_OF_CONFIRMED_LOOT_BOX =
    new JsonException(
      `You cannot update collection address of this confirmed loot box`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_UPDATE_COLLECTION_ADDRESS_OF_CONFIRMED_LOOT_BOX"
    );

  public static CANNOT_UPDATE_PRICE_OF_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot update price of this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_UPDATE_PRICE_OF_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_UPDATE_START_TIME_OF_CONFIRMED_LOOT_BOX =
    new JsonException(
      `You cannot update start time of this confirmed loot box`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_UPDATE_START_TIME_OF_CONFIRMED_LOOT_BOX"
    );

  public static CANNOT_UPDATE_END_TIME_OF_CONFIRMED_LOOT_BOX =
    new JsonException(
      `You cannot update end time of this confirmed loot box`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_UPDATE_END_TIME_OF_CONFIRMED_LOOT_BOX"
    );

  public static CANNOT_UPDATE_PAYMENT_TOKEN_TIME_OF_CONFIRMED_LOOT_BOX =
    new JsonException(
      `You cannot update payment token of this confirmed loot box`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_UPDATE_PAYMENT_TOKEN_TIME_OF_CONFIRMED_LOOT_BOX"
    );

  public static CANNOT_ADD_RARITY_OF_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot add rarity of this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_ADD_RARITY_OF_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_UPDATE_INDEX_RARITY_OF_CONFIRMED_LOOT_BOX =
    new JsonException(
      `You cannot update index rarity of this confirmed loot box`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_UPDATE_INDEX_RARITY_OF_CONFIRMED_LOOT_BOX"
    );

  public static CANNOT_UPDATE_PROBABILITY_RARITY_OF_CONFIRMED_LOOT_BOX =
    new JsonException(
      `You cannot update probability rarity of this confirmed loot box`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_UPDATE_PROBABILITY_RARITY_OF_CONFIRMED_LOOT_BOX"
    );

  public static CANNOT_REMOVE_RARITY_OF_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot remove rarity of this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_REMOVE_RARITY_OF_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_IMPORT_NFT_INTO_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot import nft into this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_IMPORT_NFT_INTO_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_ADD_NFT_INTO_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot add nft into this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_ADD_NFT_INTO_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_UPDATE_NFT_OF_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot update nft of this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_UPDATE_NFT_OF_CONFIRMED_LOOT_BOX"
  );

  public static CANNOT_REMOVE_NFT_OF_CONFIRMED_LOOT_BOX = new JsonException(
    `You cannot remove nft of this confirmed loot box`,
    HttpStatus.BAD_REQUEST,
    "CANNOT_REMOVE_NFT_OF_CONFIRMED_LOOT_BOX"
  );

  public static WALLET_ADDRESS_INVALID = new JsonException(
    "Please input invalid Wallet Address",
    HttpStatus.BAD_REQUEST,
    "WALLET_ADDRESS_INVALID"
  );

  public static WHITELIST_ADDRESS_CANNOT_BE_OWNER = new JsonException(
    "Whitelist address cannot be owner",
    HttpStatus.BAD_REQUEST,
    "WHITELIST_ADDRESS_CANNOT_BE_OWNER"
  );

  public static LOOT_BOX_ERC721_CANNOT_UPDATE_AMOUNT = new JsonException(
    "Loot box ERC721 cannot update amount of nft",
    HttpStatus.BAD_REQUEST,
    "LOOT_BOX_ERC721_CANNOT_UPDATE_AMOUNT"
  );

  public static DISCOUNT_CODE_DOES_NOT_EXIST = new JsonException(
    "Discount code does not exists",
    HttpStatus.BAD_REQUEST,
    "DISCOUNT_CODE_DOES_NOT_EXIST"
  );

  public static RARITIES_INDEX_IS_DUPLICATE = new JsonException(
    "Rarities contain duplication indexes",
    HttpStatus.BAD_REQUEST,
    "RARITIES_INDEX_IS_DUPLICATE"
  );

  public static RARITIES_NAME_IS_DUPLICATE = new JsonException(
    "Rarities contain duplication names",
    HttpStatus.BAD_REQUEST,
    "RARITIES_NAME_IS_DUPLICATE"
  );

  public static RARITY_DOES_NOT_EXIST = new JsonException(
    "Rarity does not exist",
    HttpStatus.BAD_REQUEST,
    "RARITY_DOES_NOT_EXIST"
  );

  public static RARITY_NFT_ONCHAIN_DOES_NOT_EXIST = new JsonException(
    "Nft does not exist",
    HttpStatus.BAD_REQUEST,
    "RARITY_NFT_ONCHAIN_DOES_NOT_EXIST"
  );

  public static TOTAL_PERCENT_INVALID = new JsonException(
    "Total percent of rarities need be equal to 100.00",
    HttpStatus.BAD_REQUEST,
    "TOTAL_PERCENT_INVALID"
  );

  public static REQUIRE_CHAIN_ID_PARAMS = new JsonException(
    "Require chain id params",
    HttpStatus.BAD_REQUEST,
    "REQUIRE_CHAIN_ID_PARAMS"
  );

  public static DOES_NOT_HAVE_ANY_NFT_WITH_DATA = new JsonException(
    "Doesn't have any nft",
    HttpStatus.BAD_REQUEST,
    "DOES_NOT_HAVE_ANY_NFT_WITH_DATA"
  );

  public static EXIST_AT_LEAST_A_LOOT_BOX_CANCELED = new JsonException(
    "There exists a lootbox canceled",
    HttpStatus.BAD_REQUEST,
    "EXIST_AT_LEAST_A_LOOT_BOX_CANCELED"
  );

  public static DID_NOT_CONFIG_MASTER_WALLET = new JsonException(
    "Did not config master wallet in server",
    HttpStatus.BAD_REQUEST,
    "DID_NOT_CONFIG_MASTER_WALLET"
  );

  public static WHITE_LIST_DUPLICATE = new JsonException(
    "White list sale with wallet duplicate",
    HttpStatus.BAD_REQUEST,
    "WHITE_LIST_DUPLICATE"
  );

  public static WHITELIST_SALE_ALREADY_EXISTS = new JsonException(
    "Wallet already in whitelist sale",
    HttpStatus.BAD_REQUEST,
    "WHITELIST_SALE_ALREADY_EXISTS"
  );

  public static DUPLICATED_UPDATE_WALLET = new JsonException(
    "Exist duplicate wallets in the list",
    HttpStatus.CONFLICT,
    "DUPLICATED_UPDATE_WALLET"
  );

  public static DUPLICATED_UPDATE_EMAIL = new JsonException(
    "Email already in used by another account",
    HttpStatus.CONFLICT,
    "DUPLICATED_UPDATE_EMAIL"
  );

  public static DUPLICATED_UPDATE_IDS = new JsonException(
    "Exist duplicate ids in the list",
    HttpStatus.CONFLICT,
    "DUPLICATED_UPDATE_IDS"
  );

  public static EXIST_AT_LEAST_ONE_NFT_INVALID = new JsonException(
    "Exist at least one nft invalid",
    HttpStatus.CONFLICT,
    "EXIST_AT_LEAST_ONE_NFT_INVALID"
  );

  /**
   * banner slide
   * */
  public static CREATE_BANNER_SLIDE_FAILED = new JsonException(
    "Create banner slide failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "CREATE_BANNER_SLIDE_FAILED"
  );

  public static UPDATE_BANNER_SLIDE_FAILED = new JsonException(
    "Update banner slide failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "UPDATE_BANNER_SLIDE_FAILED"
  );

  public static BANNER_DOES_NOT_EXIST = new JsonException(
    "Banner slide does not exist",
    HttpStatus.BAD_REQUEST,
    "BANNER_DOES_NOT_EXIST"
  );

  public static DEL_BANNER_FAILED = new JsonException(
    "Delete banner slide failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "DEL_BANNER_FAILED"
  );

  /**
   * collection
   * */
  public static COLLECTION_DOES_NOT_EXIST = new JsonException(
    "Collection does not exist",
    HttpStatus.BAD_REQUEST,
    "COLLECTION_DOES_NOT_EXIST"
  );

  public static CREATE_DISCOUNT_CODE_FAILED = new JsonException(
    "Create discount code failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "CREATE_DISCOUNT_CODE_FAILED"
  );

  public static UPDATE_DISCOUNT_CODE_FAILED = new JsonException(
    "Update discount code failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "UPDATE_DISCOUNT_CODE_FAILED"
  );

  public static DEL_FAQ_FAILED = new JsonException(
    "Delete FAQ failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "DEL_FAQ_FAILED"
  );

  public static FAQ_DOES_NOT_EXIST = new JsonException(
    "FAQ does not exist",
    HttpStatus.BAD_REQUEST,
    "FAQ_DOES_NOT_EXIST"
  );

  public static REQUIRE_TYPE_FEATURED_PARAMS = new JsonException(
    "Require type featured params",
    HttpStatus.BAD_REQUEST,
    "REQUIRE_TYPE_FEATURED_PARAMS"
  );

  public static CREATE_FEATURED_FAILED = new JsonException(
    "Create featured failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "CREATE_FEATURED_FAILED"
  );

  public static UPDATE_FEATURED_FAILED = new JsonException(
    "Update featured failed",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "UPDATE_FEATURED_FAILED"
  );

  public static NFT_DOES_NOT_EXIST = new JsonException(
    "NFT does not exist",
    HttpStatus.BAD_REQUEST,
    "NFT_DOES_NOT_EXIST"
  );

  public static NFT_CANNOT_CENSOR = new JsonException(
    "NFT cannot censor, exist at least one nft in sale, auction or lootbox",
    HttpStatus.BAD_REQUEST,
    "NFT_CANNOT_CENSOR"
  );

  public static TOKEN_ID_IS_DUPLICATE = (tokenId) =>
    new JsonException(
      `Token ID: ${tokenId} duplicate, please remove one of them`,
      HttpStatus.BAD_REQUEST,
      "TOKEN_ID_IS_DUPLICATED",
      { value_1: tokenId }
    );

  public static WALLET_ADDRESS_IS_DUPLICATE = (address) =>
    new JsonException(
      `This Address: ${address} is already in the list`,
      HttpStatus.BAD_REQUEST,
      "WALLET_ADDRESS_IS_DUPLICATED",
      { value_1: address }
    );

  public static TOKEN_ID_IS_REQUIRED = (headerName, rowNumber, columnNumber) =>
    new JsonException(
      `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`,
      HttpStatus.BAD_REQUEST,
      "TOKEN_ID_IS_REQUIRED",
      {
        value_1: headerName,
        value_2: rowNumber,
        value_3: columnNumber,
      }
    );

  public static AMOUNT_IS_REQUIRED = (headerName, rowNumber, columnNumber) =>
    new JsonException(
      `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`,
      HttpStatus.BAD_REQUEST,
      "AMOUNT_IS_REQUIRED",
      {
        value_1: headerName,
        value_2: rowNumber,
        value_3: columnNumber,
      }
    );

  public static USER_WHITELIST_IS_REQUIRED = (
    headerName,
    rowNumber,
    columnNumber
  ) =>
    new JsonException(
      `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`,
      HttpStatus.BAD_REQUEST,
      "USER_WHITELIST_IS_REQUIRED",
      {
        value_1: headerName,
        value_2: rowNumber,
        value_3: columnNumber,
      }
    );

  public static CANNOT_ADD_OR_IMPORT_OWNER_WALLET_INTO_WHITELIST = (wallet) =>
    new JsonException(
      `Cannot add or import wallet address: ${wallet} into whitelist`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_ADD_OR_IMPORT_OWNER_WALLET_INTO_WHITELIST",
      {
        value_1: wallet,
      }
    );

  public static AMOUNT_OF_TOKEN_ID_INVALID = (tokenId) =>
    new JsonException(
      `Please input valid amount for Token ID: ${tokenId}`,
      HttpStatus.BAD_REQUEST,
      "AMOUNT_OF_TOKEN_ID_INVALID",
      { value_1: tokenId }
    );

  public static CANNOT_FIND_TOKEN_ID = (tokenId) =>
    new JsonException(
      `We can’t find Token ID: ${tokenId} in your wallet`,
      HttpStatus.BAD_REQUEST,
      "CANNOT_FIND_TOKEN_ID",
      { value_1: tokenId }
    );

  public static TOKEN_ID_EXISTS_IN_OTHER_RARITY = (tokenId) =>
    new JsonException(
      `You can’t pick same NFT TokenId: ${tokenId} on different rarity`,
      HttpStatus.BAD_REQUEST,
      "TOKEN_ID_EXISTS_IN_OTHER_RARITY",
      { value_1: tokenId }
    );

  // exchange-token
  public static USER_NOT_ACTIVE_2FA = new JsonException(
    "User is not active 2FA",
    HttpStatus.BAD_REQUEST,
    "USER_NOT_ACTIVE_2FA"
  );

  public static INVALID_SIGNATURE = new JsonException(
    "Invalid signature",
    HttpStatus.BAD_REQUEST,
    "INVALID_SIGNATURE"
  );

  public static GAME_SERVER_ERROR = new JsonException(
    "Something went wrong in game server, please try again later",
    HttpStatus.BAD_REQUEST,
    "GAME_SERVER_ERROR"
  );

  public static NOT_ENOUGH_BALANCE = new JsonException(
    "Not enough balance",
    HttpStatus.BAD_REQUEST,
    "NOT_ENOUGH_BALANCE"
  );

  public static TRANSACTION_NOT_FOUND = (id) =>
    new JsonException(
      `Transaction with ${id} not found`,
      HttpStatus.BAD_REQUEST,
      "TRANSACTION_NOT_FOUND"
    );

  /** DTO */
  // USER MODULES
  public static USERNAME_STRING = {
    message: "Username must be string",
    error_code: "USERNAME_STRING",
  };

  public static USERNAME_EMPTY = {
    message: "Username must not be empty",
    error_code: "USERNAME_EMPTY",
  };

  public static USERNAME_MIN_LENGTH = {
    message:
      "Username too short, please use another user name (within 3 ~ 256 characters)",
    error_code: "USERNAME_MIN_LENGTH",
  };

  public static USERNAME_MAX_LENGTH = {
    message:
      "Username too long, please use another user name (within 3 ~ 256 characters)",
    error_code: "USERNAME_MAX_LENGTH",
  };

  public static USERNAME_MATCH_PATTERN = {
    message: "Username invalid",
    error_code: "USERNAME_MATCH_PATTERN",
  };

  public static EMAIL_EMPTY = {
    message: "Email must not be empty",
    error_code: "EMAIL_EMPTY",
  };

  public static EMAIL_INVALID = {
    message: "Please enter valid email address!",
    error_code: "EMAIL_INVALID",
  };

  public static EMAIL_TOO_SHORT = {
    message: "Email is too short, no shorter than 6 characters",
    error_code: "EMAIL_TOO_LONG",
  };

  public static EMAIL_TOO_LONG = {
    message: "Email is too long, no longer than 256 characters",
    error_code: "EMAIL_TOO_LONG",
  };

  public static PASSWORD_EMPTY = {
    message: "Password must not be empty",
    error_code: "PASSWORD_EMPTY",
  };

  public static PASSWORD_STRING = {
    message: "Password must not be a string",
    error_code: "PASSWORD_STRING",
  };

  public static PASSWORD_MIN_LENGTH = {
    message: "Password is too short, at least 8 characters",
    error_code: "PASSWORD_MIN_LENGTH",
  };

  public static PASSWORD_MAX_LENGTH = {
    message: "Password is too long, no longer then 20 characters",
    error_code: "PASSWORD_MAX_LENGTH",
  };

  public static PASSWORD_MATCH_PATTERN = {
    message:
      "Please follow the guideline to create your own password, at least: \n- 1 Capital letter \n- 1 Small case letter \n- 1 Symbol \n- Within 8 ~ 20 characters",
    error_code: "PASSWORD_MATCH_PATTERN",
  };

  public static NONCE_MATCH_PATTERN = {
    message: "Nonce must be a positive number",
    error_code: "NONCE_MATCH_PATTERN",
  };

  public static WALLET_STRING = {
    message: "Wallet address must be a string",
    error_code: "WALLET_STRING",
  };

  public static WALLET_EMPTY = {
    message: "Wallet address must not be empty",
    error_code: "WALLET_EMPTY",
  };

  public static WALLET_MIN_LENGTH = {
    message: "Wallet address's length must be higher than 6 characters",
    error_code: "WALLET_MIN_LENGTH",
  };

  public static WALLET_MAX_LENGTH = {
    message: "Wallet address's length must be lower than 100 characters",
    error_code: "WALLET_MAX_LENGTH",
  };

  public static SMART_CONTRACT_STRING = {
    message: "Smart contract address must be a string",
    error_code: "SMART_CONTRACT_STRING",
  };

  public static SMART_CONTRACT_EMPTY = {
    message: "Smart contract address must not be empty",
    error_code: "SMART_CONTRACT_EMPTY",
  };

  public static EPOCH_EMPTY = {
    message: "Epoch number must not be empty",
    error_code: "EPOCH_EMPTY",
  };

  public static EPOCH_NUMBER = {
    message: "Epoch must be a number",
    error_code: "EPOCH_NUMBER",
  };

  public static SIGNATURE_EMPTY = {
    message: "Signature must not be empty",
    error_code: "SIGNATURE_STRING",
  };

  public static SIGNATURE_STRING = {
    message: "Signature must be a string",
    error_code: "SIGNATURE_STRING",
  };

  public static SIGNATURE_MIN_LENGTH = {
    message: "Signature's length must be higher than 6 characters",
    error_code: "SIGNATURE_MIN_LENGTH",
  };

  public static SIGNATURE_MAX_LENGTH = {
    message: "Signature's length must be lower than 600 characters",
    error_code: "SIGNATURE_MAX_LENGTH",
  };

  public static REFRESH_TOKEN_STRING = {
    message: "Refresh token must be a string",
    error_code: "REFRESH_TOKEN_STRING",
  };

  public static CODE_STRING = {
    message: "Code must be a string",
    error_code: "CODE_STRING",
  };

  public static BIO_STRING = {
    message: "Bio must be a string",
    error_code: "BIO_STRING",
  };

  public static BIO_TOO_LONG = {
    message: "Bio is too long, no longer than 1000 characters",
    error_code: "BIO_TOO_LONG",
  };

  public static ID_BET_ONCHAIN_NUMBER = {
    message: "Id of a bet must be a number",
    error_code: "ID_BET_ONCHAIN_NUMBER",
  };

  public static ID_BET_ONCHAIN_EMPTY = {
    message: "Id of a bet must not be a empty",
    error_code: "ID_BET_ONCHAIN_EMPTY",
  };

  public static ID_BET_ONCHAIN_NOT_FOUND = {
    HttpStatus: HttpException,
    message: "Can't find any bet with this id",
    error_code: "ID_BET_ONCHAIN_NOT_FOUND",
  };

  public static BET_ALREADY_BEEN_CLAIMED = {
    message: "You have already claimed the reward for this round",
    error_code: "BET_ALREADY_BEEN_CLAIMED",
  };

  public static ROUND_LOST = {
    message: "You lost this round",
    error_code: "ROUND_LOST",
  };

  public static ID_ROUND_ONCHAIN_NOT_FOUND = {
    message: "Can't find any round with this id",
    error_code: "ID_ROUND_ONCHAIN_NOT_FOUND",
  };

  // ADMIN MODULES
  public static FULL_NAME_STING = {
    message: "Full name must be a string",
    error_code: "FULL_NAME_STING",
  };

  public static FULL_NAME_MIN_LENGTH = {
    message: "Full name is too short, at least 4 characters",
    error_code: "FULL_NAME_MIN_LENGTH",
  };

  public static FULL_NAME_MAX_LENGTH = {
    message: "Full name is too long, no longer then 64 characters",
    error_code: "FULL_NAME_MAX_LENGTH",
  };

  public static TYPE_NUMBER = {
    message: "Type must be a number",
    error_code: "TYPE_NUMBER",
  };

  public static NONCE_NUMBER = {
    message: "Nonce must be a number",
    error_code: "NONCE_NUMBER",
  };

  public static NONCE_EMPTY = {
    message: "Nonce must not be empty",
    error_code: "NONCE_EMPTY",
  };

  public static TYPE_STRICT = {
    message: "Type must be 1 or 2",
    error_code: "TYPE_STRICT",
  };

  public static CLIENT_ID_STRING = {
    message: "Client id must be a string",
    error_code: "CLIENT_ID_STRING",
  };

  public static CLIENT_ID_MIN_LENGTH = {
    message: "Client id is too short, at least 3 characters",
    error_code: "CLIENT_ID_MIN_LENGTH",
  };

  public static CLIENT_ID_MAX_LENGTH = {
    message: "Client id is too long, no longer then 40 characters",
    error_code: "CLIENT_ID_MAX_LENGTH",
  };

  public static CLIENT_ID_MATCH_PATTERN = {
    message: "Client id too weak",
    error_code: "CLIENT_ID_MATCH_PATTERN",
  };

  public static CLIENT_SECRET_STRING = {
    message: "Client secret must be a string",
    error_code: "CLIENT_SECRET_STRING",
  };

  public static CLIENT_SECRET_MIN_LENGTH = {
    message: "Client secret is too short, at least 20 characters",
    error_code: "CLIENT_SECRET_MIN_LENGTH",
  };

  public static CLIENT_SECRET_MAX_LENGTH = {
    message: "Client secret is too long, no longer then 255 characters",
    error_code: "CLIENT_SECRET_MAX_LENGTH",
  };

  public static CLIENT_SECRET_MATCH_PATTERN = {
    message: "Client secret too weak",
    error_code: "CLIENT_SECRET_MATCH_PATTERN",
  };

  public static STATUS_EMPTY = {
    message: "Status must not be empty",
    error_code: "STATUS_EMPTY",
  };

  public static STATUS_NUMBER = {
    message: "Status must be a number",
    error_code: "STATUS_NUMBER",
  };

  public static STATUS_STRICT = {
    message: "Status must be 1 or 2",
    error_code: "STATUS_STRICT",
  };

  public static REASON_STRING = {
    message: "Reason must be a string",
    error_code: "REASON_STRING",
  };

  public static ADMIN_STATUS_STRING = {
    message: "Status must be a string",
    error_code: "ADMIN_STATUS_STRING",
  };

  public static ADMIN_STATUS_STRICT = {
    message: "Status must be active or inactive",
    error_code: "ADMIN_STATUS_STRICT",
  };

  //BANNER_SLIDE MODULE
  public static EVENT_NAME_EMPTY = {
    message: "Event name must not be empty",
    error_code: "EVENT_NAME_EMPTY",
  };

  public static EVENT_NAME_MAX_LENGTH = {
    message: "Event name is too long, no longer then 30 characters",
    error_code: "EVENT_NAME_MAX_LENGTH",
  };

  public static EVENT_NAME_STRING = {
    message: "Event name must be a string",
    error_code: "EVENT_NAME_STRING",
  };

  public static DESCRIPTION_EMPTY = {
    message: "Description must not be empty",
    error_code: "DESCRIPTION_EMPTY",
  };

  public static DESCRIPTION_STRING = {
    message: "Description must be a string",
    error_code: "DESCRIPTION_STRING",
  };

  public static DESCRIPTION_MAX_LENGTH = {
    message: "Description is too long, no longer then 200 characters",
    error_code: "DESCRIPTION_MAX_LENGTH",
  };

  public static BUTTON_TEXT_MAX_LENGTH = {
    message: "Button text is too long, no longer then 50 characters",
    error_code: "BUTTON_TEXT_MAX_LENGTH",
  };

  public static BUTTON_COLOR_MAX_LENGTH = {
    message: "Button color is too long, no longer then 20 characters",
    error_code: "BUTTON_COLOR_MAX_LENGTH",
  };

  // COLLECTION MODULE
  public static COLLECTION_NAME_STRING = {
    message: "Collection name must be a string",
    error_code: "COLLECTION_NAME_STRING",
  };

  public static COLLECTION_CREATOR_NAME_STRING = {
    message: "Creator name of collection must be a string",
    error_code: "COLLECTION_CREATOR_NAME_STRING",
  };

  public static COLLECTION_NAME_EMPTY = {
    message: "Collection name must not be empty",
    error_code: "COLLECTION_NAME_EMPTY",
  };

  public static COLLECTION_ADDRESS_EMPTY = {
    message: "Collection address must not be empty",
    error_code: "COLLECTION_ADDRESS_EMPTY",
  };

  public static NO_ROUND_RECORD = {
    message: "No round found",
    error_code: "NO_ROUND_RECORD",
  };

  public static COLLECTION_ADDRESS_STRING = {
    message: "Collection address must be a string",
    error_code: "COLLECTION_ADDRESS_STRING",
  };

  public static CHAIN_ID_STRING = {
    message: "Chain id must be a string",
    error_code: "CHAIN_ID_STRING",
  };

  public static CHAIN_ID_EMPTY = {
    message: "Chain id must not be empty",
    error_code: "CHAIN_ID_EMPTY",
  };

  public static COLLECTION_TYPE_STRING = {
    message: "Collection type must be a string",
    error_code: "COLLECTION_TYPE_STRING",
  };

  public static COLLECTION_TYPE_EMPTY = {
    message: "Collection type must not be empty",
    error_code: "COLLECTION_TYPE_EMPTY",
  };

  public static COLLECTION_STATUS_EMPTY = {
    message: "Collection status must not be empty",
    error_code: "COLLECTION_STATUS_EMPTY",
  };

  public static COLLECTION_STATUS_STRING = {
    message: "Collection status must be a string",
    error_code: "COLLECTION_STATUS_STRING",
  };

  public static COLLECTION_STATUS_STRICT = {
    message: "Collection status must be request or listed",
    error_code: "COLLECTION_STATUS_STRICT",
  };

  public static COLLECTION_UPDATE_STATUS_STRICT = {
    message: "Collection status must be delisted or listed",
    error_code: "COLLECTION_UPDATE_STATUS_STRICT",
  };

  public static INVALID_CODE_NAME = {
    message:
      "Invalid code name , please use another code name (within 3 ~ 20 characters)",
    error_code: "INVALID_CODE_NAME",
  };

  public static INVALID_NUMBER = {
    message: "Please input valid number",
    error_code: "INVALID_NUMBER",
  };

  public static QUESTION_EMPTY = {
    message: "Do you have any question",
    error_code: "QUESTION_EMPTY",
  };

  public static ANSWER_EMPTY = {
    message: "Do you have any answer",
    error_code: "ANSWER_EMPTY",
  };

  public static LANG_EMPTY = {
    message: "Lang must not be empty",
    error_code: "LANG_EMPTY",
  };

  public static OBJECT_TYPE_EMPTY = {
    message: "Object type must not be empty",
    error_code: "OBJECT_TYPE_EMPTY",
  };

  public static OBJECT_TYPE_MAX_LENGTH = {
    message: "Object type is too long, no longer then 10 characters",
    error_code: "OBJECT_TYPE_MAX_LENGTH",
  };

  public static OBJECT_TYPE_STRING = {
    message: "Object type must be a string",
    error_code: "OBJECT_TYPE_STRING",
  };

  public static OBJECT_TYPE_INVALID = {
    message: "Object type must be either nft, auction or lootbox",
    error_code: "OBJECT_TYPE_INVALID",
  };

  public static OBJECT_IDS_ARRAY = {
    message: "Object ids must be an array",
    error_code: "OBJECT_IDS_ARRAY",
  };

  // LOOT BOX MODULE
  public static NFT_IDS_IS_ARRAY = {
    message: "Nft ids must be an array",
    error_code: "NFT_IDS_IS_ARRAY",
  };

  public static NFT_ID_IS_NUMBER = {
    message: "Each nft id must be a number",
    error_code: "NFT_ID_IS_NUMBER",
  };

  public static NFT_IDS_EMPTY = {
    message: "Nft ids must not be empty",
    error_code: "NFT_IDS_EMPTY",
  };

  public static RARITY_INDEX_NUMBER = {
    message: "Rarity index must be a number",
    error_code: "RARITY_INDEX_NUMBER",
  };

  public static RARITY_INDEX_EMPTY = {
    message: "Rarity index must not be empty",
    error_code: "RARITY_INDEX_EMPTY",
  };

  public static RARITY_PROBABILITY_NUMBER = {
    message: "Rarity probability must be a number",
    error_code: "RARITY_PROBABILITY_NUMBER",
  };

  public static RARITY_PROBABILITY_EMPTY = {
    message: "Rarity probability must not be empty",
    error_code: "RARITY_PROBABILITY_EMPTY",
  };

  public static RARITY_NAME_STRING = {
    message: "Rarity name must be a string",
    error_code: "RARITY_NAME_STRING",
  };

  public static RARITY_NAME_EMPTY = {
    message: "Rarity name must not be empty",
    error_code: "RARITY_NAME_EMPTY",
  };

  public static RARITY_NAME_MAX_LENGTH = {
    message: "Rarity name is too long, no longer then 20 characters",
    error_code: "RARITY_NAME_MAX_LENGTH",
  };

  public static RARITY_NAME_MIN_LENGTH = {
    message: "Button color is too short, no shorter then 2 characters",
    error_code: "RARITY_NAME_MIN_LENGTH",
  };

  public static USER_WHITELISTS_IS_ARRAY = {
    message: "User whitelist must be an array",
    error_code: "USER_WHITELISTS_IS_ARRAY",
  };

  public static USER_WHITELIST_STRING = {
    message: "Each user whitelist must be a string",
    error_code: "USER_WHITELIST_STRING",
  };

  public static USER_WHITELIST_ID_STRING = {
    message: "Each user whitelist id must be a string",
    error_code: "USER_WHITELIST_ID_STRING",
  };

  public static LOOT_BOX_ID_NUMBER = {
    message: "Loot box id must be a number",
    error_code: "LOOT_BOX_ID_NUMBER",
  };

  public static LOOT_BOX_ID_EMPTY = {
    message: "Loot box id must not be empty",
    error_code: "LOOT_BOX_ID_EMPTY",
  };

  public static LOOT_BOX_MIN_VALUE = {
    message: "Minimum of loot box id is 1",
    error_code: "LOOT_BOX_MIN_VALUE",
  };

  public static LOOT_BOX_TYPE_EMPTY = {
    message: "Loot box type must not be empty",
    error_code: "LOOT_BOX_TYPE_EMPTY",
  };

  public static LOOT_BOX_TYPE_STRING = {
    message: "Loot box type must be a string",
    error_code: "LOOT_BOX_TYPE_STRING",
  };

  public static LOOT_BOX_TYPE_STRICT = {
    message: "Loot box type must be general or whitelisted",
    error_code: "LOOT_BOX_TYPE_STRICT",
  };

  public static LOOT_BOX_NAME_STRING = {
    message: "Loot box name must be a string",
    error_code: "LOOT_BOX_NAME_STRING",
  };

  public static LOOT_BOX_NAME_EMPTY = {
    message: "Loot box name must not be empty",
    error_code: "LOOT_BOX_NAME_EMPTY",
  };

  public static LOOT_BOX_NAME_MAX_LENGTH = {
    message: "Loot box name too long, no longer then 255 characters",
    error_code: "LOOT_BOX_NAME_MAX_LENGTH",
  };

  public static RULE_EMPTY = {
    message: "Rule must not be empty",
    error_code: "RULE_EMPTY",
  };

  public static RULE_STRING = {
    message: "Rule must be a string",
    error_code: "RULE_STRING",
  };

  public static CONTRACT_EMPTY = {
    message: "Contract address must not be empty",
    error_code: "CONTRACT_EMPTY",
  };

  public static CONTRACT_STRING = {
    message: "Contract address must be a string",
    error_code: "CONTRACT_STRING",
  };

  public static OWNER_EMPTY = {
    message: "Owner address must not be empty",
    error_code: "OWNER_EMPTY",
  };

  public static OWNER_STRING = {
    message: "Owner address must be a string",
    error_code: "OWNER_STRING",
  };

  public static NFT_ADDRESS_EMPTY = {
    message: "Nft address must not be empty",
    error_code: "NFT_ADDRESS_EMPTY",
  };

  public static NFT_ADDRESS_STRING = {
    message: "Nft address must be a string",
    error_code: "NFT_ADDRESS_STRING",
  };

  public static RARITY_EMPTY = {
    message: "Rarity must not be empty",
    error_code: "RARITY_EMPTY",
  };

  public static RARITY_IS_ARRAY = {
    message: "Rarity must be an array",
    error_code: "RARITY_IS_ARRAY",
  };

  public static PRICE_EMPTY = {
    message: "Price must not be empty",
    error_code: "PRICE_EMPTY",
  };

  public static PRICE_STRING = {
    message: "Price must be a string",
    error_code: "PRICE_STRING",
  };

  public static MAX_QUANTITY_PER_OPEN_EMPTY = {
    message: "Max quantity per open must not be empty",
    error_code: "MAX_QUANTITY_PER_OPEN_EMPTY",
  };

  public static MAX_QUANTITY_PER_OPEN_NUMBER = {
    message: "Max quantity per open must be a number",
    error_code: "MAX_QUANTITY_PER_OPEN_NUMBER",
  };

  public static TOTAL_QUANTITY_EMPTY = {
    message: "Total quantity must not be empty",
    error_code: "TOTAL_QUANTITY_EMPTY",
  };

  public static TOTAL_QUANTITY_NUMBER = {
    message: "Total quantity must be a number",
    error_code: "TOTAL_QUANTITY_NUMBER",
  };

  public static CURRENCY_EMPTY = {
    message: "Currency must not be empty",
    error_code: "CURRENCY_EMPTY",
  };

  public static CURRENCY_STRING = {
    message: "Currency must be a string",
    error_code: "CURRENCY_STRING",
  };

  public static START_TIME_EMPTY = {
    message: "Start time must not be empty",
    error_code: "START_TIME_EMPTY",
  };

  public static START_TIME_NUMBER = {
    message: "Start time must be a number",
    error_code: "START_TIME_NUMBER",
  };

  public static END_TIME_EMPTY = {
    message: "End time must not be empty",
    error_code: "END_TIME_EMPTY",
  };

  public static END_TIME_NUMBER = {
    message: "End time must be a number",
    error_code: "END_TIME_NUMBER",
  };

  public static DISCOUNT_CODE_ID_NUMBER = {
    message: "Discount code id must be a number",
    error_code: "DISCOUNT_CODE_ID_NUMBER",
  };

  // NFT
  public static NFT_ID_EMPTY = {
    message: "Nft id must not be empty",
    error_code: "NFT_ID_EMPTY",
  };

  public static NFT_ID_NUMBER = {
    message: "NFT id must be a number",
    error_code: "NFT_ID_NUMBER",
  };

  public static STATUS_STRING = {
    message: "Status must be a string",
    error_code: "STATUS_STRING",
  };

  public static COLLECTION_ID_EMPTY = {
    message: "Collection's id must not be empty",
    error_code: "COLLECTION_ID_EMPTY",
  };

  public static NFT_NAME_EMPTY = {
    message: "Name of NFT must not be empty",
    error_code: "NFT_NAME_EMPTY",
  };

  public static NFT_NAME_STRING = {
    message: "Name of NFT must be a string",
    error_code: "NFT_NAME_STRING",
  };

  public static PAYMENT_TOKEN_STRING = {
    message: "Payment token must be a string",
    error_code: "PAYMENT_TOKEN_STRING",
  };

  public static AMOUNT_EMPTY = {
    message: "Amount must not be empty",
    error_code: "AMOUNT_EMPTY",
  };

  public static AMOUNT_NUMBER = {
    message: "Amount must be a number",
    error_code: "AMOUNT_NUMBER",
  };

  public static TOKEN_ID_EMPTY = {
    message: "Token id must not be empty",
    error_code: "TOKEN_ID_EMPTY",
  };

  public static AMOUNT_MIN_VALUE = {
    message: "Minimum of amount is 1",
    error_code: "AMOUNT_MIN_VALUE",
  };

  //WHITELIST SALE MODULE
  public static ADMIN_ID_NUMBER = {
    message: "Admin id must be a number",
    error_code: "ADMIN_ID_NUMBER",
  };

  public static ADMIN_ID_EMPTY = {
    message: "Admin id must not be empty",
    error_code: "ADMIN_ID_EMPTY",
  };

  public static START_PRICE_INVALID = {
    message: "Start price must be a number larger than 0",
    error_code: "START_PRICE_INVALID",
  };

  public static PAGE_INVALID = {
    message: "Page must be a number larger than 0",
    error_code: "PAGE_INVALID",
  };

  public static LIMIT_INVALID = {
    message: "Limit must be a number between 1 and 150",
    error_code: "LIMIT_INVALID",
  };

  public static END_PRICE_INVALID = {
    message: "End price must be a number larger than 0",
    error_code: "END_PRICE_INVALID",
  };

  public static PRICE_INVALID = {
    message: "Price invalid",
    error_code: "PRICE_INVALID",
  };

  public static SORT_INVALID = {
    message: "Sort invalid",
    error_code: "SORT_INVALID",
  };

  public static CATEGORIES_INVALID = {
    message: "Categories invalid",
    error_code: "CATEGORIES_INVALID",
  };

  public static TOKEN_IDS_INVALID = {
    message: "Token ids invalid",
    error_code: "TOKEN_IDS_INVALID",
  };

  public static TOKEN_IDS_EMPTY = {
    message: "Token ids must not be empty",
    error_code: "TOKEN_IDS_EMPTY",
  };

  public static BRANDS_INVALID = {
    message: "Brands invalid",
    error_code: "BRANDS_INVALID",
  };

  public static COLLECTIONS_INVALID = {
    message: "Collections invalid",
    error_code: "COLLECTIONS_INVALID",
  };

  public static SEARCH_STATUSES_INVALID = {
    message: "Search statuses invalid",
    error_code: "SEARCH_STATUSES_INVALID",
  };

  public static REASON_NOT_EMPTY = {
    message: "Reason must not be empty",
    error_code: "REASON_NOT_EMPTY",
  };

  // NOTIFICATIONS
  public static NOTI_ID_EMPTY = {
    message: "Notification id must not be empty",
    error_code: "NOTI_ID_EMPTY",
  };

  public static FROM_USER_STRING = {
    message: "FROM_USER field must be a string",
    error_code: "FROM_USER_STRING",
  };

  public static TO_USER_STRING = {
    message: "TO_USER field must be a string",
    error_code: "TO_USER_STRING",
  };

  public static DATA_STRING = {
    message: "DATA field must be a string",
    error_code: "DATA_STRING",
  };

  public static TYPE_STRING = {
    message: "TYPE field must be a string",
    error_code: "TYPE_STRING",
  };

  public static IS_READ_STRING = {
    message: "IS_READ field must be a string",
    error_code: "IS_READ_STRING",
  };

  public static COLLECTION_ID_STRING = {
    message: "Collection's id must be a string",
    error_code: "COLLECTION_ID_STRING",
  };

  // user-follower
  public static FOLLOWER_ID_NUMBER = {
    message: "Follower's id must be a number",
    error_code: "FOLLOWER_ID_NUMBER",
  };

  public static FOLLOWER_ID_EMPTY = {
    message: "Follower's id must not be empty",
    error_code: "FOLLOWER_ID_EMPTY",
  };

  // 2FA
  public static TWOFA_CODE_IS_EMPTY = {
    message: "Twofa code must not be empty",
    error_code: "TWOFA_CODE_IS_EMPTY",
  };

  // exchange-token
  public static EXCHANGE_AMOUNT_IS_EMPTY = {
    message: "Exchange amount must not be empty",
    error_code: "EXCHANGE_AMOUNT_IS_EMPTY",
  };

  public static EXCHANGE_AMOUNT_IS_NUMBER_STRING = {
    message: "Exchange amount must be a number string",
    error_code: "EXCHANGE_AMOUNT_IS_NUMBER_STRING",
  };
}
