import { httpBatchLink, httpLink, splitLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "../backend/routers/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""; // browser should use relative url
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  }

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      // queryClientConfig: {.
      // defaultOptions: {},
      // },
      transformer: superjson,
      links: [
        splitLink({
          condition(op) {
            // check for context property `skipBatch`
            return op.context.skipBatch === true;
          },
          // when condition is true, use normal request
          true: httpLink({
            // The server needs to know your app's full url
            url: `${getBaseUrl()}/api/trpc`,
            /**
             * Set custom request headers on every request from tRPC
             * @link https://trpc.io/docs/v10/header
             */
            headers() {
              if (ctx?.req) {
                // To use SSR properly, you need to forward the client's headers to the server
                // This is so you can pass through things like cookies when we're server-side rendering
                // If you're using Node 18, omit the "connection" header
                const {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  connection: _connection,
                  ...headers
                } = ctx.req.headers;
                return {
                  ...headers,
                  // Optional: inform server that it's an SSR request
                  "x-ssr": "1",
                };
              }
              return {};
            },
          }),
          // when condition is false, use batching
          false: httpBatchLink({
            // The server needs to know your app's full url
            url: `${getBaseUrl()}/api/trpc`,
            /**
             * Set custom request headers on every request from tRPC
             * @link https://trpc.io/docs/v10/header
             */
            headers() {
              if (ctx?.req) {
                // To use SSR properly, you need to forward the client's headers to the server
                // This is so you can pass through things like cookies when we're server-side rendering
                // If you're using Node 18, omit the "connection" header
                const {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  connection: _connection,
                  ...headers
                } = ctx.req.headers;
                return {
                  ...headers,
                  // Optional: inform server that it's an SSR request
                  "x-ssr": "1",
                };
              }
              return {};
            },
          }),
        }),
      ],

      // links: [
      //   loggerLink({
      //     enabled: (opts) =>
      //       process.env.NODE_ENV === "development" ||
      //       (opts.direction === "down" && opts.result instanceof Error),
      //   }),
      //   httpBatchLink({
      //     url: `${getBaseUrl()}/api/trpc`,
      //   }),
      // ],
    };
  },
  ssr: false, // TODO: this causes props to be undefined on the client sometimes.
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
