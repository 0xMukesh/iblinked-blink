import { z } from "zod";

import { isValidPublicKey } from "@/utils";

export const ClaimWinningsGetQuery = z.object({
  market: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});

export const ClaimWinningsPostQuery = z.object({
  market: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});
export const ClaimWinningsPostBody = z.object({
  account: z.string().refine(isValidPublicKey, (val) => ({
    message: `${val} is not a valid solana public key`,
  })),
});

export const ClaimWinningsGetSchema = z.object({
  query: ClaimWinningsGetQuery,
});
export const ClaimWinningsPostSchema = z.object({
  query: ClaimWinningsPostQuery,
  body: ClaimWinningsPostBody,
});

export type TClaimWinningsGetQuery = z.infer<typeof ClaimWinningsGetQuery>;
export type TClaimWinningsPostQuery = z.infer<typeof ClaimWinningsPostQuery>;
export type TClaimWinningsPostBody = z.infer<typeof ClaimWinningsPostBody>;
export type TClaimWinningsGetSchema = z.infer<typeof ClaimWinningsGetSchema>;
export type TClaimWinningsPostSchema = z.infer<typeof ClaimWinningsPostSchema>;
