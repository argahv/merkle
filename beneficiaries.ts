import { BeneficiaryLeaf, MerkleTreeHandler } from "./merkleTree";
import chalk from "chalk";

let beneficiaries: BeneficiaryLeaf[] = [
  {
    beneficiaryID: "1",
    totalAllocation: 10,
    remainingBalance: 10,
    disbursementStage: 0,
    metadata: new Date().toISOString(),
  },
  {
    beneficiaryID: "2",
    totalAllocation: 20,
    remainingBalance: 20,
    disbursementStage: 0,
    metadata: new Date().toISOString(),
  },
  {
    beneficiaryID: "3",
    totalAllocation: 15,
    remainingBalance: 15,
    disbursementStage: 0,
    metadata: new Date().toISOString(),
  },
  {
    beneficiaryID: "4",
    totalAllocation: 25,
    remainingBalance: 25,
    disbursementStage: 0,
    metadata: new Date().toISOString(),
  },
  {
    beneficiaryID: "5",
    totalAllocation: 30,
    remainingBalance: 30,
    disbursementStage: 0,
    metadata: new Date().toISOString(),
  },
];

export const merkleTreeHandler = new MerkleTreeHandler(beneficiaries);

export function disburseTokens(): void {
  console.log(chalk.blue("Disbursement triggered."));
  beneficiaries = beneficiaries.map((b) => {
    if (b.remainingBalance > 0) {
      const updatedBalance = b.remainingBalance - 1;
      const updatedStage = b.disbursementStage + 1;
      const updatedLeaf: BeneficiaryLeaf = {
        ...b,
        remainingBalance: updatedBalance,
        disbursementStage: updatedStage,
        metadata: new Date().toISOString(),
      };
      console.log(
        chalk.green(
          `Disbursed 1 token to Beneficiary ${b.beneficiaryID}. Remaining Balance: ${updatedBalance}`
        )
      );
      return updatedLeaf;
    } else {
      console.log(
        chalk.yellow(`Beneficiary ${b.beneficiaryID} has no remaining balance.`)
      );
      return b;
    }
  });
  merkleTreeHandler.updateBeneficiaries(beneficiaries);
  console.log("Tree:", merkleTreeHandler.getLeaves());

  console.log(
    chalk.cyanBright(`Updated Merkle Root: ${merkleTreeHandler.getRoot()}`)
  );
}
