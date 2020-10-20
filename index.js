import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ApolloClient from 'apollo-boost';

import {ApolloProvider} from 'react-apollo';

const Client = () => {
  const client = new ApolloClient({uri: 'http://192.168.1.101:3000/graphql'});

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => Client);
