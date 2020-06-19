import React from 'react';
import styled from 'styled-components';

import Routes from './src/shared/route';
import AuthProvider from './src/shared/Providers/AuthProvider';

const Root = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #36485f;
`;

const App = () => {
  return (
    <AuthProvider>
      <Root>
        <Routes />
      </Root>
    </AuthProvider>
  );
};

export default App;
