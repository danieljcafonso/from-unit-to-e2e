import { createContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/carsAPI";
import useLocalStorage from "../hooks/useLocalStorage";
import { enqueueSnackbar } from "notistack";

export const AuthContext = createContext();

export const AuthStore = () => {
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) setLoggedUser(data);
    },
    onError: () => {
      enqueueSnackbar("Something went wrong when trying to loggin", {
        variant: "error",
      });
    },
  });
  const { mutate: registerMutate } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data) setLoggedUser(data);
    },
    onError: () => {
      enqueueSnackbar("Something went wrong when trying to register", {
        variant: "error",
      });
    },
  });

  const [loggedUser, setLoggedUser] = useLocalStorage("loggedUser", null);

  const logout = () => {
    setLoggedUser(null);
  };

  return { login: mutate, register: registerMutate, logout, loggedUser };
};

const AuthProvider = (children) => {
  return <AuthContext.Provider value={AuthStore()} {...children} />;
};

export default AuthProvider;
