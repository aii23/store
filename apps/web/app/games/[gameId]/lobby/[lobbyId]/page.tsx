'use client';
import 'reflect-metadata';

import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';
// import "@zknoid/games/styles.css";

const Lobby = dynamic(
  () => import('@zknoid/sdk/components/framework/dynamic/Lobby'),
  {
    ssr: false,
  }
);

export default async function Home({
  params,
}: {
  params: Promise<{ gameId: string; lobbyId: string }>;
}) {
  const { gameId, lobbyId } = await params;
  return (
    <Lobby
      gameId={gameId}
      lobbyId={lobbyId}
      zkNoidConfig={zkNoidConfig}
    />
  );
}
