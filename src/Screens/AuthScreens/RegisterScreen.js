import React, {useCallback, useContext} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useForm, Controller} from 'react-hook-form';
import {
  Container,
  Header,
  TextField,
  StyledButton,
  CenteredStyledText,
} from '../../shared/styles/styles';
import {register} from '../../shared/api/index';
import {AsyncStorage} from 'react-native';
import {AuthContext} from '../../shared/Providers/AuthProvider';

const RegisterScreen = ({navigation}) => {
  const {
    handleSubmit,
    formState: {isValid},
    control,
  } = useForm({
    mode: 'onChange',
  });
  const {login, setLoading} = useContext(AuthContext);

  const onRegister = useCallback(
    async (data) => {
      setLoading(true);
      const result = await register(data);

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
      <Header>Register</Header>
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
        title="Register"
        disabled={!isValid}
        onPress={handleSubmit(onRegister)}>
        Register
      </StyledButton>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <CenteredStyledText>Already registered? Login Here!</CenteredStyledText>
      </TouchableOpacity>
    </Container>
  );
};

export default RegisterScreen;
