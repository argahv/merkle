import crypto from "crypto";

export interface BeneficiaryLeaf {
  beneficiaryID: string;
  totalAllocation: number;
  remainingBalance: number;
  disbursementStage: number;
  metadata: string; // e.g., last disbursement timestamp
}

export class MerkleTree {
  private leaves: string[];
  private tree: string[][];

  constructor(private beneficiaries: BeneficiaryLeaf[]) {
    this.leaves = this.beneficiaries.map((b) => this.hashLeaf(b));
    this.tree = this.buildTree(this.leaves);
  }

  private hashLeaf(leaf: BeneficiaryLeaf): string {
    const {
      beneficiaryID,
      totalAllocation,
      remainingBalance,
      disbursementStage,
      metadata,
    } = leaf;
    return crypto
      .createHash("sha256")
      .update(
        `${beneficiaryID}${totalAllocation}${remainingBalance}${disbursementStage}${metadata}`
      )
      .digest("hex");
  }

  private buildTree(leaves: string[]): string[][] {
    let layers = [leaves];
    while (layers[layers.length - 1].length > 1) {
      const prevLayer = layers[layers.length - 1];
      const newLayer = [];
      for (let i = 0; i < prevLayer.length; i += 2) {
        const left = prevLayer[i];
        const right = prevLayer[i + 1] || left; // Duplicate the last node if odd
        newLayer.push(this.hashPair(left, right));
      }
      layers.push(newLayer);
    }
    return layers;
  }

  private hashPair(left: string, right: string): string {
    return crypto
      .createHash("sha256")
      .update(left + right)
      .digest("hex");
  }

  public getRoot(): string {
    return this.tree[this.tree.length - 1][0];
  }

  public updateLeaf(index: number, updatedLeaf: BeneficiaryLeaf): void {
    this.leaves[index] = this.hashLeaf(updatedLeaf);
    this.tree = this.buildTree(this.leaves);
  }

  public getProof(index: number): string[] {
    let proof: string[] = [];
    let currentLayer = this.leaves;
    while (currentLayer.length > 1) {
      const isRightNode = index % 2 === 1;
      const pairIndex = isRightNode ? index - 1 : index + 1;

      if (pairIndex < currentLayer.length) {
        proof.push(currentLayer[pairIndex]);
      }

      index = Math.floor(index / 2);
      currentLayer = this.tree[this.tree.indexOf(currentLayer) + 1];
    }
    return proof;
  }
}
