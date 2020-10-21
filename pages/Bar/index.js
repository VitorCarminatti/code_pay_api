import React, {useState} from 'react';
import {Text, View, Button, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Input} from './styles';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import _ from 'lodash';

const CASH_OUT = gql`
  mutation($valor: String!, $token: String!) {
    cashOut(input: {valor: $valor, token: $token}) {
      success
      errors
    }
  }
`;

const Bar = ({route}) => {
  const {preco} = route.params;

  const [valor, setValor] = useState(preco);
  const [scan, setScan] = useState(false);

  const [cashIn, {data}] = useMutation(CASH_OUT);
  const errors = _.get(data, 'cashOut.errors', null);

  const onSuccess = (e) => {
    cashIn({variables: {valor: valor.replace(/,/g, '.'), token: e.data}});
    setScan(false);
    if (errors) {
      Alert.alert('Falha no pagamento', 'Saldo insuficiente', [{text: 'OK'}], {
        cancelable: false,
      });
    }
  };

  return (
    <View>
      <Text>Informe o valor do débito e escaneie o código do cliente</Text>
      <Input
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {scan && (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          cameraStyle={{
            height: 300,
            width: 300,
            alignSelf: 'center',
            marginTop: 50,
          }}
        />
      )}

      <Button title="Scanear" onPress={() => setScan(!scan)} />
    </View>
  );
};

export default Bar;
