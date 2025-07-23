// import { ethers } from "ethers";

// async function sendFunds(
//   payInAddress: string,
//   amount: string,
//   tokenAddress?: string
// ) {
//   const provider = new ethers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();

//   if (tokenAddress) {
//     // ERC20 token swap
//     const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
//     const decimals = await erc20.decimals();
//     const amt = ethers.utils.parseUnits(amount, decimals);
//     return erc20.transfer(payInAddress, amt);
//   } else {
//     // Native asset (ETH, BNB...)
//     const tx = await signer.sendTransaction({
//       to: payInAddress,
//       value: ethers.utils.parseEther(amount),
//     });
//     return tx;
//   }
// }
