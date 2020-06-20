import React, {useCallback, useContext} from 'react';
import {AsyncStorage} from 'react-native';
import {Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  Header,
  TextField,
  StyledButton,
  CenteredStyledText,
} from '../../shared/styles/styles';
import {getLoginUser} from '../../shared/api/index';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../../shared/Providers/AuthProvider';

const LoginScreen = ({navigation}) => {
  const {
    handleSubmit,
    formState: {isValid},
    control,
  } = useForm({
    mode: 'onChange',
  });
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
      <Controller
        placeholder="email"
        placeholderTextColor="#FFF"
        underlineColorAndroid={'transparent'}
        as={TextField}
        rules={{required: true}}
        control={control}
        name="email"
        onChangeName="onChangeText"
      />

      <Controller
        placeholder="password"
        placeholderTextColor="#FFF"
        underlineColorAndroid={'transparent'}
        as={TextField}
        rules={{required: true}}
        control={control}
        secureTextEntry={true}
        name="password"
        onChangeName="onChangeText"
      />

      <StyledButton
        disabled={!isValid}
        title="login"
        onPress={handleSubmit(onLogin)}>
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
