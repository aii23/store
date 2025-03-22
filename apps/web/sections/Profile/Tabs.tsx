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
