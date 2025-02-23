/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v11/router
 * @see https://trpc.io/docs/v11/procedures
 */
import { initTRPC } from "@trpc/server";
import { transformer } from "../utils/transformer";
import {
  CreateNextContextOptions,
  NextApiRequest,
} from "@trpc/server/adapters/next";

export const createInnerTRPCContext = ({ req }: { req?: NextApiRequest }) => {
  return {
    req,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({
    req: opts.req,
  });
};

const t = initTRPC.create({
  transformer,
});

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

export const router = t.router;
