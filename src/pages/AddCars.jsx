import {
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import useAddCarByUser from "../hooks/useAddCarByUser";
import { useNavigate } from "react-router";

export const AddCars = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [segment, setSegment] = useState("");
  const [fuel, setFuel] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const { mutate } = useAddCarByUser({
    onSuccess: () => {
      setModel("");
      setBrand("");
      setSegment("");
      setFuel("");
      setPhoto("");
      setPrice(0);
      enqueueSnackbar("Car was created!", { variant: "success" });
      navigate("/cars");
    },
    onError: () =>
      enqueueSnackbar("Something went wrong when creating a car", {
        variant: "error",
      }),
  });

  const submit = (e) => {
    e.preventDefault();
    if ([model, brand, segment, fuel, photo].includes(""))
      return enqueueSnackbar("Please fill in all data", { variant: "error" });
    if (price <= 0)
      return enqueueSnackbar("The price needs to be greater than 0", {
        variant: "error",
      });
    mutate({ model, brand, segment, fuel, photo, price });
  };

  return (
    <Box
      onSubmit={submit}
      component="form"
      sx={{
        height: "70%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <FormControl
        sx={{ marginTop: "0.75rem", width: "30%" }}
        variant="standard"
      >
        <InputLabel id="segment">Segment</InputLabel>
        <Select
          labelId="segment"
          id="segment"
          value={segment}
          data-testid="segment"
          onChange={(e) => setSegment(e.target.value)}
        >
          <MenuItem value="Van">Van</MenuItem>
          <MenuItem value="Coupe">Coupe</MenuItem>
          <MenuItem value="Sedan">Sedan</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ marginTop: "0.75rem", width: "30%" }}
        variant="standard"
      >
        <InputLabel htmlFor="model">Model</InputLabel>
        <Input
          id="model"
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "0.75rem", width: "30%" }}
        variant="standard"
      >
        <InputLabel htmlFor="brand">Brand</InputLabel>
        <Input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "0.75rem", width: "30%" }}
        variant="standard"
      >
        <InputLabel htmlFor="fuel">Fuel</InputLabel>
        <Input
          id="fuel"
          type="text"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "0.75rem", width: "30%" }}
        variant="standard"
      >
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "0.75rem", width: "30%" }}
        variant="standard"
      >
        <InputLabel htmlFor="photo">Photo URL</InputLabel>
        <Input
          id="photo"
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
      </FormControl>
      <CustomButton sx={{ marginTop: "1rem", width: "10%" }} type="submit">
        Add Car
      </CustomButton>
    </Box>
  );
};

export default AddCars;
