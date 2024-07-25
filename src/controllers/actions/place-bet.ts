import * as anchor from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  ActionError,
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import type { Request, Response } from "express";

import { connection, pdaHelper, program } from "@/helpers";
import type {
  PlaceBetGetQuery,
  PlaceBetPostQuery,
  PlaceBetPostBody,
} from "@/validations";
import type { BetterRequest } from "@/types";

export const placeBetGetHandler = async (
  req: BetterRequest<{}, {}, PlaceBetGetQuery, {}>,
  res: Response
) => {
  const {
    query: { market },
  } = req;

  const response: ActionGetResponse = {
    // TODO: need to change it to a dynamic image
    icon: "https://i.pinimg.com/236x/a4/48/e7/a448e7342eee887d55712e45fa97f085.jpg",
    title: "Place a bet!",
    label: "Place a bet!",
    description: "Place a bet on the market outcome",
    links: {
      actions: [
        {
          label: "Place a bet!",
          href: `/api/actions/place-bet?market=${market}&choice={choice}&amount={amount}`,
          parameters: [
            {
              name: "choice",
              label: "Choice",
              required: true,
            },
            {
              name: "amount",
              label: "Amount",
              required: true,
            },
          ],
        },
      ],
    },
  };

  return res.status(200).header(ACTIONS_CORS_HEADERS).json(response);
};

export const placeBetPostHandler = async (
  req: BetterRequest<{}, PlaceBetPostBody, PlaceBetPostQuery, {}>,
  res: Response
) => {
  const {
    query: { market, choice, amount },
    body: { account },
  } = req;

  const betAmount = new anchor.BN(amount * LAMPORTS_PER_SOL);
  const betChoice = choice.toLowerCase() === "yes" ? true : false;
  const marketPDA = new PublicKey(market);
  const user = new PublicKey(account);
  const userPositionPDA = pdaHelper.userPosition(marketPDA, user);

  try {
    const ixns: anchor.web3.TransactionInstruction[] = [];

    try {
      await program.account.userPosition.fetch(userPositionPDA);
    } catch (err) {
      const createUserIxn = await program.methods
        .createUser()
        .accountsStrict({
          market: marketPDA,
          user: user,
          userPosition: userPositionPDA,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      ixns.push(createUserIxn);
    }

    const placeBetIxn = await program.methods
      .placeBet(betAmount, betChoice)
      .accountsStrict({
        market: marketPDA,
        user,
        userPosition: userPositionPDA,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    ixns.push(placeBetIxn);

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
    console.log(err);

    const response: ActionError = {
      message: "internal server error",
    };

    return res.status(500).header(ACTIONS_CORS_HEADERS).json(response);
  }
};

export const placeBetOptionsHandler = async (_req: Request, res: Response) => {
  return res.status(200).header(ACTIONS_CORS_HEADERS).json({
    message: "gm",
  });
};

export const placeBetHandler = (req: Request, res: Response) => {
  const method = req.method;

  if (method === "GET") {
    return placeBetGetHandler(
      req as unknown as BetterRequest<{}, {}, PlaceBetGetQuery, {}>,
      res
    );
  } else if (method === "POST") {
    return placeBetPostHandler(
      req as unknown as BetterRequest<
        {},
        PlaceBetPostBody,
        PlaceBetPostQuery,
        {}
      >,
      res
    );
  } else if (method === "OPTIONS") {
    return placeBetOptionsHandler(req, res);
  } else {
    return res.status(404).json({
      message: "method not found",
    });
  }
};
