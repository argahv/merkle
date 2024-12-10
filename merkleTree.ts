import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export interface BeneficiaryLeaf {
  beneficiaryID: string;
  totalAllocation: number;
  remainingBalance: number;
  disbursementStage: number;
  metadata: string; // e.g., last disbursement timestamp
}

export class MerkleTreeHandler {
  private tree: MerkleTree;

  constructor(private beneficiaries: BeneficiaryLeaf[]) {
    const leaves = this.beneficiaries.map((b) => this.hashLeaf(b));
    this.tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  }

  private hashLeaf(leaf: BeneficiaryLeaf): Buffer {
    const leafData = `${leaf.beneficiaryID}${leaf.totalAllocation}${leaf.remainingBalance}${leaf.disbursementStage}${leaf.metadata}`;
    return keccak256(leafData);
  }

  public getRoot(): string {
    return this.tree.getHexRoot();
  }

  public getProof(leaf: BeneficiaryLeaf): string[] {
    const hashedLeaf = this.hashLeaf(leaf);
    return this.tree.getHexProof(hashedLeaf);
  }

  public updateBeneficiaries(newBeneficiaries: BeneficiaryLeaf[]) {
    this.beneficiaries = newBeneficiaries;
    const leaves = this.beneficiaries.map((b) => this.hashLeaf(b));
    this.tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  }

  public getLeaves() {
    return this.tree.toString();
  }
}
