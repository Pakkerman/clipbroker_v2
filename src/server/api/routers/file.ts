import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { files } from "~/server/db/schema"

import { eq } from "drizzle-orm"

export const fileRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        key: z.string(),
        name: z.string(),
        url: z.string(),
        size: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(files).values({
        key: input.key,
        name: input.name,
        url: input.url,
        size: input.size,
        boardId: 0,
      })
    }),

  getAll: publicProcedure
    .input(z.object({ boardId: z.number().min(0) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.files.findMany({
        where: eq(files.boardId, input.boardId),
        orderBy: (contents, { desc }) => [desc(contents.createdAt)],
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.contents.findFirst({
      orderBy: (contents, { desc }) => [desc(contents.createdAt)],
    })
  }),

  deleteById: publicProcedure
    .input(z.object({ id: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(files).where(eq(files.id, input.id))
    }),

  deleteAll: publicProcedure
    .input(z.object({ boardId: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(files).where(eq(files.boardId, input.boardId))
    }),
})
