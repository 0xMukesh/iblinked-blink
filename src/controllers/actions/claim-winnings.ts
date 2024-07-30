import * as anchor from "@coral-xyz/anchor";
import {
  ActionError,
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import type { Response, Request } from "express";

import { connection, pdaHelper, program, validate } from "@/helpers";
import {
  ClaimWinningsGetSchema,
  ClaimWinningsPostSchema,
  TClaimWinningsGetQuery,
  TClaimWinningsPostBody,
  TClaimWinningsPostQuery,
} from "@/validations";
import { BetterRequest } from "@/types";
import { PublicKey, SystemProgram } from "@solana/web3.js";

// TODO: check claim winnings blinks' route
export const claimWinningsGetHandler = async (
  req: BetterRequest<{}, {}, TClaimWinningsGetQuery, {}>,
  res: Response
) => {
  const {
    query: { market },
  } = req;

  const [isValid, error] = validate(ClaimWinningsGetSchema, {
    body: {},
    query: req.query,
  });

  if (isValid === false && error !== undefined) {
    const response = {
      error: JSON.parse(error),
    };

    return res.status(400).header(ACTIONS_CORS_HEADERS).json(response);
  }

  const response: ActionGetResponse = {
    icon: "https://i.pinimg.com/236x/a4/48/e7/a448e7342eee887d55712e45fa97f085.jpg",
    title: "Claim winnings!",
    label: "Claim winnings!",
    description: "Claim your winnings based on your shares",
    links: {
      actions: [
        {
          label: "Claim winnings!",
          href: `/api/actions/claim-winnings?market=${market}`,
        },
      ],
    },
  };

  return res.status(200).header(ACTIONS_CORS_HEADERS).json(response);
};

export const claimWinningsPostHandler = async (
  req: BetterRequest<{}, TClaimWinningsPostBody, TClaimWinningsPostQuery, {}>,
  res: Response
) => {
  const {
    query: { market },
    body: { account },
  } = req;

  const [isValid, error] = validate(ClaimWinningsPostSchema, {
    body: req.body,
    query: req.query,
  });

  if (isValid === false && error !== undefined) {
    const response = {
      error: JSON.parse(error),
    };

    return res.status(400).header(ACTIONS_CORS_HEADERS).json(response);
  }

  const marketPDA = new PublicKey(market);
  const user = new PublicKey(account);
  const userPositionPDA = pdaHelper.userPosition(marketPDA, user);

  try {
    const ixns: anchor.web3.TransactionInstruction[] = [];

    const claimWinningsIxn = await program.methods
      .claimWinnings()
      .accountsStrict({
        market: marketPDA,
        user: user,
        userPosition: userPositionPDA,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    ixns.push(claimWinningsIxn);

    const { blockhash } = await connection.getLatestBlockhash();

    const txn = new anchor.web3.VersionedTransaction(
      new anchor.web3.TransactionMessage({
        payerKey: user,
        recentBlockhash: blockhash,
        instructions: ixns,
      }).compileToV0Message()
    );

    const serializedTxn = Buffer.from(txn.serialize()).toString("base64");

    const response: ActionPostResponse = {
      transaction: serializedTxn,
      message: "wao!",
    };

    return res.status(200).header(ACTIONS_CORS_HEADERS).json(response);
  } catch (err) {
    const response: ActionError = {
      message: "internal server error",
    };

    return res.status(500).header(ACTIONS_CORS_HEADERS).json(response);
  }
};

export const claimWinningsOptionHandler = async (
  _req: Request,
  res: Response
) => {
  return res.status(200).header(ACTIONS_CORS_HEADERS).json({
    message: "gm",
  });
};

export const claimWinningsHandler = async (req: Request, res: Response) => {
  const method = req.method;

  if (method === "GET") {
    return claimWinningsGetHandler(
      req as unknown as BetterRequest<{}, {}, TClaimWinningsGetQuery, {}>,
      res
    );
  } else if (method === "POST") {
    return claimWinningsPostHandler(
      req as unknown as BetterRequest<
        {},
        TClaimWinningsPostBody,
        TClaimWinningsPostQuery,
        {}
      >,
      res
    );
  } else if (method === "OPTIONS") {
    return claimWinningsOptionHandler(req, res);
  } else {
    return res.status(404).header(ACTIONS_CORS_HEADERS).json({
      message: "method not found",
    });
  }
};
