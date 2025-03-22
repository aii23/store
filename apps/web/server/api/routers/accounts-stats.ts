import clientPromise from '../../../app/lib/mongodb';

import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../../server/api/trpc';

const client = await clientPromise;
const db = client?.db(process.env.MONGODB_DB);

export const accountStatsRouter = createTRPCRouter({
  getStats: publicProcedure
    .input(z.object({ userAddress: z.string() }))
    .query(async ({ input }) => {
      if (!db) return;
      return await db.collection('accounts-stats').findOne({ userAddress: input.userAddress });
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
