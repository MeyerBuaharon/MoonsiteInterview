import React, {useContext} from 'react';
import {Container} from '../../shared/styles/styles';
import {Button} from 'react-native';
import {AuthContext} from '../../shared/Providers/AuthProvider';
import styled from 'styled-components';

const WelcomeMessage = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

const HomeScreen = () => {
  const {logout, loginUser} = useContext(AuthContext);

  return (
    <Container>
      {loginUser && (
        <WelcomeMessage>
          Welcome to the application{'\n'}
          {'\n'} {loginUser.email} {'\n'}
        </WelcomeMessage>
      )}
      <Button title="LOGOUT" onPress={logout}>
        Log Out
      </Button>
    </Container>
  );
};

export default HomeScreen;
