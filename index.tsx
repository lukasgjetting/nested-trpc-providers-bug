import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTRPCReact, httpBatchLink, httpLink } from '@trpc/react';

import App from './App';
import type { InnerRouter, OuterRouter } from './server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

export const outerTrpc = createTRPCReact<OuterRouter>();
export const innerTrpc = createTRPCReact<InnerRouter>();

const outerTrpcClient = outerTrpc.createClient({ links: [httpLink({ url: 'http://localhost:4000/outer' })] });
const innerTrpcClient = innerTrpc.createClient({ links: [httpLink({ url: 'http://localhost:4000/inner' })] });

const outerQueryClient = new QueryClient();
const innerQueryClient = new QueryClient();

root.render(
  <StrictMode>
    <outerTrpc.Provider client={outerTrpcClient} queryClient={outerQueryClient}>
      <QueryClientProvider client={outerQueryClient}>
        <innerTrpc.Provider client={innerTrpcClient} queryClient={innerQueryClient}>
          <QueryClientProvider client={innerQueryClient}>
            <App />
          </QueryClientProvider>
        </innerTrpc.Provider>
      </QueryClientProvider>
    </outerTrpc.Provider>
  </StrictMode>
);
