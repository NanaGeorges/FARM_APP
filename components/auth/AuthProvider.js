// AuthProvider.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (id !== null) {
          const parsedId = JSON.parse(id);
          const userId = `user${parsedId._id}`;
          const currentUser = await AsyncStorage.getItem(userId);
          if (currentUser !== null) {
            setUserData(JSON.parse(currentUser));
            setUserLogin(true);
          }
        }
      } catch (error) {
        console.log("Error retrieving the data", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userLogin, userData, setUserData, setUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
