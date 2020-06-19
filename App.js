import React from 'react';
import styled from 'styled-components';

import Routes from './src/shared/route';
import store from './src/shared/store';

const Root = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #36485f;
`;

const App = () => {
  return (
    <Root>
      <Routes />
    </Root>
  );
};

export default App;
