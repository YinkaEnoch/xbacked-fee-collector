import "dotenv/config";
import { Account, Vault, VAULT_IDS } from "@xbacked-dao/xbacked-sdk";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const feeCollector = async ({ account, vault }) => {
  const isFeesSettled = await account.collectFees({ vault });
  console.log(isFeesSettled);
};

(async () => {
  // Instantiate a new Account
  const account = new Account({
    mnemonic: process.env.PASS_PHRASE,
    network: process.env.NETWORK,
  });

  // Instantiate a new Vault
  const vault = new Vault({ id: VAULT_IDS.TestNet.algo });

  // Collect Fees
  do {
    await feeCollector({ account, vault });
    await sleep(process.env.SLEEP_DURATION);
  } while (true);
})().catch((e) => console.log(e));
