import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { contents } from "~/server/db/schema"

import { eq } from "drizzle-orm"

export const contentRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(contents).values({
        text: input.text,
        boardId: 0,
      })
    }),

  getAll: publicProcedure
    .input(z.object({ boardId: z.number().min(0) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.contents.findMany({
        where: eq(contents.boardId, input.boardId),
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
      return await ctx.db.delete(contents).where(eq(contents.id, input.id))
    }),

  deleteAll: publicProcedure
    .input(z.object({ boardId: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(contents)
        .where(eq(contents.boardId, input.boardId))
    }),
})
