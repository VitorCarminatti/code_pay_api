import AsyncStorage from '@react-native-community/async-storage';

export const currentUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export const isLoggedIn = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue != null ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('@user');
  } catch (error) {
    console.log(error);
  }
};

export const login = async (token, firstName, role) => {
  try {
    const jsonValue = JSON.stringify({token, firstName, role});
    await AsyncStorage.setItem('@user', jsonValue);
  } catch (error) {
    return console.log(error);
  }
};
