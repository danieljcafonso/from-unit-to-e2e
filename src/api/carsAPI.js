import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://danieljcafonso.builtwithdark.com",
});

export const register = async (user) => {
  const { data } = await axiosInstance.post(`/carsuser`, user);
  return data;
};

export const login = async (user) => {
  const { data } = await axiosInstance.post(`/carslogin`, user);
  return data;
};

export const getCarsByUsername = async (username) => {
  const { data } = await axiosInstance.get(`/cars/${username}`);
  return data;
};

export const addCarByUsername = async (username, car) => {
  const { data } = await axiosInstance.post(`/cars/${username}`, car);
  return data;
};

export const deleteCarById = async (carId) => {
  const { data } = await axiosInstance.delete(`/cars/${carId}`);
  return data;
};
