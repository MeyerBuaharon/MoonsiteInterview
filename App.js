import React, {useContext} from 'react';
import styled from 'styled-components';

import AuthProvider from './src/shared/Providers/AuthProvider';
import AppTabs from './src/Tabs/AppTabs';

const Root = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #36485f;
`;

const App = () => {
  return (
    <AuthProvider>
      <Root>
        <AppTabs />
      </Root>
    </AuthProvider>
  );
};

export default App;
