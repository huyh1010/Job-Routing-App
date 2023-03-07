import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./authorization/auth";
import LoginModal from "./components/LoginModal";
import JobDetailModal from "./components/JobDetailModal";
import RequireAuth from "./authorization/RequireAuth";
import { createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

function App() {
  let location = useLocation();
  // const auth = useAuth();
  let state = location.state;
  const [isDark, setIsDark] = useState(false);
  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
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
        default: isDark ? "#121212" : "#ECF9FF",
      },
      modal: {
        default: isDark ? "#121212" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#FFFFFF" : "#000000",
      },
      text1: {
        primary: "#000000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes
          location={
            location.state?.backgroundLocation
              ? location.state.backgroundLocation
              : location
          }
        >
          <Route
            path="/"
            element={
              <HomePage setIsDark={setIsDark} isDark={isDark} theme={theme} />
            }
          >
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
        {state && (
          <Routes>
            <Route path="/job/:id" element={<JobDetailModal />} />
          </Routes>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
