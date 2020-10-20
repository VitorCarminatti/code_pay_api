import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {logout, currentUser} from '../../services/auth';
import Cliente from '../Cliente';
import Caixa from '../Caixa';
import Bar from '../Bar';

const Home = () => {
  const [nome, setNome] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');

  currentUser().then((value) => {
    setRole(value.role);
    setNome(value.firstName);
    setToken(value.token);
  });

  const renderScreen = () => {
    switch (role) {
      case 'CLIENTE':
        return <Cliente token={token} />;
      case 'CAIXA':
        return <Caixa />;
      case 'BAR':
        return <Bar />;
      default:
        break;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
      }}>
      <Text style={{marginTop: 40}}>{`Bem-vindo ${nome}`}</Text>
      {renderScreen()}
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
