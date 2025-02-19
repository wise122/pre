import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletConnectBtn = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure it only runs on the client
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="flex items-center justify-center flex-col gap-[32px]">
      <WalletMultiButton />
    </div>
  );
};

export default WalletConnectBtn;
