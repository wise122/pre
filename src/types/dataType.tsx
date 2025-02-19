export type UserDatas = {
  walletAddr: string;
  solPaidAmount: number; // ✅ Ubah dari ethPaidAmount ke solPaidAmount
  bunnyPaidAmount: number;
  solCanClaimAmount: number; // ✅ Ubah dari ethCanClaimAmount ke solCanClaimAmount
  bunnyCanClaimAmount: number;
  solClaimedState: boolean; // ✅ Ubah dari ethClaimedState ke solClaimedState
  bunnyClaimedState: boolean;
};

export type GetTokenDataContextValue = {
  isBuyState: boolean;
  solBalance: number; // ✅ Gunakan solBalance untuk Solana
  isClaimableForuser: boolean;
  userData: UserDatas | undefined;
  getInfo: () => void;
};
