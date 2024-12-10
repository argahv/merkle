import { ethers, JsonRpcProvider, formatEther } from "ethers";
import { disburseTokens, merkleTreeHandler } from "./beneficiaries";
import dotenv from "dotenv";
import chalk from "chalk";
import { deployementAbi } from "./contracts/abi";

dotenv.config();

const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contractAddress = process.env.CONTRACT_ADDRESS!;
const abi = deployementAbi.output.abi;
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function updateMerkleRoot() {
  const newRoot = merkleTreeHandler.getRoot();
  try {
    // Send the transaction to update the Merkle root
    const tx = await contract.setMerkleRoot(newRoot);
    console.log(chalk.green(`Merkle root updated. TX: ${tx.hash}`));

    // Wait for the transaction receipt
    const receipt = await tx.wait();
    console.log(chalk.greenBright("Transaction confirmed."));

    // Ensure gasUsed and gasPrice are BigNumbers
    // const gasUsed = ethers.BigNumber.from(receipt.gasUsed); // Convert gasUsed to BigNumber
    // const gasPrice = tx.gasPrice || (await provider.getGasPrice()); // Get gas price (BigNumber)
    // const transactionCost = gasUsed.mul(gasPrice); // Multiply gasUsed and gasPrice

    // Log the transaction cost in ETH
    // console.log(
    //   chalk.blue(`Transaction cost: ${formatEther(transactionCost)} ETH`)
    // );
  } catch (error) {
    console.error(chalk.red("Error updating Merkle root:", error));
  }
}

async function triggerDisbursement() {
  console.log(chalk.magenta("Disbursement process started..."));
  disburseTokens();
  await updateMerkleRoot();
  console.log("=".repeat(50));
}

//In the real world scnario, this will be triggered by some trigger mechanism; might be like water level in case of anticipation of flood
console.log("Disbursement process will be triggered every 15 seconds");
setInterval(triggerDisbursement, 15 * 1000);
