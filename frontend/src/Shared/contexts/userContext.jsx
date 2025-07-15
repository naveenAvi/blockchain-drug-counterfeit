import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    console.log(user?.token, "User token in UserProvider");
    axios.interceptors.request.use(
      (config) => {
        if (user?.token) {
    console.log(user?.token, "bearer token setted");

          config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          //setUser(null);
        }
        return Promise.reject(error);
      }
    );

    // return () => {
    //   axios.interceptors.request.eject(requestInterceptor);
    //   axios.interceptors.response.eject(responseInterceptor);
    // };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
