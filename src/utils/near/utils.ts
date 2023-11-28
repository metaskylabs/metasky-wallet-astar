import {
  connect,
  Contract,
  keyStores,
  WalletConnection,
  Account,
  utils,
} from 'near-api-js';

const nearConfig = {
  networkId: process.env.NEXT_PUBLIC_NEAR_NETWORK_ID as string,
  nodeUrl: process.env.NEXT_PUBLIC_NEAR_NODE_URL as string,
  contractName: process.env.NEXT_PUBLIC_NEAR_CONTRACT_NAME,
  walletUrl: process.env.NEXT_PUBLIC_NEAR_WALLET_URL,
  helperUrl: process.env.NEXT_PUBLIC_NEAR_HELPER_URL,
  headers: {},
};

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  if (window) {
    const near = await connect({
      ...nearConfig,
      keyStore:
        typeof window === `undefined`
          ? new keyStores.InMemoryKeyStore()
          : new keyStores.BrowserLocalStorageKeyStore(),
    });
    (window as any).msnear = near;
    // Initializing Wallet based Account. It can work with NEAR testnet wallet that
    // is hosted at https://wallet.testnet.near.org

    // Making Config Info Public
    (window as any).nearConfigInfo = nearConfig;
  }
}

export function logout() {
  if ((window as any)?.msnear) {
    new WalletConnection((window as any).msnear, `near-ms-`).signOut();
  }
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  if ((window as any)?.msnear) {
    return new WalletConnection((window as any).msnear, `near-ms-`)
      .requestSignIn({
        contractId: nearConfig.contractName,
      })
      .catch((e) => {
        console.log(e);
        console.log(`Not able to redirect`);
      });
  }
}
