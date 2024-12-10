import { disburseTokens, merkleTree } from "./beneficiaries";
import chalk from "chalk";

function triggerDisbursement() {
  console.log(chalk.magenta("Triggering disbursement process..."));
  disburseTokens();
  console.log(chalk.cyanBright(`Updated Merkle Root: ${merkleTree.getRoot()}`));
  console.log("=".repeat(50));
}

console.log(chalk.bold("Starting the disbursement system..."));
setInterval(triggerDisbursement, 2 * 1000);
