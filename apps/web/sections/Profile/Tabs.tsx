'use client';

import { cn } from '@zknoid/sdk/lib/helpers';
import { Tab } from './lib';

type TabConfig = {
  id: Tab;
  label: string;
  disabled?: boolean;
};

const tabs: TabConfig[] = [
  { id: Tab.Stats, label: 'Account Stats & NFT' },
  { id: Tab.Lottery, label: 'Lottery L1 Tickets', disabled: true },
  { id: Tab.Transactions, label: 'Transactions', disabled: true },
];

export function Tabs({ activeTab }: { activeTab: Tab }) {
  return (
    <nav className={'mt-[2.604vw] grid grid-cols-4'}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          disabled={tab.disabled}
          className={cn(
            'pb-[0.26vw] border-b-[0.156vw] border-[#212121] hover:border-foreground text-left',
            tab.disabled &&
              'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:border-[#212121]',
            activeTab === tab.id && 'border-foreground',
            '[&:not(:first-child)]:pl-[0.781vw]'
          )}
        >
          {tab.label}
        </button>
      ))}
      <div className={'pb-[0.26vw] border-b-[0.156vw] border-[#212121]'} />
    </nav>
  );
}
