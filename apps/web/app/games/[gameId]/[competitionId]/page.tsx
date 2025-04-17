'use client';
import 'reflect-metadata';

import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';

// import "@zknoid/games/styles.css";

const GamePageWrapper = dynamic(
  () => import('@zknoid/sdk/components/framework/dynamic/GamePageWrapper'),
  {
    ssr: false,
  }
);

export default async function Home({
  params,
}: {
  params: Promise<{ competitionId: string; gameId: string }>;
}) {
  const { competitionId, gameId } = await params;
  return (
    <GamePageWrapper
      gameId={gameId}
      competitionId={competitionId}
      zkNoidConfig={zkNoidConfig}
    />
  );
}
