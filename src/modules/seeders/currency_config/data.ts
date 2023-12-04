import { ICurrencyConfigInterface } from "../../../database/interfaces/ICurrencyConfig.interface";

export const currencyConfigDataSeeds: ICurrencyConfigInterface[] = [
  // {
  //   swapId: 1,
  //   network: "polygon",
  //   chainName: "mumbai",
  //   chainId: "80001",
  //   tokenAddresses:
  //     '{"market": "0x5c3852A6988eCdc725178443f36a868138E51603","auction": "0x5076312d102FDE491Eb072e25EF41f996b29942a","lootBox": "0xc5f56EC7F94CF0364fD064325c599c1fFA77d3aF"}',
  //   averageBlockTime: 12000,
  //   requiredConfirmations: 12,
  //   tempRequiredConfirmations: 0,
  //   scanApi: "https://api-goerli.etherscan.io",
  //   rpcEndpoint: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  //   explorerEndpoint: "https://goerli.etherscan.io/",
  // },
  // {
  //   swapId: 2,
  //   network: "ethereum",
  //   chainName: "goerli",
  //   chainId: "5",
  //   tokenAddresses:
  //     '{"market": "0x02A0Ee05C5bE800F3E553b6bc52ea911c2DDD9f7","auction": "0x34b3B286332A31a1990e2dAc1b6b3b4371d3fb48","lootBox": "0x2c0fE1023f3D44191Cd07f5d818Fe08258Dec569"}',
  //   averageBlockTime: 12000,
  //   requiredConfirmations: 12,
  //   tempRequiredConfirmations: 0,
  //   scanApi: "https://api-goerli.etherscan.io",
  //   rpcEndpoint: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  //   explorerEndpoint: "https://goerli.etherscan.io/",
  // },
  // {
  //   swapId: 3,
  //   network: "bsc",
  //   chainName: "testnet",
  //   chainId: "97",
  //   tokenAddresses:
  //     '{"market": "0x1B0202b613C914621a745dA992d039B64ce9c760","auction": "0x64F3B7948c1D639A0819508f493c55A4206e8BAA","lootBox": "0x85088c0f975364Adbc12368913c5841659607207"}',
  //   averageBlockTime: 3000,
  //   requiredConfirmations: 15,
  //   tempRequiredConfirmations: 0,
  //   scanApi: "https://api-testnet.bscscan.com",
  //   rpcEndpoint: "https://data-seed-prebsc-2-s1.binance.org:8545",
  //   explorerEndpoint: "https://testnet.bscscan.com/",
  // },


   {
    swapId: 1,
    network: " Avax",
    chainName: " Avalanche Fuji Testnet",
    chainId: "43113",
    tokenAddresses:'{"mockToken":"0xf13e2e8F77585c7303baAF7F2A7B724B1283Ca81","predictionMarket":"0xF735A246b33cb4c2518E28174bEb9F1A94Cc2252"}',
    averageBlockTime: 28287486,
    requiredConfirmations: 12,
    tempRequiredConfirmations: 0,
    scanApi: "https://api-goerli.etherscan.io",
    rpcEndpoint: "​https://api.avax-test.network/ext/bc/C/rpc",
    explorerEndpoint: "https://testnet.snowtrace.dev/",
  },
];
