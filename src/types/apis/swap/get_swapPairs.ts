/* sync-type-disable */

export type get_swapPairs = get_swapPair[];

interface get_swapPair {
  id: string;
  network: string;
  name: string;
  chainId: null | string;
  contractAddress: null | string;
  symbol: string;
  token_logo: string;
  network_logo: string;
}
