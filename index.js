import "dotenv/config";
import { Account, Vault, VAULT_IDS } from "@xbacked-dao/xbacked-sdk";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const feeCollector = async ({ account, vault }) => {
  console.log(`Collecting fees... ${new Date().toString()}`);
  const isFeesSettled = await account.collectFees({ vault });

  if (!isFeesSettled) return false;

  isFeesSettled && console.log("Fee was successfully settled");
};

(async () => {
  // Check for null parameters
  if (
    !process.env.PASS_PHRASE ||
    !process.env.SLEEP_DURATION ||
    !process.env.NETWORK
  )
    throw new Error("Some required parameters are missing!");

  console.log("Instantiating account...");
  // Instantiate a new Account
  const account = new Account({
    mnemonic: process.env.PASS_PHRASE,
    network: process.env.NETWORK,
  });

  // Instantiate a new Vault
  const vault = new Vault({ id: VAULT_IDS.TestNet.algo });

  // Collect Fees
  do {
    try {
      console.log("Sleeping...");
      await sleep(process.env.SLEEP_DURATION);
      await feeCollector({ account, vault });
    } catch (e) {
      console.log(e);
    }
  } while (true);
})().catch((e) => console.log(e));
