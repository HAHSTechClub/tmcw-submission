import { useState } from "react";
import technomathsLogo from "./assets/technomaths-logo.png";
import "./App.css";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import SubmissionForm from "./SubmissionForm";
import SubmissionsInfo from "./SubmissionsInfo";

import Divider from "@mui/material/Divider";

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
                        <Typography variant="h5">
                            TMCW Submission Page
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <SubmissionForm />
                    </ListItem>

                    <ListItem
                        sx={{ justifyContent: "center", marginTop: "1rem" }}
                    >
                        {" "}
                        <Typography
                            variant="h6"
                            sx={{ color: "text.secondary" }}
                        >
                            Submitted Codes & Winners! 🏆
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <SubmissionsInfo />
                    </ListItem>
                    <ListItem
                        sx={{ justifyContent: "center", marginTop: "2rem" }}
                    >
                        <Chip
                            variant="outlined"
                            label={
                                <p>
                                    Made with 💜 by{" "}
                                    <a
                                        href="https://github.com/UtsavK-0112"
                                        style={{ color: "black" }}
                                    >
                                        Utsav Kashichhwa
                                    </a>
                                </p>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

export default App;
