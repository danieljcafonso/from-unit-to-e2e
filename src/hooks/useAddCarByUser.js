import { useMutation } from "@tanstack/react-query";
import { addCarByUsername } from "../api/carsAPI";
import useLocalStorage from "./useLocalStorage";

const addData = async (username, car) => {
  return await addCarByUsername(username, car);
};

export const useAddCarByUser = ({ onSuccess, onError }) => {
  const [loggedUser] = useLocalStorage("loggedUser");
  return useMutation({
    mutationFn: (car) => addData(loggedUser.username, car),
    onError,
    onSuccess,
  });
};

export default useAddCarByUser;
