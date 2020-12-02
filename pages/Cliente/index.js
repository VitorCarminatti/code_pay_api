/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
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
      <View>
        <Button
          title="Histórico de compras"
          onPress={() => navigation.navigate('Compras')}
        />
      </View>
    </View>
  );
};

export default Cliente;
