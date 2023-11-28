export const ERCC721_DROP_ABI_V2 = [
  {
    type: `constructor`,
    name: ``,
    inputs: [
      {
        type: `string`,
        name: `_name`,
        internalType: `string`,
      },
      {
        type: `string`,
        name: `_symbol`,
        internalType: `string`,
      },
      {
        type: `address`,
        name: `_royaltyRecipient`,
        internalType: `address`,
      },
      {
        type: `uint128`,
        name: `_royaltyBps`,
        internalType: `uint128`,
      },
      {
        type: `address`,
        name: `_primarySaleRecipient`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `error`,
    name: `ApprovalCallerNotOwnerNorApproved`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApprovalQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApprovalToCurrentOwner`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApproveToCaller`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `BalanceQueryForZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `MintToZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `MintZeroQuantity`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `OperatorNotAllowed`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [],
  },
  {
    type: `error`,
    name: `OwnerQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferCallerNotOwnerNorApproved`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferFromIncorrectOwner`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferToNonERC721ReceiverImplementer`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferToZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `URIQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `event`,
    name: `Approval`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `approved`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        indexed: false,
        internalType: `bool`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ClaimConditionUpdated`,
    inputs: [
      {
        type: `tuple`,
        name: `condition`,
        components: [
          {
            type: `uint256`,
            name: `startTimestamp`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `maxClaimableSupply`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `supplyClaimed`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `bytes32`,
            name: `merkleRoot`,
            internalType: `bytes32`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
          {
            type: `string`,
            name: `metadata`,
            internalType: `string`,
          },
        ],
        indexed: false,
        internalType: `struct IClaimCondition.ClaimCondition`,
      },
      {
        type: `bool`,
        name: `resetEligibility`,
        indexed: false,
        internalType: `bool`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ContractURIUpdated`,
    inputs: [
      {
        type: `string`,
        name: `prevURI`,
        indexed: false,
        internalType: `string`,
      },
      {
        type: `string`,
        name: `newURI`,
        indexed: false,
        internalType: `string`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `DefaultRoyalty`,
    inputs: [
      {
        type: `address`,
        name: `newRoyaltyRecipient`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `newRoyaltyBps`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `OwnerUpdated`,
    inputs: [
      {
        type: `address`,
        name: `prevOwner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `newOwner`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `PrimarySaleRecipientUpdated`,
    inputs: [
      {
        type: `address`,
        name: `recipient`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleAdminChanged`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `previousAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `newAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleGranted`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleRevoked`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoyaltyForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `royaltyRecipient`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `royaltyBps`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokenURIRevealed`,
    inputs: [
      {
        type: `uint256`,
        name: `index`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `revealedURI`,
        indexed: false,
        internalType: `string`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokensClaimed`,
    inputs: [
      {
        type: `address`,
        name: `claimer`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `receiver`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `startTokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `quantityClaimed`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokensLazyMinted`,
    inputs: [
      {
        type: `uint256`,
        name: `startTokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `endTokenId`,
        indexed: false,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `baseURI`,
        indexed: false,
        internalType: `string`,
      },
      {
        type: `bytes`,
        name: `encryptedBaseURI`,
        indexed: false,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `Transfer`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `function`,
    name: `DEFAULT_ADMIN_ROLE`,
    inputs: [],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `OPERATOR_FILTER_REGISTRY`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `contract IOperatorFilterRegistry`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `approve`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `balanceOf`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `burn`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `claim`,
    inputs: [
      {
        type: `address`,
        name: `_receiver`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_quantity`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_currency`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_pricePerToken`,
        internalType: `uint256`,
      },
      {
        type: `tuple`,
        name: `_allowlistProof`,
        components: [
          {
            type: `bytes32[]`,
            name: `proof`,
            internalType: `bytes32[]`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
        ],
        internalType: `struct IDropSinglePhase.AllowlistProof`,
      },
      {
        type: `bytes`,
        name: `_data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `payable`,
  },
  {
    type: `function`,
    name: `claimCondition`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: `startTimestamp`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `maxClaimableSupply`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `supplyClaimed`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `quantityLimitPerWallet`,
        internalType: `uint256`,
      },
      {
        type: `bytes32`,
        name: `merkleRoot`,
        internalType: `bytes32`,
      },
      {
        type: `uint256`,
        name: `pricePerToken`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `currency`,
        internalType: `address`,
      },
      {
        type: `string`,
        name: `metadata`,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `contractURI`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `encryptDecrypt`,
    inputs: [
      {
        type: `bytes`,
        name: `data`,
        internalType: `bytes`,
      },
      {
        type: `bytes`,
        name: `key`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `bytes`,
        name: `result`,
        internalType: `bytes`,
      },
    ],
    stateMutability: `pure`,
  },
  {
    type: `function`,
    name: `encryptedData`,
    inputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `bytes`,
        name: ``,
        internalType: `bytes`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getApproved`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getBaseURICount`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getBatchIdAtIndex`,
    inputs: [
      {
        type: `uint256`,
        name: `_index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getDefaultRoyaltyInfo`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint16`,
        name: ``,
        internalType: `uint16`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRevealURI`,
    inputs: [
      {
        type: `uint256`,
        name: `_batchId`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `_key`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: `revealedURI`,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleAdmin`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMember`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `uint256`,
        name: `index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `member`,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMemberCount`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: `count`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoyaltyInfoForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint16`,
        name: ``,
        internalType: `uint16`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getSupplyClaimedByWallet`,
    inputs: [
      {
        type: `address`,
        name: `_claimer`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getSupplyClaimedToReceiver`,
    inputs: [
      {
        type: `uint256`,
        name: `_id`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_receiver`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `grantRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `hasRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `hasRoleWithSwitch`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `isApprovedForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `isEncryptedBatch`,
    inputs: [
      {
        type: `uint256`,
        name: `_batchId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `lazyMint`,
    inputs: [
      {
        type: `uint256`,
        name: `_amount`,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `_baseURIForTokens`,
        internalType: `string`,
      },
      {
        type: `bytes`,
        name: `_data`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: `batchId`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `multicall`,
    inputs: [
      {
        type: `bytes[]`,
        name: `data`,
        internalType: `bytes[]`,
      },
    ],
    outputs: [
      {
        type: `bytes[]`,
        name: `results`,
        internalType: `bytes[]`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `name`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `nextTokenIdToClaim`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `nextTokenIdToMint`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `owner`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `ownerOf`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `primarySaleRecipient`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `receiverCondId`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `receiverCondLimit`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `renounceRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `reveal`,
    inputs: [
      {
        type: `uint256`,
        name: `_index`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `_key`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: `revealedURI`,
        internalType: `string`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `revokeRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `royaltyInfo`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `salePrice`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `receiver`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `royaltyAmount`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        internalType: `bool`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setClaimConditions`,
    inputs: [
      {
        type: `tuple`,
        name: `_condition`,
        components: [
          {
            type: `uint256`,
            name: `startTimestamp`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `maxClaimableSupply`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `supplyClaimed`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `bytes32`,
            name: `merkleRoot`,
            internalType: `bytes32`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
          {
            type: `string`,
            name: `metadata`,
            internalType: `string`,
          },
        ],
        internalType: `struct IClaimCondition.ClaimCondition`,
      },
      {
        type: `bool`,
        name: `_resetClaimEligibility`,
        internalType: `bool`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setContractURI`,
    inputs: [
      {
        type: `string`,
        name: `_uri`,
        internalType: `string`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setDefaultRoyaltyInfo`,
    inputs: [
      {
        type: `address`,
        name: `_royaltyRecipient`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_royaltyBps`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setOwner`,
    inputs: [
      {
        type: `address`,
        name: `_newOwner`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setPrimarySaleRecipient`,
    inputs: [
      {
        type: `address`,
        name: `_saleRecipient`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setReceiverConditions`,
    inputs: [
      {
        type: `uint256`,
        name: `_id`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `_limit`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setRoyaltyInfoForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_recipient`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_bps`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `supportsInterface`,
    inputs: [
      {
        type: `bytes4`,
        name: `interfaceId`,
        internalType: `bytes4`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `symbol`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `tokenURI`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `totalSupply`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `transferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `verifyClaim`,
    inputs: [
      {
        type: `address`,
        name: `_claimer`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_quantity`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_currency`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_pricePerToken`,
        internalType: `uint256`,
      },
      {
        type: `tuple`,
        name: `_allowlistProof`,
        components: [
          {
            type: `bytes32[]`,
            name: `proof`,
            internalType: `bytes32[]`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
        ],
        internalType: `struct IDropSinglePhase.AllowlistProof`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: `isOverride`,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
];

export const ERCC721_DROP_ABI = [
  {
    type: `constructor`,
    name: ``,
    inputs: [
      {
        type: `string`,
        name: `_name`,
        internalType: `string`,
      },
      {
        type: `string`,
        name: `_symbol`,
        internalType: `string`,
      },
      {
        type: `address`,
        name: `_royaltyRecipient`,
        internalType: `address`,
      },
      {
        type: `uint128`,
        name: `_royaltyBps`,
        internalType: `uint128`,
      },
      {
        type: `address`,
        name: `_primarySaleRecipient`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `error`,
    name: `ApprovalCallerNotOwnerNorApproved`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApprovalQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApprovalToCurrentOwner`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApproveToCaller`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `BalanceQueryForZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `MintToZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `MintZeroQuantity`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `OperatorNotAllowed`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [],
  },
  {
    type: `error`,
    name: `OwnerQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferCallerNotOwnerNorApproved`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferFromIncorrectOwner`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferToNonERC721ReceiverImplementer`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferToZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `URIQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `event`,
    name: `Approval`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `approved`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        indexed: false,
        internalType: `bool`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ClaimConditionUpdated`,
    inputs: [
      {
        type: `tuple`,
        name: `condition`,
        components: [
          {
            type: `uint256`,
            name: `startTimestamp`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `maxClaimableSupply`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `supplyClaimed`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `bytes32`,
            name: `merkleRoot`,
            internalType: `bytes32`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
          {
            type: `string`,
            name: `metadata`,
            internalType: `string`,
          },
        ],
        indexed: false,
        internalType: `struct IClaimCondition.ClaimCondition`,
      },
      {
        type: `bool`,
        name: `resetEligibility`,
        indexed: false,
        internalType: `bool`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ContractURIUpdated`,
    inputs: [
      {
        type: `string`,
        name: `prevURI`,
        indexed: false,
        internalType: `string`,
      },
      {
        type: `string`,
        name: `newURI`,
        indexed: false,
        internalType: `string`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `DefaultRoyalty`,
    inputs: [
      {
        type: `address`,
        name: `newRoyaltyRecipient`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `newRoyaltyBps`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `OwnerUpdated`,
    inputs: [
      {
        type: `address`,
        name: `prevOwner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `newOwner`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `PrimarySaleRecipientUpdated`,
    inputs: [
      {
        type: `address`,
        name: `recipient`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleAdminChanged`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `previousAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `newAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleGranted`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleRevoked`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoyaltyForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `royaltyRecipient`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `royaltyBps`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokenURIRevealed`,
    inputs: [
      {
        type: `uint256`,
        name: `index`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `revealedURI`,
        indexed: false,
        internalType: `string`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokensClaimed`,
    inputs: [
      {
        type: `address`,
        name: `claimer`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `receiver`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `startTokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `quantityClaimed`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokensLazyMinted`,
    inputs: [
      {
        type: `uint256`,
        name: `startTokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `endTokenId`,
        indexed: false,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `baseURI`,
        indexed: false,
        internalType: `string`,
      },
      {
        type: `bytes`,
        name: `encryptedBaseURI`,
        indexed: false,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `Transfer`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `function`,
    name: `DEFAULT_ADMIN_ROLE`,
    inputs: [],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `OPERATOR_FILTER_REGISTRY`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `contract IOperatorFilterRegistry`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `approve`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `balanceOf`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `burn`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `claim`,
    inputs: [
      {
        type: `address`,
        name: `_receiver`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_quantity`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_currency`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_pricePerToken`,
        internalType: `uint256`,
      },
      {
        type: `tuple`,
        name: `_allowlistProof`,
        components: [
          {
            type: `bytes32[]`,
            name: `proof`,
            internalType: `bytes32[]`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
        ],
        internalType: `struct IDropSinglePhase.AllowlistProof`,
      },
      {
        type: `bytes`,
        name: `_data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `payable`,
  },
  {
    type: `function`,
    name: `claimCondition`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: `startTimestamp`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `maxClaimableSupply`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `supplyClaimed`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `quantityLimitPerWallet`,
        internalType: `uint256`,
      },
      {
        type: `bytes32`,
        name: `merkleRoot`,
        internalType: `bytes32`,
      },
      {
        type: `uint256`,
        name: `pricePerToken`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `currency`,
        internalType: `address`,
      },
      {
        type: `string`,
        name: `metadata`,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `contractURI`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `encryptDecrypt`,
    inputs: [
      {
        type: `bytes`,
        name: `data`,
        internalType: `bytes`,
      },
      {
        type: `bytes`,
        name: `key`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `bytes`,
        name: `result`,
        internalType: `bytes`,
      },
    ],
    stateMutability: `pure`,
  },
  {
    type: `function`,
    name: `encryptedData`,
    inputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `bytes`,
        name: ``,
        internalType: `bytes`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getApproved`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getBaseURICount`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getBatchIdAtIndex`,
    inputs: [
      {
        type: `uint256`,
        name: `_index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getDefaultRoyaltyInfo`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint16`,
        name: ``,
        internalType: `uint16`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRevealURI`,
    inputs: [
      {
        type: `uint256`,
        name: `_batchId`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `_key`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: `revealedURI`,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleAdmin`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMember`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `uint256`,
        name: `index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `member`,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMemberCount`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: `count`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoyaltyInfoForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint16`,
        name: ``,
        internalType: `uint16`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getSupplyClaimedByWallet`,
    inputs: [
      {
        type: `address`,
        name: `_claimer`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `grantRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `hasRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `hasRoleWithSwitch`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `isApprovedForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `isEncryptedBatch`,
    inputs: [
      {
        type: `uint256`,
        name: `_batchId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `lazyMint`,
    inputs: [
      {
        type: `uint256`,
        name: `_amount`,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `_baseURIForTokens`,
        internalType: `string`,
      },
      {
        type: `bytes`,
        name: `_data`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: `batchId`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `multicall`,
    inputs: [
      {
        type: `bytes[]`,
        name: `data`,
        internalType: `bytes[]`,
      },
    ],
    outputs: [
      {
        type: `bytes[]`,
        name: `results`,
        internalType: `bytes[]`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `name`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `nextTokenIdToClaim`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `nextTokenIdToMint`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `owner`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `ownerOf`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `primarySaleRecipient`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `renounceRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `reveal`,
    inputs: [
      {
        type: `uint256`,
        name: `_index`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `_key`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: `revealedURI`,
        internalType: `string`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `revokeRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `royaltyInfo`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `salePrice`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `receiver`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `royaltyAmount`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        internalType: `bool`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setClaimConditions`,
    inputs: [
      {
        type: `tuple`,
        name: `_condition`,
        components: [
          {
            type: `uint256`,
            name: `startTimestamp`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `maxClaimableSupply`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `supplyClaimed`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `bytes32`,
            name: `merkleRoot`,
            internalType: `bytes32`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
          {
            type: `string`,
            name: `metadata`,
            internalType: `string`,
          },
        ],
        internalType: `struct IClaimCondition.ClaimCondition`,
      },
      {
        type: `bool`,
        name: `_resetClaimEligibility`,
        internalType: `bool`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setContractURI`,
    inputs: [
      {
        type: `string`,
        name: `_uri`,
        internalType: `string`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setDefaultRoyaltyInfo`,
    inputs: [
      {
        type: `address`,
        name: `_royaltyRecipient`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_royaltyBps`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setOwner`,
    inputs: [
      {
        type: `address`,
        name: `_newOwner`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setPrimarySaleRecipient`,
    inputs: [
      {
        type: `address`,
        name: `_saleRecipient`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setRoyaltyInfoForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_recipient`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_bps`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `supportsInterface`,
    inputs: [
      {
        type: `bytes4`,
        name: `interfaceId`,
        internalType: `bytes4`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `symbol`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `tokenURI`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `totalSupply`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `transferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `verifyClaim`,
    inputs: [
      {
        type: `address`,
        name: `_claimer`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_quantity`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_currency`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_pricePerToken`,
        internalType: `uint256`,
      },
      {
        type: `tuple`,
        name: `_allowlistProof`,
        components: [
          {
            type: `bytes32[]`,
            name: `proof`,
            internalType: `bytes32[]`,
          },
          {
            type: `uint256`,
            name: `quantityLimitPerWallet`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
        ],
        internalType: `struct IDropSinglePhase.AllowlistProof`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: `isOverride`,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
];

export const ERC20_PEBBLE_ABI = [
  {
    inputs: [],
    stateMutability: `nonpayable`,
    type: `constructor`,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: `address`,
        name: `owner`,
        type: `address`,
      },
      {
        indexed: true,
        internalType: `address`,
        name: `spender`,
        type: `address`,
      },
      {
        indexed: false,
        internalType: `uint256`,
        name: `value`,
        type: `uint256`,
      },
    ],
    name: `Approval`,
    type: `event`,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: `uint8`,
        name: `version`,
        type: `uint8`,
      },
    ],
    name: `Initialized`,
    type: `event`,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: `address`,
        name: `previousOwner`,
        type: `address`,
      },
      {
        indexed: true,
        internalType: `address`,
        name: `newOwner`,
        type: `address`,
      },
    ],
    name: `OwnershipTransferred`,
    type: `event`,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: `address`,
        name: `from`,
        type: `address`,
      },
      {
        indexed: true,
        internalType: `address`,
        name: `to`,
        type: `address`,
      },
      {
        indexed: false,
        internalType: `uint256`,
        name: `value`,
        type: `uint256`,
      },
    ],
    name: `Transfer`,
    type: `event`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `owner`,
        type: `address`,
      },
      {
        internalType: `address`,
        name: `spender`,
        type: `address`,
      },
    ],
    name: `allowance`,
    outputs: [
      {
        internalType: `uint256`,
        name: ``,
        type: `uint256`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `spender`,
        type: `address`,
      },
      {
        internalType: `uint256`,
        name: `amount`,
        type: `uint256`,
      },
    ],
    name: `approve`,
    outputs: [
      {
        internalType: `bool`,
        name: ``,
        type: `bool`,
      },
    ],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `account`,
        type: `address`,
      },
    ],
    name: `balanceOf`,
    outputs: [
      {
        internalType: `uint256`,
        name: ``,
        type: `uint256`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `uint256`,
        name: `amount`,
        type: `uint256`,
      },
    ],
    name: `burn`,
    outputs: [],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `account`,
        type: `address`,
      },
      {
        internalType: `uint256`,
        name: `amount`,
        type: `uint256`,
      },
    ],
    name: `burnFrom`,
    outputs: [],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `account`,
        type: `address`,
      },
    ],
    name: `burntBalanceOf`,
    outputs: [
      {
        internalType: `uint256`,
        name: ``,
        type: `uint256`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [],
    name: `decimals`,
    outputs: [
      {
        internalType: `uint8`,
        name: ``,
        type: `uint8`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `spender`,
        type: `address`,
      },
      {
        internalType: `uint256`,
        name: `subtractedValue`,
        type: `uint256`,
      },
    ],
    name: `decreaseAllowance`,
    outputs: [
      {
        internalType: `bool`,
        name: ``,
        type: `bool`,
      },
    ],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `spender`,
        type: `address`,
      },
      {
        internalType: `uint256`,
        name: `addedValue`,
        type: `uint256`,
      },
    ],
    name: `increaseAllowance`,
    outputs: [
      {
        internalType: `bool`,
        name: ``,
        type: `bool`,
      },
    ],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [],
    name: `initialize`,
    outputs: [],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `to`,
        type: `address`,
      },
      {
        internalType: `uint256`,
        name: `amount`,
        type: `uint256`,
      },
    ],
    name: `mint`,
    outputs: [],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [],
    name: `name`,
    outputs: [
      {
        internalType: `string`,
        name: ``,
        type: `string`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [],
    name: `owner`,
    outputs: [
      {
        internalType: `address`,
        name: ``,
        type: `address`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [],
    name: `renounceOwnership`,
    outputs: [],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [],
    name: `symbol`,
    outputs: [
      {
        internalType: `string`,
        name: ``,
        type: `string`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [],
    name: `totalSupply`,
    outputs: [
      {
        internalType: `uint256`,
        name: ``,
        type: `uint256`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `to`,
        type: `address`,
      },
      {
        internalType: `uint256`,
        name: `amount`,
        type: `uint256`,
      },
    ],
    name: `transfer`,
    outputs: [
      {
        internalType: `bool`,
        name: ``,
        type: `bool`,
      },
    ],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `from`,
        type: `address`,
      },
      {
        internalType: `address`,
        name: `to`,
        type: `address`,
      },
      {
        internalType: `uint256`,
        name: `amount`,
        type: `uint256`,
      },
    ],
    name: `transferFrom`,
    outputs: [
      {
        internalType: `bool`,
        name: ``,
        type: `bool`,
      },
    ],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [
      {
        internalType: `address`,
        name: `newOwner`,
        type: `address`,
      },
    ],
    name: `transferOwnership`,
    outputs: [],
    stateMutability: `nonpayable`,
    type: `function`,
  },
];

export const ERC721_PEBBLE_SIGNATURE_DROP_ABI = [
  {
    type: `constructor`,
    name: ``,
    inputs: [
      {
        type: `string`,
        name: `_name`,
        internalType: `string`,
      },
      {
        type: `string`,
        name: `_symbol`,
        internalType: `string`,
      },
      {
        type: `address`,
        name: `_royaltyRecipient`,
        internalType: `address`,
      },
      {
        type: `uint128`,
        name: `_royaltyBps`,
        internalType: `uint128`,
      },
      {
        type: `address`,
        name: `_primarySaleRecipient`,
        internalType: `address`,
      },
      {
        type: `uint128`,
        name: `_platformFeeBps`,
        internalType: `uint128`,
      },
      {
        type: `address`,
        name: `_platformFeeRecipient`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `error`,
    name: `ApprovalCallerNotOwnerNorApproved`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApprovalQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApprovalToCurrentOwner`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `ApproveToCaller`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `BalanceQueryForZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `MintToZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `MintZeroQuantity`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `OperatorNotAllowed`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [],
  },
  {
    type: `error`,
    name: `OwnerQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferCallerNotOwnerNorApproved`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferFromIncorrectOwner`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferToNonERC721ReceiverImplementer`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `TransferToZeroAddress`,
    inputs: [],
    outputs: [],
  },
  {
    type: `error`,
    name: `URIQueryForNonexistentToken`,
    inputs: [],
    outputs: [],
  },
  {
    type: `event`,
    name: `Approval`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `approved`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        indexed: false,
        internalType: `bool`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ContractURIUpdated`,
    inputs: [
      {
        type: `string`,
        name: `prevURI`,
        indexed: false,
        internalType: `string`,
      },
      {
        type: `string`,
        name: `newURI`,
        indexed: false,
        internalType: `string`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `DefaultRoyalty`,
    inputs: [
      {
        type: `address`,
        name: `newRoyaltyRecipient`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `newRoyaltyBps`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `OperatorRestriction`,
    inputs: [
      {
        type: `bool`,
        name: `restriction`,
        indexed: false,
        internalType: `bool`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `OwnerUpdated`,
    inputs: [
      {
        type: `address`,
        name: `prevOwner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `newOwner`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `PlatformFeeInfoUpdated`,
    inputs: [
      {
        type: `address`,
        name: `platformFeeRecipient`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `platformFeeBps`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `PrimarySaleRecipientUpdated`,
    inputs: [
      {
        type: `address`,
        name: `recipient`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleAdminChanged`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `previousAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `newAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleGranted`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleRevoked`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoyaltyForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `royaltyRecipient`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `royaltyBps`,
        indexed: false,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokensLazyMinted`,
    inputs: [
      {
        type: `uint256`,
        name: `startTokenId`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `endTokenId`,
        indexed: false,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `baseURI`,
        indexed: false,
        internalType: `string`,
      },
      {
        type: `bytes`,
        name: `encryptedBaseURI`,
        indexed: false,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `TokensMintedWithSignature`,
    inputs: [
      {
        type: `address`,
        name: `signer`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `mintedTo`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenIdMinted`,
        indexed: true,
        internalType: `uint256`,
      },
      {
        type: `tuple`,
        name: `mintRequest`,
        components: [
          {
            type: `address`,
            name: `to`,
            internalType: `address`,
          },
          {
            type: `address`,
            name: `royaltyRecipient`,
            internalType: `address`,
          },
          {
            type: `uint256`,
            name: `royaltyBps`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `primarySaleRecipient`,
            internalType: `address`,
          },
          {
            type: `string`,
            name: `uri`,
            internalType: `string`,
          },
          {
            type: `uint256`,
            name: `quantity`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
          {
            type: `uint128`,
            name: `validityStartTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `uint128`,
            name: `validityEndTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `bytes32`,
            name: `uid`,
            internalType: `bytes32`,
          },
        ],
        indexed: false,
        internalType: `struct ISignatureMintERC721.MintRequest`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `Transfer`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `function`,
    name: `DEFAULT_ADMIN_ROLE`,
    inputs: [],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `OPERATOR_FILTER_REGISTRY`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `contract IOperatorFilterRegistry`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `approve`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `balanceOf`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `batchMintTo`,
    inputs: [
      {
        type: `address`,
        name: `_to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_quantity`,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `_baseURI`,
        internalType: `string`,
      },
      {
        type: `bytes`,
        name: `_data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `burn`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `contractURI`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getApproved`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getBaseURICount`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getBatchIdAtIndex`,
    inputs: [
      {
        type: `uint256`,
        name: `_index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getDefaultRoyaltyInfo`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint16`,
        name: ``,
        internalType: `uint16`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getPlatformFeeInfo`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint16`,
        name: ``,
        internalType: `uint16`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleAdmin`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMember`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `uint256`,
        name: `index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `member`,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMemberCount`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: `count`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoyaltyInfoForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint16`,
        name: ``,
        internalType: `uint16`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getSignatureMintedByWallet`,
    inputs: [
      {
        type: `address`,
        name: `_address`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `grantRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `hasRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `hasRoleWithSwitch`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `isApprovedForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `isApprovedOrOwner`,
    inputs: [
      {
        type: `address`,
        name: `_operator`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: `isApprovedOrOwnerOf`,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `lazyMint`,
    inputs: [
      {
        type: `uint256`,
        name: `_amount`,
        internalType: `uint256`,
      },
      {
        type: `string`,
        name: `_baseURIForTokens`,
        internalType: `string`,
      },
      {
        type: `bytes`,
        name: `_data`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: `batchId`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `mintTo`,
    inputs: [
      {
        type: `address`,
        name: `_to`,
        internalType: `address`,
      },
      {
        type: `string`,
        name: `_tokenURI`,
        internalType: `string`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `mintWithSignature`,
    inputs: [
      {
        type: `tuple`,
        name: `_req`,
        components: [
          {
            type: `address`,
            name: `to`,
            internalType: `address`,
          },
          {
            type: `address`,
            name: `royaltyRecipient`,
            internalType: `address`,
          },
          {
            type: `uint256`,
            name: `royaltyBps`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `primarySaleRecipient`,
            internalType: `address`,
          },
          {
            type: `string`,
            name: `uri`,
            internalType: `string`,
          },
          {
            type: `uint256`,
            name: `quantity`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
          {
            type: `uint128`,
            name: `validityStartTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `uint128`,
            name: `validityEndTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `bytes32`,
            name: `uid`,
            internalType: `bytes32`,
          },
        ],
        internalType: `struct ISignatureMintERC721.MintRequest`,
      },
      {
        type: `bytes`,
        name: `_signature`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `signer`,
        internalType: `address`,
      },
    ],
    stateMutability: `payable`,
  },
  {
    type: `function`,
    name: `multicall`,
    inputs: [
      {
        type: `bytes[]`,
        name: `data`,
        internalType: `bytes[]`,
      },
    ],
    outputs: [
      {
        type: `bytes[]`,
        name: `results`,
        internalType: `bytes[]`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `name`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `nextTokenIdToClaim`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `nextTokenIdToMint`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `operatorRestriction`,
    inputs: [],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `owner`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `ownerOf`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `primarySaleRecipient`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `renounceRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `revokeRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `royaltyInfo`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `salePrice`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `receiver`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `royaltyAmount`,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        internalType: `bool`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setContractURI`,
    inputs: [
      {
        type: `string`,
        name: `_uri`,
        internalType: `string`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setDefaultRoyaltyInfo`,
    inputs: [
      {
        type: `address`,
        name: `_royaltyRecipient`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_royaltyBps`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setOperatorRestriction`,
    inputs: [
      {
        type: `bool`,
        name: `_restriction`,
        internalType: `bool`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setOwner`,
    inputs: [
      {
        type: `address`,
        name: `_newOwner`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setPlatformFeeInfo`,
    inputs: [
      {
        type: `address`,
        name: `_platformFeeRecipient`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_platformFeeBps`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setPrimarySaleRecipient`,
    inputs: [
      {
        type: `address`,
        name: `_saleRecipient`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setRoyaltyInfoForToken`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_recipient`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `_bps`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `supportsInterface`,
    inputs: [
      {
        type: `bytes4`,
        name: `interfaceId`,
        internalType: `bytes4`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `symbol`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `tokenURI`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `totalSupply`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `transferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `verify`,
    inputs: [
      {
        type: `tuple`,
        name: `_req`,
        components: [
          {
            type: `address`,
            name: `to`,
            internalType: `address`,
          },
          {
            type: `address`,
            name: `royaltyRecipient`,
            internalType: `address`,
          },
          {
            type: `uint256`,
            name: `royaltyBps`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `primarySaleRecipient`,
            internalType: `address`,
          },
          {
            type: `string`,
            name: `uri`,
            internalType: `string`,
          },
          {
            type: `uint256`,
            name: `quantity`,
            internalType: `uint256`,
          },
          {
            type: `uint256`,
            name: `pricePerToken`,
            internalType: `uint256`,
          },
          {
            type: `address`,
            name: `currency`,
            internalType: `address`,
          },
          {
            type: `uint128`,
            name: `validityStartTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `uint128`,
            name: `validityEndTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `bytes32`,
            name: `uid`,
            internalType: `bytes32`,
          },
        ],
        internalType: `struct ISignatureMintERC721.MintRequest`,
      },
      {
        type: `bytes`,
        name: `_signature`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: `success`,
        internalType: `bool`,
      },
      {
        type: `address`,
        name: `signer`,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
];

export const ERC721_SIGNATURE_DROP_MINATO = [
  {
    type: `constructor`,
    name: ``,
    inputs: [],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `error`,
    name: `OperatorNotAllowed`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [],
  },
  {
    type: `event`,
    name: `AdminChanged`,
    inputs: [
      {
        type: `address`,
        name: `previousAdmin`,
        indexed: false,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `newAdmin`,
        indexed: false,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `Approval`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `approved`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        indexed: false,
        internalType: `bool`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `BeaconUpgraded`,
    inputs: [
      {
        type: `address`,
        name: `beacon`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `ContractURIUpdated`,
    inputs: [
      {
        type: `string`,
        name: `prevURI`,
        indexed: false,
        internalType: `string`,
      },
      {
        type: `string`,
        name: `newURI`,
        indexed: false,
        internalType: `string`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `Initialized`,
    inputs: [
      {
        type: `uint8`,
        name: `version`,
        indexed: false,
        internalType: `uint8`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `OwnershipTransferred`,
    inputs: [
      {
        type: `address`,
        name: `previousOwner`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `newOwner`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleAdminChanged`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `previousAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `bytes32`,
        name: `newAdminRole`,
        indexed: true,
        internalType: `bytes32`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleGranted`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `RoleRevoked`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        indexed: true,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `sender`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `Transfer`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        indexed: true,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        indexed: true,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `event`,
    name: `Upgraded`,
    inputs: [
      {
        type: `address`,
        name: `implementation`,
        indexed: true,
        internalType: `address`,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: `function`,
    name: `DEFAULT_ADMIN_ROLE`,
    inputs: [],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `PEBBLE_NFT_CONTRACT_ADDRESS`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `_currentIndex`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `approve`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `balanceOf`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `burn`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `candyNftsConsumed`,
    inputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `contractURI`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getApproved`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleAdmin`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMember`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `uint256`,
        name: `index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `getRoleMemberCount`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `grantRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `hasRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `initialize`,
    inputs: [],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `isApprovedForAll`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `mintTo`,
    inputs: [
      {
        type: `address`,
        name: `_to`,
        internalType: `address`,
      },
      {
        type: `string`,
        name: `_tokenURI`,
        internalType: `string`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `mintWithSignature`,
    inputs: [
      {
        type: `tuple`,
        name: `_req`,
        components: [
          {
            type: `address`,
            name: `to`,
            internalType: `address`,
          },
          {
            type: `string[]`,
            name: `uris`,
            internalType: `string[]`,
          },
          {
            type: `uint256[]`,
            name: `candyTokenIds`,
            internalType: `uint256[]`,
          },
          {
            type: `uint256[]`,
            name: `pebbleNftTokenIds`,
            internalType: `uint256[]`,
          },
          {
            type: `uint128`,
            name: `validityStartTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `uint128`,
            name: `validityEndTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `bytes32`,
            name: `uid`,
            internalType: `bytes32`,
          },
        ],
        internalType: `struct IPhase3ERC721.MintRequest`,
      },
      {
        type: `bytes`,
        name: `_signature`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: `signer`,
        internalType: `address`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `multicall`,
    inputs: [
      {
        type: `bytes[]`,
        name: `data`,
        internalType: `bytes[]`,
      },
    ],
    outputs: [
      {
        type: `bytes[]`,
        name: `results`,
        internalType: `bytes[]`,
      },
    ],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `name`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `nextTokenIdToMint`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `owner`,
    inputs: [],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `ownerOf`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `pebbleNftsConsumed`,
    inputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `proxiableUUID`,
    inputs: [],
    outputs: [
      {
        type: `bytes32`,
        name: ``,
        internalType: `bytes32`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `renounceOwnership`,
    inputs: [],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `renounceRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `revokeRole`,
    inputs: [
      {
        type: `bytes32`,
        name: `role`,
        internalType: `bytes32`,
      },
      {
        type: `address`,
        name: `account`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `royaltyInfo`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
      {
        type: `uint256`,
        name: `_salePrice`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `address`,
        name: ``,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `safeTransferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
      {
        type: `bytes`,
        name: `data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setApprovalForAll`,
    inputs: [
      {
        type: `address`,
        name: `operator`,
        internalType: `address`,
      },
      {
        type: `bool`,
        name: `approved`,
        internalType: `bool`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setContractURI`,
    inputs: [
      {
        type: `string`,
        name: `_uri`,
        internalType: `string`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setDefaultRoyalty`,
    inputs: [
      {
        type: `address`,
        name: `_receiver`,
        internalType: `address`,
      },
      {
        type: `uint96`,
        name: `_feeNumerator`,
        internalType: `uint96`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `setRoyalty`,
    inputs: [
      {
        type: `uint256`,
        name: `_tokenId`,
        internalType: `uint256`,
      },
      {
        type: `address`,
        name: `_receiver`,
        internalType: `address`,
      },
      {
        type: `uint96`,
        name: `_royalty`,
        internalType: `uint96`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `supportsInterface`,
    inputs: [
      {
        type: `bytes4`,
        name: `interfaceId`,
        internalType: `bytes4`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: ``,
        internalType: `bool`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `symbol`,
    inputs: [],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `tokenByIndex`,
    inputs: [
      {
        type: `uint256`,
        name: `index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `tokenOfOwnerByIndex`,
    inputs: [
      {
        type: `address`,
        name: `owner`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `index`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `tokenURI`,
    inputs: [
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [
      {
        type: `string`,
        name: ``,
        internalType: `string`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `totalSupply`,
    inputs: [],
    outputs: [
      {
        type: `uint256`,
        name: ``,
        internalType: `uint256`,
      },
    ],
    stateMutability: `view`,
  },
  {
    type: `function`,
    name: `transferFrom`,
    inputs: [
      {
        type: `address`,
        name: `from`,
        internalType: `address`,
      },
      {
        type: `address`,
        name: `to`,
        internalType: `address`,
      },
      {
        type: `uint256`,
        name: `tokenId`,
        internalType: `uint256`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `transferOwnership`,
    inputs: [
      {
        type: `address`,
        name: `newOwner`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `updatePebbleNFTContractAddress`,
    inputs: [
      {
        type: `address`,
        name: `_newAddress`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `upgradeTo`,
    inputs: [
      {
        type: `address`,
        name: `newImplementation`,
        internalType: `address`,
      },
    ],
    outputs: [],
    stateMutability: `nonpayable`,
  },
  {
    type: `function`,
    name: `upgradeToAndCall`,
    inputs: [
      {
        type: `address`,
        name: `newImplementation`,
        internalType: `address`,
      },
      {
        type: `bytes`,
        name: `data`,
        internalType: `bytes`,
      },
    ],
    outputs: [],
    stateMutability: `payable`,
  },
  {
    type: `function`,
    name: `verify`,
    inputs: [
      {
        type: `tuple`,
        name: `_req`,
        components: [
          {
            type: `address`,
            name: `to`,
            internalType: `address`,
          },
          {
            type: `string[]`,
            name: `uris`,
            internalType: `string[]`,
          },
          {
            type: `uint256[]`,
            name: `candyTokenIds`,
            internalType: `uint256[]`,
          },
          {
            type: `uint256[]`,
            name: `pebbleNftTokenIds`,
            internalType: `uint256[]`,
          },
          {
            type: `uint128`,
            name: `validityStartTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `uint128`,
            name: `validityEndTimestamp`,
            internalType: `uint128`,
          },
          {
            type: `bytes32`,
            name: `uid`,
            internalType: `bytes32`,
          },
        ],
        internalType: `struct IPhase3ERC721.MintRequest`,
      },
      {
        type: `bytes`,
        name: `_signature`,
        internalType: `bytes`,
      },
    ],
    outputs: [
      {
        type: `bool`,
        name: `success`,
        internalType: `bool`,
      },
      {
        type: `address`,
        name: `signer`,
        internalType: `address`,
      },
    ],
    stateMutability: `view`,
  },
];
