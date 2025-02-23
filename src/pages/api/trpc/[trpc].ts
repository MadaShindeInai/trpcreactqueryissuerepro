/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { createInnerTRPCContext, publicProcedure, router } from "~/server/trpc";
import { z } from "zod";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

async function getRandomBooleanAsync(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() < 0.5);
    }, 500);
  });
}

const appRouter = router({
  greeting: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? "world"}`,
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
  test1: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // This is what you're returning to your client
      const res = await getRandomBooleanAsync();
      return { data: res, id: input.id, desc: "test1" };
    }),
  test2: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // This is what you're returning to your client
      const res = await getRandomBooleanAsync();
      return { data: res, id: input.id, desc: "test2" };
    }),

  // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
  // getUser: publicProcedure.query(() => {
  //   return { id: "1", name: "bob" };
  // }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

export const prefetchHelper = createServerSideHelpers({
  router: appRouter,
  ctx: createInnerTRPCContext({}),
  transformer: superjson, // optional - adds superjson serialization
});

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
