import React, {useEffect, useState, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useForm} from 'react-hook-form';
import LoginScreen from '../Screens/AuthScreens/LoginScreen';
import RegisterScreen from '../Screens/AuthScreens/RegisterScreen';
import {Container} from '../shared/styles/styles';
import {AuthContext} from '../shared/Providers/AuthProvider';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';

const Routes = () => {
  const {register, handleSubmit, setValue, errors} = useForm();
  const {loginUser, loading} = useContext(AuthContext);

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
      register={register}
      errors={errors}
    />
  );

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
  );
};

export default Routes;
