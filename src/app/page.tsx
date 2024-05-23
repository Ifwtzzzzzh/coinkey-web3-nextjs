"use client";

import { defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { balanceOf, claimTo, getNFT } from "thirdweb/extensions/erc1155";
import { ConnectButton, MediaRenderer, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "./client";

export default function Home() {
  const account = useActiveAccount()
  const wallets = [createWallet("com.coinbase.wallet")]
  const contract = getContract({
    client: client,
    chain: defineChain(baseSepolia),
    address: "0x264c5Fd8F488f3D6ed899C455a778ce8D46a9750"
  })

  const {data: nft, isLoading: nftIsLoading} = useReadContract(
    getNFT, {
      contract: contract,
      tokenId: 0n
    }
  )

  const {data: ownedNFTs} = useReadContract(
    balanceOf, {
      contract: contract,
      owner: account?.address || "",
      tokenId: 0n
    }
  )

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center py-20">
        <ConnectButton 
        client={client} 
        wallets={wallets} 
        chain={defineChain(baseSepolia)}
        connectButton={{ label: "Connect with Coinbase Smart Wallet" }}
        />
        <div className="flex flex-col my-8">
          {nftIsLoading ? (<p>Loading ...</p>) : (
            <>
              {nft && (
                <MediaRenderer 
                  client={client}
                  src={nft.metadata.image}
                />
              )}
              {account ? (
                <>
                  <p className="text-center mt-8">
                    You own {ownedNFTs?.toString()} NFTs
                  </p>
                  <TransactionButton
                  transaction={() =>
                    claimTo({
                      contract: contract,
                      to: account.address,
                      tokenId: 0n,
                      quantity: 1n
                    })
                  }
                  onTransactionConfirmed={async () => {
                    alert("NFT Claimed!")
                  }}
                  >Claim</TransactionButton>
                </>
              ) : (
                <p className="text-center mt-8">
                  Connect a wallet to claim your NFT
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
