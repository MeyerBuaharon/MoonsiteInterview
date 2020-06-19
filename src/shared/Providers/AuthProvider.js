import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';

export const AuthContext = React.createContext({});

const AuthProvider = ({children}) => {
  const [loginUser, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        login: () => {
          AsyncStorage.getItem('user').then(
            (isLogin) => isLogin && setUser(isLogin),
          );
        },
        logout: () => {
          AsyncStorage.removeItem('user');
          setUser(null);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
