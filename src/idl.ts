export type BlinkTake2 = {
  "version": "0.1.0",
  "name": "blink_take_2",
  "instructions": [
    {
      "name": "createMarket",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeedConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "teamWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memecoinSymbol",
          "type": "string"
        },
        {
          "name": "feedId",
          "type": "string"
        },
        {
          "name": "duration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "placeBet",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "choice",
          "type": "bool"
        }
      ]
    },
    {
      "name": "resolveMarket",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "priceFeedConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimWinnings",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawTeamFee",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "teamWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelBet",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializePriceFeed",
      "accounts": [
        {
          "name": "priceFeedConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feed",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "memecoinSymbol",
            "type": "string"
          },
          {
            "name": "feedId",
            "type": "string"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "duration",
            "type": "u64"
          },
          {
            "name": "totalYesShares",
            "type": "u64"
          },
          {
            "name": "totalNoShares",
            "type": "u64"
          },
          {
            "name": "resolved",
            "type": "bool"
          },
          {
            "name": "winningOutcome",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "totalFunds",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "initialPrice",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "finalPrice",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "teamFeePaid",
            "type": "bool"
          },
          {
            "name": "teamFeeUnlockTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "priceFeedConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceFeed",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "userPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "market",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "yesShares",
            "type": "u64"
          },
          {
            "name": "noShares",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MarketNotActive",
      "msg": "Market is not active"
    },
    {
      "code": 6001,
      "name": "InsufficientFunds",
      "msg": "Insufficient Funds"
    },
    {
      "code": 6002,
      "name": "MarketAlreadyResolved",
      "msg": "The market is already resolved."
    },
    {
      "code": 6003,
      "name": "MarketNotResolved",
      "msg": "The market is not resolved yet."
    },
    {
      "code": 6004,
      "name": "PriceFetchFailed",
      "msg": "Failed to fetch price from Pyth"
    },
    {
      "code": 6005,
      "name": "InvalidDuration",
      "msg": "Invalid market duration"
    },
    {
      "code": 6006,
      "name": "MarketNotExpired",
      "msg": "Market has not expired yet"
    },
    {
      "code": 6007,
      "name": "NotAWinner",
      "msg": "Not a winner"
    },
    {
      "code": 6008,
      "name": "InitialPriceNotSet",
      "msg": "Initial Price not set"
    },
    {
      "code": 6009,
      "name": "AlreadyClaimed",
      "msg": "Winnings already claimed"
    },
    {
      "code": 6010,
      "name": "InsufficientMarketFunds",
      "msg": "Insufficient funds in the market"
    },
    {
      "code": 6011,
      "name": "BetAmountTooLow",
      "msg": "Bet amount is too low"
    },
    {
      "code": 6012,
      "name": "InsufficientUserFunds",
      "msg": "Insufficient user funds"
    },
    {
      "code": 6013,
      "name": "MarketAlreadyStarted",
      "msg": "Market has already started"
    },
    {
      "code": 6014,
      "name": "TeamFeeTimelockNotExpired",
      "msg": "Team fee timelock has not expired"
    },
    {
      "code": 6015,
      "name": "PythError",
      "msg": "Internal Pyth error"
    },
    {
      "code": 6016,
      "name": "TryToSerializePriceAccount",
      "msg": "Program should not try to serialize a price account"
    }
  ]
};

export const IDL: BlinkTake2 = {
  "version": "0.1.0",
  "name": "blink_take_2",
  "instructions": [
    {
      "name": "createMarket",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeedConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "teamWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "memecoinSymbol",
          "type": "string"
        },
        {
          "name": "feedId",
          "type": "string"
        },
        {
          "name": "duration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "placeBet",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "choice",
          "type": "bool"
        }
      ]
    },
    {
      "name": "resolveMarket",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "priceFeedConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimWinnings",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawTeamFee",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "teamWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "cancelBet",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializePriceFeed",
      "accounts": [
        {
          "name": "priceFeedConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feed",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "memecoinSymbol",
            "type": "string"
          },
          {
            "name": "feedId",
            "type": "string"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "duration",
            "type": "u64"
          },
          {
            "name": "totalYesShares",
            "type": "u64"
          },
          {
            "name": "totalNoShares",
            "type": "u64"
          },
          {
            "name": "resolved",
            "type": "bool"
          },
          {
            "name": "winningOutcome",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "totalFunds",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "initialPrice",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "finalPrice",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "teamFeePaid",
            "type": "bool"
          },
          {
            "name": "teamFeeUnlockTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "priceFeedConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceFeed",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "userPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "market",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "yesShares",
            "type": "u64"
          },
          {
            "name": "noShares",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MarketNotActive",
      "msg": "Market is not active"
    },
    {
      "code": 6001,
      "name": "InsufficientFunds",
      "msg": "Insufficient Funds"
    },
    {
      "code": 6002,
      "name": "MarketAlreadyResolved",
      "msg": "The market is already resolved."
    },
    {
      "code": 6003,
      "name": "MarketNotResolved",
      "msg": "The market is not resolved yet."
    },
    {
      "code": 6004,
      "name": "PriceFetchFailed",
      "msg": "Failed to fetch price from Pyth"
    },
    {
      "code": 6005,
      "name": "InvalidDuration",
      "msg": "Invalid market duration"
    },
    {
      "code": 6006,
      "name": "MarketNotExpired",
      "msg": "Market has not expired yet"
    },
    {
      "code": 6007,
      "name": "NotAWinner",
      "msg": "Not a winner"
    },
    {
      "code": 6008,
      "name": "InitialPriceNotSet",
      "msg": "Initial Price not set"
    },
    {
      "code": 6009,
      "name": "AlreadyClaimed",
      "msg": "Winnings already claimed"
    },
    {
      "code": 6010,
      "name": "InsufficientMarketFunds",
      "msg": "Insufficient funds in the market"
    },
    {
      "code": 6011,
      "name": "BetAmountTooLow",
      "msg": "Bet amount is too low"
    },
    {
      "code": 6012,
      "name": "InsufficientUserFunds",
      "msg": "Insufficient user funds"
    },
    {
      "code": 6013,
      "name": "MarketAlreadyStarted",
      "msg": "Market has already started"
    },
    {
      "code": 6014,
      "name": "TeamFeeTimelockNotExpired",
      "msg": "Team fee timelock has not expired"
    },
    {
      "code": 6015,
      "name": "PythError",
      "msg": "Internal Pyth error"
    },
    {
      "code": 6016,
      "name": "TryToSerializePriceAccount",
      "msg": "Program should not try to serialize a price account"
    }
  ]
};
