export const deployementAbi = {
  compiler: {
    version: "0.8.26+commit.8a97fa7a",
  },
  language: "Solidity",
  output: {
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Claimed",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bytes32",
            name: "newRoot",
            type: "bytes32",
          },
        ],
        name: "RootUpdated",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]",
          },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "hasClaimed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "merkleRoot",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "newRoot",
            type: "bytes32",
          },
        ],
        name: "setMerkleRoot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]",
          },
          {
            internalType: "bytes32",
            name: "leaf",
            type: "bytes32",
          },
        ],
        name: "verifyProof",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    devdoc: {
      kind: "dev",
      methods: {},
      version: 1,
    },
    userdoc: {
      kind: "user",
      methods: {},
      version: 1,
    },
  },
  settings: {
    compilationTarget: {
      "contracts/uu.sol": "Disbursement",
    },
    evmVersion: "cancun",
    libraries: {},
    metadata: {
      bytecodeHash: "ipfs",
    },
    optimizer: {
      enabled: false,
      runs: 200,
    },
    remappings: [],
  },
  sources: {
    "contracts/uu.sol": {
      keccak256:
        "0x6ab2efb476007d3b6e4a6314b941c9285dd760fc284c31927e3ff69d9d58e018",
      license: "MIT",
      urls: [
        "bzz-raw://08c40e242550b43d45f94e9cbfe2de85a3baa9e44f1f1d409f422639126e1755",
        "dweb:/ipfs/QmZqTrfzJb5bDA1a6EJY5JhfD2zCEGChTxViBF3sCAv7Hs",
      ],
    },
  },
  version: 1,
};
