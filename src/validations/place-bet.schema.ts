import { z } from "zod";
import { PublicKey } from "@solana/web3.js";
import { MIN_BET_AMOUNT } from "@/constants";

const isValidPublicKey = (pk: string) => {
  try {
    new PublicKey(pk);
    return true;
  } catch (err) {
    return false;
  }
};

const isProperChoice = (val: string) => {
  if (val.toLowerCase() === "yes" || "no") {
    return true;
  } else {
    return false;
  }
};

export const PlaceBetGetQuery = z.object({
  market: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});

export const PlaceBetGetSchema = z.object({
  query: PlaceBetGetQuery,
});

export const PlaceBetPostQuery = z.object({
  market: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
  choice: z.string().refine(isProperChoice, (val) => ({
    message: `invalid choice ${val}. the choices available are yes or no`,
  })),
  amount: z.number().refine(
    (num) => num >= MIN_BET_AMOUNT,
    () => ({
      message: `minimum bet amount is 1 million lamports`,
    })
  ),
});

export const PlaceBetPostBody = z.object({
  account: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});

export const PlaceBetPostSchema = z.object({
  query: PlaceBetPostQuery,
  body: PlaceBetPostBody,
});

export type PlaceBetGetQuery = z.infer<typeof PlaceBetGetQuery>;
export type PlaceBetGetSchema = z.infer<typeof PlaceBetGetSchema>;
export type PlaceBetPostQuery = z.infer<typeof PlaceBetPostQuery>;
export type PlaceBetPostBody = z.infer<typeof PlaceBetPostBody>;
export type PlaceBetPostSchema = z.infer<typeof PlaceBetPostSchema>;
