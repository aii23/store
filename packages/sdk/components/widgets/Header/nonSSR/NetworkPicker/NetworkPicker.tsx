import { useEffect } from "react";
import { ALL_NETWORKS, Network } from "../../../../../constants/networks";
import { requestAccounts, walletInstalled } from "../../../../../lib/helpers";
import { useNetworkStore } from "../../../../../lib/stores/network";
import { AnimatePresence, motion } from "framer-motion";
import NetworkPickerCard from "./ui/NetworkPickerCard";
import zekoLogo from "../../../../../public/image/cards/zekoLogo.svg";
import berkleyLogo from "../../../../../public/image/cards/berkleyLogo.svg";
import minaLogo from "../../../../../public/image/cards/minaLogo.svg";
import Image from "next/image";

export default function NetworkPicker({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}) {
  const networkStore = useNetworkStore();

  const switchNetwork = async (network: Network) => {
    console.log("Switching to", network);
    if ((window as any).mina.isPallad) {
      await (window as any)!.mina!.request({
        method: "mina_switchChain",
        params: {
          chainId: network.palladNetworkID,
        },
      });
    } else {
      try {
        await (window as any).mina.switchChain({
          networkID: network.networkID,
        });
        networkStore.setNetwork(network);
        setExpanded(false);
      } catch (e: any) {
        if (e?.code == 1001) {
          await requestAccounts();
          await switchNetwork(network);
        } else {
          throw e;
        }
      }
    }
  };

  useEffect(() => {
    if (!walletInstalled()) return;

    (async () => {
      const listener = ({
        networkID,
        name,
      }: {
        networkID: string;
        name: string;
      }) => {
        const minaNetwork = ALL_NETWORKS.find((x) =>
          networkID != "unknown" ? x!.networkID == networkID : x!.name == name,
        );
        networkStore.setNetwork(minaNetwork);
      };

      ((window as any).mina as any).on("chainChanged", listener);

      return () => {
        ((window as any).mina as any).removeListener(listener);
      };
    })();
  }, [networkStore.walletConnected]);

  useEffect(() => {
    if (!walletInstalled()) return;

    (async () => {
      const listener = (accounts: string[]) => {
        console.log("Accounts changed", accounts);
        const [account] = accounts;
        if (networkStore.minaNetwork?.networkID)
          networkStore.setNetwork(networkStore.minaNetwork);
        networkStore.onWalletConnected(account);
      };

      ((window as any).mina as any).on("accountsChanged", listener);

      return () => {
        ((window as any).mina as any).removeListener(listener);
      };
    })();
  }, []);

  return (
    <div className="relative">
      <NetworkPickerCard
        text={networkStore.minaNetwork?.name || "Unsupported network"}
        image={
          networkStore.minaNetwork?.networkID === "zeko:testnet"
            ? zekoLogo
            : networkStore.minaNetwork?.networkID === "mina:berkeley"
              ? berkleyLogo
              : minaLogo
        }
        onClick={() => setExpanded(!expanded)}
        toggle={true}
        expanded={expanded}
      />
      <AnimatePresence initial={false} mode={"wait"}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="absolute top-[90%] flex w-full flex-col items-center overflow-hidden rounded-b border border-left-accent bg-bg-dark"
          >
            {ALL_NETWORKS.map((network) => (
              <div
                key={(window as any).networkID}
                className="group flex h-full w-full cursor-pointer flex-row items-center gap-[1.882vw] lg:!gap-[0.417vw] py-[2.824vw] lg:!py-[0.625vw] pl-[1.882vw] lg:!pl-[0.417vw] last:rounded-b"
                onClick={() => switchNetwork(network!)}
              >
                <Image
                  src={
                    network!.networkID === "zeko:testnet"
                      ? zekoLogo
                      : network!.networkID === "mina:berkeley"
                        ? berkleyLogo
                        : minaLogo
                  }
                  className={
                    "h-[5.647vw] lg:!h-[1.25vw] w-[5.647vw] lg:!w-[1.25vw] rounded-[1.176vw] lg:!rounded-[0.26vw] border border-foreground group-hover:border-left-accent"
                  }
                  alt={""}
                />
                <span
                  className={
                    "font-museo text-[3.765vw] lg:!text-[0.833vw] font-medium text-foreground group-hover:text-left-accent"
                  }
                >
                  {network!.name}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
