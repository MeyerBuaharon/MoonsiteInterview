import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  Header,
  TextField,
  StyledButton,
  CenteredStyledText,
} from '../../shared/styles/styles';

const RegisterScreen = ({navigation, setValue, handleSubmit}) => {
  const onRegister = (data) => console.log('registered', data);
  return (
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
        <CenteredStyledText>Already registered? Login Here!</CenteredStyledText>
      </TouchableOpacity>
    </Container>
  );
};

export default RegisterScreen;
