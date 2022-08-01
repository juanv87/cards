import { useContext } from "react";
import { authContext } from "../../context/authContext";

export const useAuth = () => {
  const { user, logOut, loadingUser, logIn, signUp } = useContext(authContext);
  return {
    user,
    logOut,
    loadingUser,
    logIn,
    signUp,
  };
};
