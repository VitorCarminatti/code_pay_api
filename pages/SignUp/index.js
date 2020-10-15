import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {login} from '../../services/auth';
import {Alert} from 'react-native';
import _ from 'lodash';

import {Container, Input, Button, ButtonText} from './styles';

export const SIGN_UP = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      success
      errors
      user {
        id
        firstName
      }
    }
  }
`;

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUp] = useMutation(SIGN_UP);

  const handleSubmit = () => {
    signUp({variables: {firstName, lastName, email, password}});
    navigation.navigate('SignIn');
  };

  return (
    <Container>
      <Input
        placeholder="Nome"
        value={firstName}
        onChangeText={setFirstName}
        autoCorrect={false}
      />
      <Input
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={setLastName}
        autoCorrect={false}
      />
      <Input
        placeholder="Email"
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
        <ButtonText>Criar usuário</ButtonText>
      </Button>
    </Container>
  );
};

export default SignUp;
