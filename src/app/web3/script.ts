// import { getPublicClient } from "@wagmi/core";
// import { erc20Abi, formatUnits } from "viem";
// import { config } from "./wagmiConfig"; // your wagmi config

// const publicClient = getPublicClient(config);

// const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT on Ethereum
// const userAddress = "0xYourUserAddress";

// const balance = await publicClient.readContract({
//   address: tokenAddress,
//   abi: erc20Abi,
//   functionName: "balanceOf",
//   args: [userAddress],
// });

// const decimals = await publicClient.readContract({
//   address: tokenAddress,
//   abi: erc20Abi,
//   functionName: "decimals",
// });

// const formatted = formatUnits(balance, decimals);

// console.log(`Token balance: ${formatted}`);

// utility function

// async function getERC20Balance(user, token, config) {
//   const client = getPublicClient(config);

//   const [rawBalance, decimals] = await Promise.all([
//     client.readContract({
//       address: token,
//       abi: erc20Abi,
//       functionName: "balanceOf",
//       args: [user],
//     }),
//     client.readContract({
//       address: token,
//       abi: erc20Abi,
//       functionName: "decimals",
//     }),
//   ]);

//   return formatUnits(rawBalance, decimals);
// }
