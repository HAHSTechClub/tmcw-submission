import { useState } from "react";
import technomathsLogo from "./assets/technomaths-logo.png";
import "./App.css";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import SubmissionForm from "./SubmissionForm";

function App() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ maxWidth: "400px", flexGrow: "1" }}>
                <List>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <img
                            src={technomathsLogo}
                            alt="technomaths combinded logo"
                            width="200px"
                        />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        {" "}
                        <Typography variant="h5">
                            TMCW Submission Page
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <SubmissionForm />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

export default App;
