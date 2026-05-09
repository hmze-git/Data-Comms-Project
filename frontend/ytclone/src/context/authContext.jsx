import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
});
export default AuthContext;
