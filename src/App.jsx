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

const dev_mode = true;
const api_url = dev_mode
    ? "http://localhost:3000"
    : "https://tmcw-api.onrender.com";

function App() {
    const [submissionsCount, setSubmissionCount] = useState(0);

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
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: "2rem",
                                            fontFamily:
                                                "Kaushan Script, cursive",
                                        }}
                                    >
                                        TMCW Submission Page
                                    </Typography>
                                </ListItem>
                            </List>
                        </Paper>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <SubmissionForm
                            api_url={api_url}
                            submissionsCount={submissionsCount}
                            setSubmissionCount={setSubmissionCount}
                        />
                    </ListItem>

                    <ListItem
                        sx={{ justifyContent: "center", marginTop: "1rem" }}
                    >
                        {" "}
                        <Typography
                            variant="h6"
                            sx={{ color: "text.secondary" }}
                        >
                            Submitted Challenges & Winners! 🏆
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <SubmissionsInfo
                            api_url={api_url}
                            submissionsCount={submissionsCount}
                        />
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
