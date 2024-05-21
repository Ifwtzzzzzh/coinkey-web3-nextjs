"use client";

import { defineChain } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "./client";

export default function Home() {
  const wallets = [createWallet("com.coinbase.wallet")];
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <ConnectButton 
        client={client} 
        wallets={wallets} 
        chain={defineChain(baseSepolia)}
        connectButton={{ label: "Connect with Coinbase Smart Wallet" }}
        />
      </div>
    </main>
  );
}
