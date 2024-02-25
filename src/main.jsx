import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Admin from "./Admin.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#F62681",
        },
        info: {
            main: "#7a5cff",
        },
    },
});

const dev_mode = false;
const api_url = dev_mode
    ? "http://localhost:3000"
    : "https://tmcw-api.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<App api_url={api_url} />} />
                        <Route
                            path="admin"
                            element={<Admin api_url={api_url} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>
);
