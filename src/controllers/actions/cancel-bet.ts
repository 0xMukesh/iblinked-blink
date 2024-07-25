import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  ActionError,
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import type { Request, Response } from "express";

import { connection, pdaHelper, program } from "@/helpers";
import {
  TCancelBetGetQuery,
  TCancelBetPostBody,
  TCancelBetPostQuery,
} from "@/validations";
import type { BetterRequest } from "@/types";

export const cancelBetGetHandler = async (
  req: BetterRequest<{}, {}, TCancelBetGetQuery, {}>,
  res: Response
) => {
  const {
    query: { market },
  } = req;

  const response: ActionGetResponse = {
    // TODO: need to change it to a dynamic image
    icon: "https://i.pinimg.com/236x/a4/48/e7/a448e7342eee887d55712e45fa97f085.jpg",
    title: "Cancel a bet!",
    label: "Cancel a bet!",
    description: "Cancel your bet on the market",
    links: {
      actions: [
        {
          label: "Cancel a bet!",
          href: `/api/actions/cancel-bet?market=${market}`,
        },
      ],
    },
  };

  return res.status(200).header(ACTIONS_CORS_HEADERS).json(response);
};

export const cancelBetPostHandler = async (
  req: BetterRequest<{}, TCancelBetPostBody, TCancelBetPostQuery, {}>,
  res: Response
) => {
  const {
    query: { market },
    body: { account },
  } = req;

  const marketPDA = new PublicKey(market);
  const user = new PublicKey(account);
  const userPositionPDA = pdaHelper.userPosition(marketPDA, user);

  try {
    const ixns: anchor.web3.TransactionInstruction[] = [];

    // TODO: check whether required PDAs like `userPositionPDA` and `marketPDA` exists or not
    const cancelBetIxn = await program.methods
      .cancelBet()
      .accountsStrict({
        market: marketPDA,
        user: user,
        userPosition: userPositionPDA,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    ixns.push(cancelBetIxn);

    const { blockhash } = await connection.getLatestBlockhash();

    const txn = new anchor.web3.VersionedTransaction(
      new anchor.web3.TransactionMessage({
        payerKey: user,
        recentBlockhash: blockhash,
        instructions: ixns,
      }).compileToV0Message()
    );

    const serializedTxn = Buffer.from(txn.serialize()).toString("base64");

    // FIXME: txn gets executed succesfully but it doesn't show the success message on dial.to. might be dial.to's error but need to check
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

export const cancelBetOptionsHandler = async (_req: Request, res: Response) => {
  return res.status(200).header(ACTIONS_CORS_HEADERS).json({
    message: "gm",
  });
};

export const cancelBetHandler = async (req: Request, res: Response) => {
  const method = req.method;

  if (method === "GET") {
    return cancelBetGetHandler(
      req as unknown as BetterRequest<{}, {}, TCancelBetGetQuery, {}>,
      res
    );
  } else if (method === "POST") {
    return cancelBetPostHandler(
      req as unknown as BetterRequest<
        {},
        TCancelBetPostBody,
        TCancelBetPostQuery,
        {}
      >,
      res
    );
  } else if (method === "OPTIONS") {
    return cancelBetOptionsHandler(req, res);
  } else {
    return res.status(404).header(ACTIONS_CORS_HEADERS).json({
      message: "method not found",
    });
  }
};
