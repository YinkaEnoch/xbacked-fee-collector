/**
 * Collect fees that have been accrued over time.
 * Caller is rewarded with 0.5% of the accrued fees and the rest is distributed
 * to the DAO and xUSD stakers
 * Fees is settled in the vault collateral asset (ALGO or ASA)
 * */

import { Account, Vault, VAULT_IDS } from "@xbacked-dao/xbacked-sdk";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const feeCollector = async ({ account, vault }) => {
  console.log(`Collecting fees... ${new Date().toString()}`);
  const isFeesSettled = await account.collectFees({ vault });

  if (!isFeesSettled) return false;

  isFeesSettled && console.log("Fee was successfully settled");
};

const taskRunner = async ({ sleepDuration, network, passPhrase }) => {
  // Check for null parameters
  if (!sleepDuration || !network || !passPhrase)
    throw new Error("Some required parameters are missing!");

  console.log("Instantiating account...");
  // Instantiate a new Account
  const account = new Account({
    mnemonic: passPhrase,
    network,
  });

  // Instantiate a new Vault
  const vault = new Vault({ id: VAULT_IDS.TestNet.algo });

  // Collect Fees
  do {
    try {
      console.log("Sleeping...");
      await sleep(sleepDuration);
      await feeCollector({ account, vault });
    } catch (e) {
      console.log(e);
    }
  } while (true);
};

export default taskRunner;
