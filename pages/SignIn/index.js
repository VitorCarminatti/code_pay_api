import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";
import { login } from "../../services/auth";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = ({ email, password }) => {
    login(email, password);
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={() => signIn({ email, password })} />
      <Button
        title="Criar Conta"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
};

export default SignIn;
