import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import LockIcon from "@mui/icons-material/Lock";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { useAuth } from "../authorization/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

function LoginForm() {
  let location = useLocation();

  const defaultValues = {
    username: "anonymous user",
    password: "user123",
  };

  const methods = useForm({ defaultValues });
  const { control } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const auth = useAuth();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    auth.login(defaultValues.username);
    console.log(from);
    navigate(from, { replace: true });
  };

  return (
    <>
      <CloseIcon
        sx={{ position: "absolute", right: "0", top: "0" }}
        fontSize="large"
        onClick={() => navigate("/")}
      />
      <LockIcon
        sx={{ bgcolor: "#1976d2", borderRadius: "50%" }}
        fontSize={"large"}
      />
      <Typography variant="h4" marginBottom={2}>
        Login
      </Typography>
      <form>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ bgcolor: "secondary.main" }}
              label="Username"
              variant="outlined"
              fullWidth
              {...field}
              inputProps={{ style: { color: "black" } }}
              InputLabelProps={{
                style: { color: "text.primary", fontWeight: "bold" },
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{
                marginTop: "15px",
                marginBottom: "15px",
                bgcolor: "secondary.main",
              }}
              label="Password"
              inputProps={{ style: { color: "black" } }}
              InputLabelProps={{
                style: { color: "text.primary", fontWeight: "bold" },
              }}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              {...field}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ color: "text1.primary" }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button
          fullWidth
          onClick={handleLogin}
          sx={{ bgcolor: "#1976d2", "&:hover": { backgroundColor: "#1976d2" } }}
        >
          SIGN IN
        </Button>
        <Box display={"flex"} justifyContent={"space-between"} marginTop={2}>
          <Link style={{ textDecoration: "none", color: "#1976d2" }}>
            Forgot password?
          </Link>
          <Link style={{ textDecoration: "none", color: "#1976d2" }}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </form>
    </>
  );
}

export default LoginForm;
