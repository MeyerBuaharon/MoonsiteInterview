import React, {useEffect, useState, useContext} from 'react';
import {Text, AsyncStorage, ActivityIndicator, Button} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import LoginScreen from '../Screens/AuthScreens/LoginScreen';
import RegisterScreen from '../Screens/AuthScreens/RegisterScreen';
import {Container} from './styles/styles';
import {AuthContext} from './Providers/AuthProvider';

const Routes = () => {
  const [loading, setLoading] = useState(false);
  const {register, handleSubmit, setValue} = useForm();
  const {loginUser, logout} = useContext(AuthContext);

  useEffect(() => {
    register('email');
    register('password');
  }, [register, loginUser]);

  const Stack = createStackNavigator();
  const RegisterComponent = (props) => (
    <RegisterScreen
      {...props}
      setValue={setValue}
      handleSubmit={handleSubmit}
    />
  );

  const LoginComponent = (props) => (
    <LoginScreen
      {...props}
      setValue={setValue}
      handleSubmit={handleSubmit}
      setLoading={setLoading}
    />
  );
  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }
  const LoggedIn = () => (
    <Container>
      <Text>Logged IN</Text>
      <Button title="logout" onPress={logout}>
        LOGOUT
      </Button>
    </Container>
  );
  return (
    <NavigationContainer>
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
              component={LoginComponent}
            />
            <Stack.Screen
              name="Register"
              options={{headerTitle: 'Sign Up'}}
              component={RegisterComponent}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
