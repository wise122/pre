import "../styles/global.css";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"; 
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,  // ✅ Import Trust Wallet adapter
} from "@solana/wallet-adapter-wallets";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import { Layout } from "../components/Layout/layout";
import GetTokenDataProvider from "../contexts/TokenDataContext";
import "@solana/wallet-adapter-react-ui/styles.css"; 

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Choose Solana network: Devnet, Testnet, or Mainnet
  const network = WalletAdapterNetwork.Devnet;  
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Define wallets (Phantom, Solflare, Trust Wallet)
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TrustWalletAdapter(), // ✅ Add Trust Wallet support
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ToastContainer style={{ fontSize: 14 }} />
          <GetTokenDataProvider>
            <Head>
              <link rel="icon" type="image/x-icon" href="/imgs/logo.jpg" className="rounded-full" />
              <title>xHamster Token-Presale</title>
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GetTokenDataProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
