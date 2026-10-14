import { JsonRpcProvider } from "ethers";
import { useMemo } from "react";
import { ContractCard } from "./components/ContractCard";
import { EventsCard } from "./components/EventsCard";
import { NetworkCard } from "./components/NetworkCard";
import { ReadCard } from "./components/ReadCard";
import { WalletCard } from "./components/WalletCard";
import { WriteCard } from "./components/WriteCard";
import { explorerUrl, selectNetwork } from "./config/networks";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useSimpleStorage } from "./hooks/useSimpleStorage";
import { useWallet } from "./hooks/useWallet";

export default function App() {
  const network = useMemo(() => selectNetwork(window.location.search), []);
  // Read-only provider: talks to the public RPC directly, so reads work without a wallet
  const readProvider = useMemo(
    () => new JsonRpcProvider(network.rpcUrls[0], network.chainId, { staticNetwork: true }),
    [network]
  );
  const explorer = explorerUrl(network);

  const networkStatus = useNetworkStatus(network, readProvider);
  const wallet = useWallet(network, readProvider);
  const storage = useSimpleStorage(network, readProvider);

  const canWrite = !!wallet.account && wallet.onRightNetwork;

  return (
    <main>
      <section className="card">
        <h1>Simple Storage DApp</h1>
        <p>
          React + Ethers.js + MetaMask + a SimpleStorage smart contract on <strong>{network.chainName}</strong>.
        </p>
      </section>

      {window.location.protocol === "file:" && (
        <div className="banner err">
          MetaMask does not work on pages opened as <span className="mono">file://</span>. Run <span className="mono">npm run dev</span> and open the
          localhost URL instead.
        </div>
      )}

      <NetworkCard network={network} status={networkStatus} />

      <WalletCard network={network} wallet={wallet} explorer={explorer} />

      <ContractCard
        address={storage.address}
        status={storage.contractStatus}
        explorer={explorer}
        canDeploy={canWrite}
        onLoad={storage.load}
        onDeploy={async () => {
          await storage.deploy(await wallet.getSigner());
          wallet.refreshBalance();
        }}
      />

      <ReadCard
        enabled={!!storage.address}
        value={storage.value}
        lastUpdatedBy={storage.lastUpdatedBy}
        onRefresh={() => storage.refresh().catch(() => {})}
      />

      <WriteCard
        enabled={!!storage.address}
        canWrite={canWrite}
        status={storage.writeStatus}
        explorer={explorer}
        onStore={async (value) => {
          const ok = await storage.store(await wallet.getSigner(), value);
          if (ok) wallet.refreshBalance();
          return ok;
        }}
      />

      <EventsCard enabled={!!storage.address} events={storage.events} explorer={explorer} />
    </main>
  );
}
