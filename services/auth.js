import AsyncStorage from "@react-native-community/async-storage";

const key = "@user";

export const isLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem("key");
    if (value !== null) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password) => {
  try {
    const value = await AsyncStorage.setItem(
      key,
      JSON.stringify(email, password)
    );
    if (value !== null) {
      console.log("logado com sucesso");
    }
  } catch (error) {
    return console.log(error);
  }
};
