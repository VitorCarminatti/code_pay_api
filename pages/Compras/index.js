import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Compras = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          {key: 'Budweiser', preco: '9,50'},
          {key: 'Água', preco: '7,00'},
          {key: 'Rajska', preco: '55,00'},
          {key: 'Energético 2L', preco: '20,00'},
          {key: 'Total', preco: '93,50'},
        ]}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}>
            <Text>{item.key}</Text>
            <Text>{item.preco}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Compras;
