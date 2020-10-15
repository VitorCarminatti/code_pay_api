import React, {useState} from 'react';
import {Alert} from 'react-native';
import {login} from '../../services/auth';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import _ from 'lodash';

import {
  Container,
  Logo,
  Input,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
  Title,
} from './styles';

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(input: {email: $email, password: $password}) {
      success
      errors
      user {
        id
        firstName
      }
    }
  }
`;

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, {data}] = useMutation(SIGN_IN);

  const result = _.get(data, 'signIn', null);

  const handleSubmit = () => {
    signIn({variables: {email, password}});
    if (result) {
      login(result.user.id, result.user.firstName);
    } else {
      Alert.alert(
        'Falha no login',
        'Email ou senha inválidos',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  return (
    <Container>
      <Logo
        source={require('../../images/code-pay-mobile-logo.png')}
        resizeMode="contain"
      />
      <Title>Code Pay</Title>
      <Input
        placeholder="Endereço de e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Button onPress={handleSubmit}>
        <ButtonText>Entrar</ButtonText>
      </Button>
      <SignUpLink onPress={() => navigation.navigate('SignUp')}>
        <SignUpLinkText>Cadastre-se</SignUpLinkText>
      </SignUpLink>
    </Container>
  );
};

export default SignIn;
