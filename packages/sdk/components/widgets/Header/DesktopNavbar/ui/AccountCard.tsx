import { cn } from "../../../../../lib/helpers";
import { useContext } from "react";
import SetupStoreContext from "../../../../../lib/contexts/SetupStoreContext";
import Image from "next/image";

export default function AccountCard({
  text,
  expanded,
  onClick,
  className,
}: {
  text: string;
  expanded?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const { account } = useContext(SetupStoreContext);

  return (
    <div className={"flex flex-row gap-[0.521vw] items-center"}>
      <div
        className={
          "w-[2.24vw] h-[2.24vw] rounded-full border border-right-accent bg-[#141414] overflow-hidden"
        }
      >
        <Image
          src={`/image/avatars/avatar-${account.avatarId || "unset"}.svg`}
          alt={"Profile Image"}
          width={43}
          height={43}
          className={"object-center object-cover w-full h-full"}
        />
      </div>
      <div
        className={cn(
          "group flex cursor-pointer items-center justify-center gap-[0.521vw] rounded border",
          "border-right-accent py-[0.208vw] px-[1.042vw] font-museo text-[0.833vw] font-medium text-bg-dark transition duration-75 ease-in",
          "hover:bg-bg-dark hover:text-right-accent lg:justify-normal",
          expanded
            ? "rounded-b-none border-right-accent bg-bg-dark text-right-accent hover:bg-right-accent/20"
            : "bg-right-accent",
          className,
        )}
        onClick={() => onClick?.()}
      >
        {text}
      </div>
    </div>
  );
}
