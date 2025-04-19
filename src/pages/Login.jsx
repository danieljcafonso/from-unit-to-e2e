import { Box, FormControl, Input, InputLabel, Link } from "@mui/material";
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { login, loggedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) navigate("/");
  }, [loggedUser, navigate]);

  const auth = (event) => {
    event.preventDefault();
    login({ username, email });
  };

  return (
    <Box
      onSubmit={auth}
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
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "0.75rem", width: "30%" }}
        variant="standard"
      >
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <CustomButton sx={{ marginTop: "1rem", width: "10%" }} type="submit">
        Login
      </CustomButton>
      <Link sx={{ marginTop: "0.5rem" }} href="/register">
        Create an account
      </Link>
    </Box>
  );
};

export default Login;
