import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ThemeProvider>
);
