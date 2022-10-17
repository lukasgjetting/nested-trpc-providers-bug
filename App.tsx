import React from 'react';
import { innerTrpc, outerTrpc } from '.';

const App: React.FC = () => {
  const outerQuery = outerTrpc.hello.useQuery();
  const innerQuery = innerTrpc.hello.useQuery();

  return (
    <div>
      Outer: {outerQuery.data}
      <br />
      Inner: {innerQuery.data}
    </div>
  );
};

export default App;
