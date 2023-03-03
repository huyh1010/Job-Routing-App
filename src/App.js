import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authorization/auth";
import LoginModal from "./components/LoginModal";
import JobDetailModal from "./components/JobDetailModal";
import RequireAuth from "./authorization/RequireAuth";
import { createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFBEB",
      },
      secondary: {
        main: "#FFE7CC",
      },
      button: {
        main: "#F8CBA6",
      },
      background: {
        default: "#ECF9FF",
      },
      text: {
        primary: "#000000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/login" element={<LoginModal />} />

            <Route
              path="/job/:id"
              element={
                <RequireAuth>
                  <JobDetailModal />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
