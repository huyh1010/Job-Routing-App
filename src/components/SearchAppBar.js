import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authorization/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Size switch demo" } };

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,

  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  searchParams,
  setSearchParams,
  setIsDark,
  isDark,
}) {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleClickLogin = () => {
    navigate("/login");
  };
  const handleClickLogout = () => {
    auth.logout(() => {
      navigate("/");
    });
  };

  const handleMode = () => {
    setIsDark(!isDark);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                mr: 2,
                mt: 0.3,
                color: "text.primary",
              }}
            >
              Job Routing
            </Typography>
            <Search
              sx={{
                display: "flex",
                bgcolor: "secondary.main",
                color: "text1.primary",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchParams.get("filter") || ""}
                onChange={(e) => {
                  let filter = e.target.value;
                  if (filter) {
                    setSearchParams({ filter });
                  } else {
                    setSearchParams({});
                  }
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ width: 250 }}
              />
            </Search>
            <Switch {...label} defaultChecked onChange={handleMode} />
          </Box>

          {!auth.user ? (
            <Button
              variant="outlined"
              sx={{
                color: "white",
                border: "none",
                display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                marginLeft: "250px",
                bgcolor: "#1976d2",
                "&:hover": { backgroundColor: "#1976d2" },
              }}
              startIcon={<LoginIcon />}
              onClick={handleClickLogin}
            >
              Sign in
            </Button>
          ) : (
            <Box display={"flex"} alignItems="center">
              <AccountCircleIcon
                sx={{
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                }}
              />
              <Typography
                sx={{
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                }}
              >
                {auth.user}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  border: "none",
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                  bgcolor: "#1976d2",
                  "&:hover": { backgroundColor: "#1976d2" },
                  marginLeft: "10px",
                }}
                startIcon={<LogoutIcon />}
                onClick={handleClickLogout}
              >
                Sign out
              </Button>
            </Box>
          )}
          <Box>
            <MoreVertIcon
              sx={{
                display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
                color: "text.primary",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
