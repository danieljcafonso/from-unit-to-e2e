import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  100: "#eaeef2",
  300: "#afb8c1",
  900: "#24292f",
};

export const CustomButton = styled(Button)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${theme.palette.mode === "dark" ? grey[900] : blue[500]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[100]
  };
  `
);

export default CustomButton;
