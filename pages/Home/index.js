import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {logout, currentUser} from '../../services/auth';

const Home = ({navigation}) => {
  const [nome, setNome] = useState('');
  currentUser().then((value) => setNome(value.firstName));

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{`Bem-vindo ${nome}`}</Text>
      <Button
        title="Sair"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};

export default Home;
