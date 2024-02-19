import { useState } from "react";
import technomathsLogo from "./assets/technomaths-logo.png";
import "./App.css";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import SubmissionForm from "./SubmissionForm";
import SubmissionsInfo from "./SubmissionsInfo";

import Divider from "@mui/material/Divider";

import TilingBackground from "./assets/tiling-background.png";

function App() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                background: `url(${TilingBackground})`,
                backgroundSize: "contain",
            }}
        >
            <Box sx={{ maxWidth: "400px", flexGrow: "1" }}>
                <List>
                    <ListItem sx={{ justifyContent: "center", width: "100%" }}>
                        <Paper elevation={3} sx={{ width: "100%" }}>
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
                            </List>
                        </Paper>
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}></ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <SubmissionForm />
                    </ListItem>

                    <ListItem>
                        <Paper elevation={3}>
                            <ListItem
                                sx={{
                                    justifyContent: "center",
                                    marginTop: "1rem",
                                }}
                            >
                                {" "}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "text.secondary",
                                        opacity: "100%",
                                    }}
                                >
                                    Submitted Codes & Winners! 🏆
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "center" }}>
                                <SubmissionsInfo />
                            </ListItem>
                        </Paper>
                    </ListItem>
                    <ListItem
                        sx={{ justifyContent: "center", marginTop: "2rem" }}
                    >
                        <List>
                            <ListItem>
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
                            <ListItem>
                                <Chip
                                    variant="outlined"
                                    label={
                                        <p>
                                            Background image from{" "}
                                            <a
                                                href="https://pngtree.com/freepng/memphis-technology-gradient-line_3779028.html"
                                                style={{ color: "black" }}
                                            >
                                                pngtree.com
                                            </a>
                                        </p>
                                    }
                                />
                            </ListItem>
                        </List>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

export default App;
