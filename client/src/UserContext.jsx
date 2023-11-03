import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(res => {
        console.log(res.data);
        setUser(res.data)
      })
    }
  },[])
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
