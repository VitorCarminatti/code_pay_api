import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
  StyleSheet,
} from 'react-native';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    title: 'Cerveja',
    data: [
      {nome: 'Skol', preco: '10,00'},
      {nome: 'Brahma', preco: '8,00'},
      {nome: 'Budweiser', preco: '12,00'},
    ],
  },
  {
    title: 'Vodka',
    data: [
      {nome: 'Rajska', preco: '50,00'},
      {nome: 'Absolut', preco: '110,00'},
      {nome: 'Smirnoff', preco: '70,00'},
    ],
  },
  {
    title: 'Refrigerante',
    data: [
      {nome: 'Coca Cola', preco: '10,00'},
      {nome: 'Pepsi Twsit', preco: '10,00'},
      {nome: 'Guarana', preco: '10,00'},
      {nome: 'Água', preco: '10,00'},
    ],
  },
];

const FETCH_CATEGORIAS = gql`
  query {
    fetchCategorias {
      descricao
      produtos {
        nome
        preco
      }
    }
  }
`;

const Item = ({title}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Bar', {preco: title.preco})}
      style={styles.item}>
      <Text style={styles.title}>{title.nome}</Text>
      <Text style={styles.title}>{title.preco}</Text>
    </TouchableOpacity>
  );
};

const Produtos = () => {
  const {data} = useQuery(FETCH_CATEGORIAS);
  const result = _.get(data, 'fetchCategorias', false);

  return (
    result && (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    )
  );
};

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
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
export default Produtos;
