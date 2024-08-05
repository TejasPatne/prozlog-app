import { createContext, useContext, useState } from "react";

// create context
export const AuthContext = createContext();

// create context provider
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("dp-user")) || null);
  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
  )
};

// create hook to access context
export const useAuthContext = () => {
    return useContext(AuthContext);
}
