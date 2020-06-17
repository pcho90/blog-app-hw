import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  currentUser: null,
  toggleSignIn: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{ toggleSignIn: setCurrentUser, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
