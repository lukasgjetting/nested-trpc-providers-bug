import React from 'react';
import { innerTrpc, outerTrpc } from '.';

const App: React.FC = () => {
  const outerQuery = outerTrpc.helloOuter.useQuery();
  const innerQuery = innerTrpc.helloInner.useQuery();

  return (
    <div>
      Outer: {outerQuery.isError ? `ERROR: ${outerQuery.error.message}` : outerQuery.data}
      <br />
      Inner: {innerQuery.isError ? `ERROR: ${innerQuery.error.message}` : innerQuery.data}
    </div>
  );
};

export default App;
