/**
 * Collect fees that have been accrued over time.
 * Caller is rewarded with 0.5% of the accrued fees and the rest is distributed
 * to the DAO and xUSD stakers
 * Fees is settled in the vault collateral asset (ALGO or ASA)
 * */

import { appendFile } from "fs/promises";
import {
  Account,
  Vault,
  VAULT_IDS,
  convertFromMicroUnits,
} from "@xbacked-dao/xbacked-sdk";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const feeCollector = async ({ account, vault, targetAmount = 0 }) => {
  try {
    const { accruedFees } = await account.getVaultState({ vault });

    // Early exit if there is no fees to collect
    if (accruedFees == 0) {
      console.log(
        "Accrued fee is zero (0). There is no fees to settle! Trying again..."
      );
      return false;
    }

    // If targetAmount is specified
    if (targetAmount > 0) {
      console.log("Checking if target amount >= accrued fees");

      if (convertFromMicroUnits(accruedFees) < targetAmount) {
        console.log(
          `Accrued fees: ${convertFromMicroUnits(
            accruedFees
          )} is lesser than targetAmount: ${targetAmount}`
        );

        return false;
      }
    }

    console.log("Collecting fees...");
    const isFeesSettled = await account.collectFees({ vault });

    if (!isFeesSettled) return false;

    isFeesSettled && console.log("Fee was successfully settled");

    // Log settlement
    const settlement = `${new Date().toString()} \n Fees Accrued: ${convertFromMicroUnits(
      accruedFees
    )} \n Reward: ${convertFromMicroUnits((accruedFees * 0.5) / 100)} \n\n`;

    // Store log in log
    console.log("Logging settlement...");
    appendFile("settlement_log", settlement, "utf-8", (err) => {
      if (err) {
        console.log(`Failed to log settlement.`);
        throw err;
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const taskRunner = async ({
  sleepDuration,
  network,
  passPhrase,
  targetAmount,
}) => {
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
      await feeCollector({ account, vault, targetAmount });
    } catch (e) {
      console.log(e);
    }
  } while (true);
};

export default taskRunner;
