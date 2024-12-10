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
    // const est = await contract.estimateGas(newRoot);
    const tx = await contract.setMerkleRoot(newRoot);
    console.log(chalk.green(`Merkle root updated. TX: ${tx.hash}`));
    const receipt = await tx.wait();
    console.log(
      chalk.greenBright(
        "Transaction confirmed.",
        JSON.stringify(receipt, null, 2)
      )
    );

    // // Calculate transaction cost
    // const gasUsed = BigNumberish.from(receipt.gasUsed);
    // const gasPrice = ethers.BigNumber.from(tx.gasPrice);
    // const transactionCost = gasUsed.mul(gasPrice);
    // console.log(chalk.blue(`Transaction cost: ${formatEther(transactionCost)} ETH`));
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

setInterval(triggerDisbursement, 15 * 1000);
