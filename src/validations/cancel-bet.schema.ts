import { z } from "zod";

import { isValidPublicKey } from "@/utils";

export const CancelBetGetQuery = z.object({
  market: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});

export const CancelBetPostQuery = z.object({
  market: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});
export const CancelBetPostBody = z.object({
  account: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});

export const CancelBetGetSchema = z.object({
  query: CancelBetGetQuery,
});
export const CancelBetPostSchema = z.object({
  query: CancelBetPostQuery,
  body: CancelBetPostBody,
});

export type TCancelBetGetQuery = z.infer<typeof CancelBetGetQuery>;
export type TCancelBetPostQuery = z.infer<typeof CancelBetPostQuery>;
export type TCancelBetPostBody = z.infer<typeof CancelBetPostBody>;
