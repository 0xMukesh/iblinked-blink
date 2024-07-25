import * as anchor from "@coral-xyz/anchor";
import {
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

import {
  authority,
  authorityKp,
  connection,
  pdaHelper,
  program,
} from "@/helpers";
import { TEAM_WALLET } from "@/constants";

export const createMarket = async () => {
  const memeCoinSymbol = "WIF";
  // ETH/USD - solana-devnet
  const feed = new PublicKey("EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw");
  const duration = new anchor.BN(24 * 60 * 60);
  const priceFeedConfigPda = pdaHelper.priceFeedConfig(authority, feed);
  const marketPda = pdaHelper.market(authority, memeCoinSymbol);

  try {
    const initPriceFeedIxn = await program.methods
      .initializePriceFeed(feed)
      .accountsStrict({
        payer: authority,
        priceFeedConfig: priceFeedConfigPda,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const createMarketIxn = await program.methods
      .createMarket(memeCoinSymbol, feed.toString(), duration)
      .accountsStrict({
        authority: authority,
        market: marketPda,
        priceFeed: feed,
        priceFeedConfig: priceFeedConfigPda,
        teamWallet: TEAM_WALLET,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const txn = new Transaction().add(initPriceFeedIxn).add(createMarketIxn);

    const { blockhash } = await connection.getLatestBlockhash();

    txn.recentBlockhash = blockhash;
    txn.feePayer = authority;

    const sig = await sendAndConfirmTransaction(connection, txn, [authorityKp]);

    console.log(sig);
    console.log(`market pda - ${marketPda.toString()}`);
    console.log(`price feed config pda - ${priceFeedConfigPda.toString()}`);
  } catch (err) {
    console.log(err);
  }
};

createMarket();
