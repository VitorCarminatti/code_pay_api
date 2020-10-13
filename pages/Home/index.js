import React from "react";
import { View, Button } from "react-native";
import { logout } from "../../services/auth";

const Home = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Button
      title="Sair"
      onPress={() => {
        logout();
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn" }],
        });
      }}
    />
  </View>
);

export default Home;
