#AWS KMS setup environment step by step:

1. Login into your AWS account, get credentials information and save your credentials information into .env
   1. **KMS_AWS_ACCESS_KEY_ID**=<aws_access_key>
   2. **KMS_AWS_SECRET_ACCESS_KEY**=<aws_secret_access_key>
2. Use AWS KMS to create a KMS key and manually add metadata of this key into kms_cmk table (in database)
   1. Metadata of KMS key include: id, region, alias, arn, is_enabled = 1.
3. Uncomment the lines after '_**//NOTE: uncomment and run first time init app**_' in kms.service.ts file
   1. Replace '_**add_private_key_manually**_' in '_**encryptPrivateKeyOfMasterWallet**_()' by your **_PRIVATE KEY_** (the private key of loot box's owner Smart Contract)
4. Add loot box's owner wallet address by '_**MASTER_WALLET_ADDRESS**_' variable in .env
5. Run the backend application
6. After app run successfully and the terminal printed '_Generated master wallet address:: address=${address.address}, note=${address.note}_' log, stop the backend application
7. Comment the lines that had uncommented at step 3 and run the backend application one more time