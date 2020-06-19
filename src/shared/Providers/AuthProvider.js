import React, {Children, useState} from 'react';

export const AuthContext = React.createContext({});

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          setUser({username: 'bob'});
        },
        logout: () => {},
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
