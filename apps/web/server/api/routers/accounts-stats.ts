import clientPromise from '../../../app/lib/mongodb';

import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../../server/api/trpc';

const client = await clientPromise;
const db = client?.db(process.env.MONGODB_DB);
const oneDayLotteryDB = client?.db(process.env.BACKEND_MONGODB_DB_ONE_DAY);
const oneWeekLotteryDB = client?.db(process.env.BACKEND_MONGODB_DB);

const getLotteryStat = async (userAddress: string) => {
  // Get all users tickets
  const oneDayTickets =
    (await oneDayLotteryDB
      ?.collection('rounds')
      .aggregate([
        { $unwind: '$tickets' },
        { $match: { 'tickets.owner': userAddress } },
        {
          $project: {
            _id: 0,
            owner: '$tickets.owner',
            funds: '$tickets.funds',
            roundId: 1,
          },
        },
      ])
      .toArray()) || [];

  const oneWeekTickets =
    (await oneWeekLotteryDB
      ?.collection('rounds')
      .aggregate([
        { $unwind: '$tickets' },
        { $match: { 'tickets.owner': userAddress } },
        {
          $project: {
            _id: 0,
            owner: '$tickets.owner',
            funds: '$tickets.funds',
            roundId: { $add: ['$roundId', 75] }, // Add 75 to the roundId to get the one week roundId
          },
        },
      ])
      .toArray()) || [];

  const allTickets = [...oneDayTickets, ...oneWeekTickets];

  // Count total rewards
  const totalRewards = allTickets.reduce((acc, ticket) => acc + ticket.funds, 0);

  // Count total tickets
  const totalTickets = allTickets.length; // Update to count multiple tickets within one

  // Count total wins
  const totalWins = allTickets.filter((ticket) => ticket.funds > 0).length;

  // Count total rounds
  const roundsSet = new Set(allTickets.map((ticket) => ticket.roundId));
  const totalRounds = roundsSet.size;

  // Count best reward
  const bestReward = allTickets.reduce((max, ticket) => Math.max(max, ticket.funds), 0);

  // Count win rate
  const winRate = totalWins / totalTickets;

  return {
    totalRewards,
    totalWins,
    totalRounds,
    totalTickets,
    bestReward,
    winRate,
  };
};

export const accountStatsRouter = createTRPCRouter({
  getStats: publicProcedure
    .input(z.object({ userAddress: z.string() }))
    .query(async ({ input }) => {
      return await getLotteryStat(input.userAddress);
      // if (!db) return;
      // return await db.collection('accounts-stats').findOne({ userAddress: input.userAddress });
    }),
  setStat: publicProcedure
    .input(z.object({ userAddress: z.string(), key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      if (!db) return;
      const value = JSON.parse(input.value);
      await db
        .collection('accounts-stats')
        .updateOne(
          { userAddress: input.userAddress },
          { $set: { [input.key]: value } },
          { upsert: true }
        );
    }),
});
