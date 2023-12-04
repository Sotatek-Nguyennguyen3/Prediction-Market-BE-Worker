export interface ICurrencyTokenInterface {
  id: number;
  tokenName: string;
  decimal: number;
  chainId: string;
  contractAddress: string;
  status: number;
  isNativeToken: number;
  currency: string;
  icon: string;
}
