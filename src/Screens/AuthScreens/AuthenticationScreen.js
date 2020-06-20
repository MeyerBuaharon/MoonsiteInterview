import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {LoginScreen, RegisterScreen, HomeScreen} from '../';
import {Container} from '../../shared/styles/styles';
import {AuthContext} from '../../shared/Providers/AuthProvider';

const AuthenticationScreen = () => {
  const {loginUser, loading} = useContext(AuthContext);

  const Stack = createStackNavigator();

  const LoggedIn = () => <HomeScreen />;
  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
      }}>
      {loginUser ? (
        <Stack.Screen name="LoggedIn" component={LoggedIn} />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            options={{headerTitle: 'Sign In'}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{headerTitle: 'Sign Up'}}
            component={RegisterScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthenticationScreen;
