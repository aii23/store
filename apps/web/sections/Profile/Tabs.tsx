'use client';

import { cn } from '@zknoid/sdk/lib/helpers';
import { Tab } from './lib';

export function Tabs({ activeTab }: { activeTab: Tab }) {
  return (
    <nav className={'mt-[2.604vw] grid grid-cols-4'}>
      <button
        className={cn(
          'pb-[0.26vw] border-b-[0.156vw] border-[#212121] hover:border-foreground text-left',
          activeTab === Tab.Stats && 'border-foreground'
        )}
      >
        Account Stats & NFT
      </button>
      <button
        disabled={true}
        className={cn(
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:border-[#212121] pb-[0.26vw] border-b-[0.156vw] border-[#212121] hover:border-foreground text-left',
          activeTab === Tab.Lottery && 'border-foreground'
        )}
      >
        Lottery L1 Tickets
      </button>
      <button
        disabled={true}
        className={cn(
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:border-[#212121] pb-[0.26vw] border-b-[0.156vw] border-[#212121] hover:border-foreground text-left',
          activeTab === Tab.Transactions && 'border-foreground'
        )}
      >
        Transactions
      </button>
      <div className={'pb-[0.26vw] border-b-[0.156vw] border-[#212121]'} />
    </nav>
  );
}

export function StatsItem({
  title,
  value,
  label,
  emoji,
}: {
  title: string;
  value: number;
  label: string;
  emoji: string;
}) {
  return (
    <div
      className={
        'flex flex-row items-center rounded-[0.521vw] bg-[#252525] p-[0.781vw] gap-[0.781vw]'
      }
    >
      <div className="flex flex-col items-center justify-center rounded-[0.26vw] p-[0.938vw] bg-[#353535]">
        <span className="text-[2.083vw] leading-[90%] mt-[0.26vw]">{emoji}</span>
      </div>
      <div className="flex flex-col gap-[0.26vw]">
        <span className="text-[1.042vw] text-foreground font-plexsans leading-[110%] font-medium">
          {title}
        </span>
        <div className="flex flex-row gap-[0.26vw]">
          <span className="text-[2.604vw] font-plexsans font-semibold leading-[110%] text-foreground">
            {value}
          </span>
          <span className="mt-auto mb-[0.26vw] text-[0.833vw] font-plexsans leading-[110%] text-foreground">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
