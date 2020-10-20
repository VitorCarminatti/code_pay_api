import React from 'react';
import {Text, View, Button} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import _ from 'lodash';

const GET_SALDO = gql`
  query getUser($token: String!) {
    fetchUser(token: $token) {
      saldo
    }
  }
`;

const Cliente = ({token}) => {
  const {data, refetch} = useQuery(GET_SALDO, {variables: {token}});
  const saldo = _.get(data, 'fetchUser.saldo', '0,0');

  return (
    <View>
      <QRCode value={[{data: token}]} size={200} />
      <Text style={{marginTop: 30, alignSelf: 'center'}}>Seu saldo é:</Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 30,
        }}>{`R$: ${saldo}`}</Text>
      <Button title="Atualizar saldo" onPress={() => refetch()} />
    </View>
  );
};

export default Cliente;
