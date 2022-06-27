import { useContext } from "react";
import { authContext } from "../../context/authContext";

export const useAuth = () => {
  const user = useContext(authContext);
  return user;
};
