import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderTitle,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import {
  Container,
  Header,
  TextField,
  StyledButton,
} from '../shared/styles/styles';

const Routes = () => {
  const onRegister = (data) => {
    console.log('register', data);
  };
  const onLogin = (data) => {
    console.log('login', data);
  };

  const {register, handleSubmit, setValue} = useForm();

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const Stack = createStackNavigator();

  const Login = ({navigation}) => (
    <Container>
      <Header>Login</Header>
      <TextField
        placeholder="email"
        underlineColorAndroid={'transparent'}
        placeholderTextColor="#FFF"
        onChangeText={(text) => setValue('email', text)}
      />
      <TextField
        placeholder="password"
        underlineColorAndroid={'transparent'}
        placeholderTextColor="#FFF"
        secureTextEntry={true}
        onChangeText={(text) => setValue('password', text)}
      />
      <StyledButton title="login" onPress={handleSubmit(onLogin)}>
        Login
      </StyledButton>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{color: '#fff'}}>
          Dont have an account yet? Register Here!
        </Text>
      </TouchableOpacity>
    </Container>
  );
  const Register = ({navigation}) => (
    <Container>
      <Header>Register</Header>
      <TextField
        placeholder="email"
        underlineColorAndroid={'transparent'}
        placeholderTextColor="#FFF"
        onChangeText={(text) => setValue('email', text)}
      />
      <TextField
        placeholder="password"
        underlineColorAndroid={'transparent'}
        placeholderTextColor="#FFF"
        secureTextEntry={true}
        onChangeText={(text) => setValue('password', text)}
      />

      <StyledButton title="Register" onPress={handleSubmit(onRegister)}>
        Register
      </StyledButton>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{color: '#fff'}}>Already registered? Login Here!</Text>
      </TouchableOpacity>
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
        <Stack.Screen
          name="Login"
          options={{headerTitle: 'Sign In'}}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{headerTitle: 'Sign Up'}}
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
