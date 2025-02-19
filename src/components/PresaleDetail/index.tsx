"use client";
import { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import { PulseSpinner } from "react-spinners-kit";
import { successAlert, errorAlert, warningAlert } from "../ToastGroup";

// ✅ Load environment variables only on the client
const OWNER_PRIVATE_KEY =
  typeof window !== "undefined" ? process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY : "";

const OWNER_KEYPAIR = OWNER_PRIVATE_KEY
  ? Keypair.fromSecretKey(new Uint8Array(JSON.parse(OWNER_PRIVATE_KEY)))
  : null;

const OWNER_WALLET_ADDRESS = new PublicKey(
  "DwgU3uetesJ7s5GWBkmSMgufGkb9WQLMMSU4yoV83HSR"
);

const SOLANA_RPC_URL = "https://api.devnet.solana.com";
const connection = new Connection(SOLANA_RPC_URL, "confirmed");

// ✅ Token mint address
const BUNNY_TOKEN_MINT = new PublicKey(
  "DMhw85VKQemd5qUoZv3VG1aS5esBGBMZnhFZMZMpsaZj"
);

// ✅ Conversion rate & minimum purchase
const SOL_TO_BINKY_RATE = 2.5;
const MINIMUM_SOL_PURCHASE = 0.1;

export const PresaleDetail = () => {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="text-center">Loading...</div>;

  const handleBuyWithSol = async () => {
    if (!connected) return warningAlert("Please connect your wallet");
    if (!payAmount || Number(payAmount) < MINIMUM_SOL_PURCHASE)
      return warningAlert(`Minimum purchase is ${MINIMUM_SOL_PURCHASE} SOL`);
    if (Number(payAmount) <= 0) return warningAlert("Please input a valid amount");

    try {
      setLoading(true);

      if (!publicKey) {
        errorAlert("Wallet not connected!");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: OWNER_WALLET_ADDRESS,
          lamports: Math.floor(Number(payAmount) * 1e9),
        })
      );

      await sendTransaction(transaction, connection);
      successAlert("Paid successfully!");

      await distributeTokens(Number(payAmount), publicKey);
    } catch (error) {
      console.error("❌ Failed to send SOL!", error);
      errorAlert("Transaction failed!");
    } finally {
      setLoading(false);
    }
  };

  const distributeTokens = async (solReceived: number, recipientPublicKey: PublicKey) => {
    if (!connected) return errorAlert("Please connect your wallet");

    try {
      const tokenAmount = solReceived * SOL_TO_BINKY_RATE;
      if (tokenAmount < 0.01) return errorAlert("Minimum purchase is 0.01 token");

      console.log(`🔹 Sending ${tokenAmount} xHamster Tokens to ${recipientPublicKey.toBase58()}`);

      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        OWNER_KEYPAIR!,
        BUNNY_TOKEN_MINT,
        recipientPublicKey
      );

      const ownerTokenAccount = await getAssociatedTokenAddress(
        BUNNY_TOKEN_MINT,
        OWNER_KEYPAIR!.publicKey
      );

      const transferInstruction = createTransferInstruction(
        ownerTokenAccount,
        recipientTokenAccount.address,
        OWNER_KEYPAIR!.publicKey,
        Math.floor(tokenAmount * 1e9)
      );

      const transaction = new Transaction().add(transferInstruction);
      transaction.feePayer = OWNER_KEYPAIR!.publicKey;

      const signature = await sendAndConfirmTransaction(connection, transaction, [OWNER_KEYPAIR!]);

      console.log("✅ Token transfer successful! Transaction Signature:", signature);
      successAlert(`Sent ${tokenAmount.toFixed(6)} xHamster Tokens!`);
    } catch (error) {
      console.error("❌ Failed to send tokens!", error);
      errorAlert("Failed to send xHamster Tokens! Check console for details.");
    }
  };

  return (
    <div className="flex items-start justify-center border-2 border-black bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl flex-col p-3 md:w-[600px] w-full shadow-md shadow-black relative overflow-hidden">
      <div className="text-[15px] mt-6 text-gray-300 font-bold flex items-start">
        Amount (Min: <span className="text-[#033FD5]">{MINIMUM_SOL_PURCHASE} SOL</span>)
      </div>

      <input
        className="w-full outline-none text-[16px] bg-transparent h-full text-white p-2 border-2 border-gray-500"
        placeholder="0"
        type="text"
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*\.?\d*$/.test(value)) {
            setPayAmount(value);
          }
        }}
        value={payAmount}
      />

      <p className="text-[16px] text-[#033FD5]">
        You will receive {(Number(payAmount) * SOL_TO_BINKY_RATE).toLocaleString()} xHamster
      </p>

      <button
        className="bg-[#033FD5] text-white px-3 py-2 rounded-full shadow-black shadow-sm hover:shadow-md uppercase"
        onClick={handleBuyWithSol}
      >
        Buy with SOL
      </button>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
          <PulseSpinner color="#033FD5" size={50} />
        </div>
      )}
    </div>
  );
};
