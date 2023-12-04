export interface ICurrencyConfigInterface {
  swapId: number;
  network: string;
  chainName: string;
  chainId: string;
  tokenAddresses: string;
  averageBlockTime: number;
  requiredConfirmations: number;
  tempRequiredConfirmations: number;
  scanApi: string;
  rpcEndpoint: string;
  explorerEndpoint: string;
}
