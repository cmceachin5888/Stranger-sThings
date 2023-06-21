import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import CommonButtons from "./Common/CommonButtons";

const LoginForm = ({ setToken, setLoading }) => {
  const navigate = useNavigate();
  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const loginData = async () => {
      setLoading(true);

      try {
        const result = await loginUser(username, password);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        setUsername("");
        setPassword("");
        navigate("/Profile");
      } catch (error) {
        setErrorMessage(error?.message || "An error occurred");
        setUsername("");
        setPassword("");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loginData();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            back: "black",
          }}
        >
          <Typography component="h1" variant="h5" color="white">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userman"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              color="black"
            />
            <CommonButtons
              size="medium"
              variant="contained"
              sx={buttonStyles}
              type="submit"
            >
              Log In
            </CommonButtons>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("/Register");
                  }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>{" "}
    </ThemeProvider>
  );
};

export default LoginForm;