import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';

const outerTrpc = initTRPC.context().create();
const innerTrpc = initTRPC.context().create();

const outerRouter = outerTrpc.router({
  hello: outerTrpc.procedure.query(() => 'world'),
});

const innerRouter = innerTrpc.router({
  hello: innerTrpc.procedure.query(() => 'bug'),
});

export type OuterRouter = typeof outerRouter;
export type InnerRouter = typeof innerRouter;

const app = express();

app.use(cors());

app.use('/outer',  trpcExpress.createExpressMiddleware({ router: outerRouter }));
app.use('/inner',  trpcExpress.createExpressMiddleware({ router: innerRouter }));

app.listen(4000, () => console.log('Listening on port 4000'));