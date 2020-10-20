import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Input} from './styles';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CASH_IN = gql`
  mutation($valor: String!, $token: String!) {
    cashIn(input: {valor: $valor, token: $token}) {
      success
      errors
    }
  }
`;

const Caixa = () => {
  const [valor, setValor] = useState('');
  const [scan, setScan] = useState(false);

  const [cashIn] = useMutation(CASH_IN);

  const onSuccess = (e) => {
    cashIn({variables: {valor, token: e.data}});
    setScan(false);
  };

  return (
    <View>
      <Text>Informe o valor do crédito e escaneie o código do cliente</Text>
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

export default Caixa;
