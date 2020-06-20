import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';

export const AuthContext = React.createContext({});

const AuthProvider = ({children}) => {
  const [loginUser, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('user').then(
      (isLogin) => isLogin && setUser(JSON.parse(isLogin)),
    );
  }, []);
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        loading,
        setLoading,
        login: () => {
          AsyncStorage.getItem('user').then(
            (isLogin) => isLogin && setUser(JSON.parse(isLogin)),
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
