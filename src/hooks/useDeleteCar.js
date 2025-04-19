import { useMutation } from "@tanstack/react-query";
import { deleteCarById } from "../api/carsAPI";

const deleteCar = async (carId) => {
  return await deleteCarById(carId);
};

export const useDeleteCar = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: deleteCar,
    onError,
    onSuccess,
  });
};

export default useDeleteCar;
