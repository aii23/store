'use client';
import 'reflect-metadata';
import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';
import "@zknoid/games/styles.css";

const NewCompetitionPage = dynamic(
  () =>
    import(
      '@zknoid/sdk/components/framework/dynamic/NewCompetitionPageWrapper'
    ),
  {
    ssr: false,
  }
);

export default async function Home({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  return (
    <NewCompetitionPage gameId={gameId} zkNoidConfig={zkNoidConfig} />
  );
}
