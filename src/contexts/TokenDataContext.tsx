import { ReactNode, createContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { GetTokenDataContextValue, UserDatas } from "../types/dataType";

// ✅ Perbaiki context agar menggunakan solBalance
export const GetTokenDataContext = createContext<GetTokenDataContextValue>({
  isBuyState: true,
  solBalance: 0, // ✅ Ganti dari ethBalanceOfContract ke solBalance
  isClaimableForuser: false,
  userData: undefined,
  getInfo: () => {},
});

interface GetTokenDataProviderProps {
  children: ReactNode;
}

// ✅ Pilih jaringan Solana (ganti ke "mainnet-beta" jika produksi)
const SOLANA_NETWORK = "devnet"; 

const GetTokenDataProvider: React.FC<GetTokenDataProviderProps> = ({ children }) => {
  const { publicKey } = useWallet();
  const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed");

  const [solBalance, setSolBalance] = useState(0);
  const [isClaimableForUser, setIsClaimableForUser] = useState(false);
  const [isBuyState, setIsBuyState] = useState(true);
  const [userData, setUserData] = useState<UserDatas>({
    walletAddr: "",
    solPaidAmount: 0, // ✅ Ganti dari ethPaidAmount ke solPaidAmount
    bunnyPaidAmount: 0,
    solCanClaimAmount: 0, // ✅ Ganti dari ethCanClaimAmount ke solCanClaimAmount
    bunnyCanClaimAmount: 0,
    solClaimedState: false, // ✅ Ganti dari ethClaimedState ke solClaimedState
    bunnyClaimedState: false,
  });

  // ✅ Fetch saldo SOL pengguna
  const getSolBalance = async () => {
    if (!publicKey) return;
    try {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / 10 ** 9); // Konversi dari lamports ke SOL
    } catch (error) {
      console.error("❌ Error fetching SOL balance:", error);
    }
  };

  // ✅ Fetch informasi pengguna
  const getInfo = async () => {
    if (!publicKey) return;

    try {
      await getSolBalance(); // Dapatkan saldo SOL terbaru

      // TODO: Gantilah dengan data dari smart contract Solana
      const data = {
        walletAddress: publicKey.toString(),
        solPaidAmount: 0.5, // ✅ Data contoh, ganti dengan data real dari on-chain
        bunnyPaidAmount: 100,
        solCanClaimAmount: 0.2,
        bunnyCanClaimAmount: 50,
        solClaimedState: false,
        bunnyClaimedState: false,
      };

      setUserData({
        walletAddr: data.walletAddress,
        solPaidAmount: data.solPaidAmount,
        bunnyPaidAmount: data.bunnyPaidAmount,
        solCanClaimAmount: data.solCanClaimAmount,
        bunnyCanClaimAmount: data.bunnyCanClaimAmount,
        solClaimedState: data.solClaimedState,
        bunnyClaimedState: data.bunnyClaimedState,
      });

      setIsClaimableForUser(data.solCanClaimAmount > 0 && !data.solClaimedState);
    } catch (error) {
      console.error("❌ Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (publicKey) {
      getInfo();
      const interval = setInterval(getInfo, 6000);
      return () => clearInterval(interval);
    } else {
      setIsClaimableForUser(false);
      setSolBalance(0);
    }
  }, [publicKey]);

  return (
    <GetTokenDataContext.Provider
      value={{
        isBuyState,
        solBalance,
        isClaimableForuser: isClaimableForUser,
        userData,
        getInfo,
      }}
    >
      {children}
    </GetTokenDataContext.Provider>
  );
};

export default GetTokenDataProvider;
