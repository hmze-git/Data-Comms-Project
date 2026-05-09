import React, { Children, useEffect } from "react";
import { useState, useContext } from "react";
import AuthContext from "./authContext";
import axios from "axios";
import api from "../services/api";


const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const userInfo = JSON.parse(sessionStorage.getItem("User"))

        if(userInfo){
            setUser(userInfo)
            setIsLoggedIn(true)
        }
        setIsLoading(false)
    },[])


    const login = async (email,pass)=>{

        try {
            const userDetails = {
                email:email,
                password:pass
            }

            const resp = await api.post("/users/login",userDetails)
            const data=resp.data

            if(data.success){
                sessionStorage.setItem("User",JSON.stringify(data.userDetails))
                setUser(resp.data.userDetails)
                setIsLoggedIn(true)
            }
            return data

        } catch (error) {
            throw error
        }
    }
    const logout=()=>{
    sessionStorage.removeItem("User");
    setUser(null);
    setIsLoggedIn(false);
    }
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;