import { z } from "zod";

import { isValidPublicKey, isProperChoice } from "@/utils";
import { MIN_BET_AMOUNT } from "@/constants";

export const PlaceBetGetQuery = z.object({
  market: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
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

export const PlaceBetGetSchema = z.object({
  query: PlaceBetGetQuery,
});
export const PlaceBetPostSchema = z.object({
  query: PlaceBetPostQuery,
  body: PlaceBetPostBody,
});

export type TPlaceBetGetQuery = z.infer<typeof PlaceBetGetQuery>;
export type TPlaceBetGetSchema = z.infer<typeof PlaceBetGetSchema>;
export type TPlaceBetPostQuery = z.infer<typeof PlaceBetPostQuery>;
export type TPlaceBetPostBody = z.infer<typeof PlaceBetPostBody>;
export type TPlaceBetPostSchema = z.infer<typeof PlaceBetPostSchema>;
