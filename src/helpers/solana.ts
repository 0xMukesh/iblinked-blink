import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import "dotenv/config";

import { PROGRAM_ID } from "@/constants";
import { BlinkTake2, IDL } from "@/idl";

export const connection = new Connection(process.env.CONNECTION_URL);
const wallet = new anchor.Wallet(Keypair.generate());
const provider = new anchor.AnchorProvider(connection, wallet, {
  commitment: "confirmed",
});
export const program = new anchor.Program<BlinkTake2>(
  IDL,
  PROGRAM_ID,
  provider
);

export const authorityKp = Keypair.fromSecretKey(
  anchor.utils.bytes.bs58.decode(process.env.AUTHORITY_SECRET_KEY)
);
export const authority = authorityKp.publicKey;

export class PdaHelper<T extends anchor.Idl> {
  private program: anchor.Program<T>;

  constructor(program: anchor.Program<T>) {
    this.program = program;
  }

  priceFeedConfig(authority: PublicKey, feed: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("price_feed_config"), authority.toBuffer(), feed.toBuffer()],
      this.program.programId
    )[0];
  }

  market(authority: PublicKey, coinSymbol: string) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("market"), authority.toBuffer(), Buffer.from(coinSymbol)],
      this.program.programId
    )[0];
  }

  userPosition(market: PublicKey, user: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("user_position"), market.toBuffer(), user.toBuffer()],
      this.program.programId
    )[0];
  }
}

export const pdaHelper = new PdaHelper(program);
