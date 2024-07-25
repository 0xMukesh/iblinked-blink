import * as anchor from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  ActionError,
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import type { Request, Response } from "express";

import { connection, pdaHelper, program, validate } from "@/helpers";
import {
  TPlaceBetGetQuery,
  TPlaceBetPostQuery,
  TPlaceBetPostBody,
  PlaceBetGetSchema,
  PlaceBetPostSchema,
} from "@/validations";
import type { BetterRequest } from "@/types";

export const placeBetGetHandler = async (
  req: BetterRequest<{}, {}, TPlaceBetGetQuery, {}>,
  res: Response
) => {
  const {
    query: { market },
  } = req;

  const [isValid, error] = validate(PlaceBetGetSchema, {
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
  req: BetterRequest<{}, TPlaceBetPostBody, TPlaceBetPostQuery, {}>,
  res: Response
) => {
  const {
    query: { market, choice, amount },
    body: { account },
  } = req;

  const [isValid, error] = validate(PlaceBetPostSchema, {
    body: req.body,
    query: req.query,
  });

  if (isValid === false && error !== undefined) {
    const response = {
      error: JSON.parse(error),
    };

    return res.status(400).header(ACTIONS_CORS_HEADERS).json(response);
  }

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

    // FIXME: txn gets executed succesfully but it doesn't show the success message on dial.to. might be dial.to's error but need to check
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
      req as unknown as BetterRequest<{}, {}, TPlaceBetGetQuery, {}>,
      res
    );
  } else if (method === "POST") {
    return placeBetPostHandler(
      req as unknown as BetterRequest<
        {},
        TPlaceBetPostBody,
        TPlaceBetPostQuery,
        {}
      >,
      res
    );
  } else if (method === "OPTIONS") {
    return placeBetOptionsHandler(req, res);
  } else {
    return res.status(404).header(ACTIONS_CORS_HEADERS).json({
      message: "method not found",
    });
  }
};
