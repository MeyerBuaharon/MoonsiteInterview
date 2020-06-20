import React, {useCallback, useContext} from 'react';
import {AsyncStorage} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  Header,
  TextField,
  StyledButton,
  CenteredStyledText,
} from '../../shared/styles/styles';
import {getLoginUser} from '../../shared/api/index';
import {AuthContext} from '../../shared/Providers/AuthProvider';

const LoginScreen = ({navigation, setValue, handleSubmit}) => {
  const {login, setLoading} = useContext(AuthContext);

  const onLogin = useCallback(
    async (data) => {
      setLoading(true);
      const result = await getLoginUser(data);

      if (result !== undefined) {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(result.data));
        } catch (error) {
          console.log('error', error);
        } finally {
          setLoading(false);
          login();
        }
      } else {
        setLoading(false);
      }
    },
    [setLoading, login],
  );
  return (
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
        <CenteredStyledText>
          Dont have an account yet? Register Here!
        </CenteredStyledText>
      </TouchableOpacity>
    </Container>
  );
};

export default LoginScreen;
