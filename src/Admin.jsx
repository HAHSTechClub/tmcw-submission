import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TilingBackground from "./assets/tiling-background.png";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

import Done from "@mui/icons-material/Done";
import Close from "@mui/icons-material/Close";

import ImageSubmission from "./ImageSubmission";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import QuizIcon from "@mui/icons-material/Quiz";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Admin({ api_url }) {
    const [actionsCount, setActionsCount] = useState(0);
    const [data, setData] = useState(null);

    const search = useLocation().search;
    const adminCode = new URLSearchParams(search).get("adminCode");

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const endpoint =
                api_url + `/get-image-submissions?adminCode=${adminCode}`;

            const response = await fetch(endpoint);
            const json = await response.json();

            setData(json);
        }

        fetchData();
        console.log(actionsCount);
    }, [actionsCount]);

    const [imageChallengeNames, setImageChallengeNames] = useState(null);

    useEffect(() => {
        async function fetchImageSubmissionNames() {
            const response = await fetch(
                api_url + "/get-image-submissions-names"
            );

            const json = await response.json();
            setImageChallengeNames(json);
        }

        fetchImageSubmissionNames();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                background: `url(${TilingBackground})`,
                backgroundSize: "contain",
                minHeight: "100vh",
            }}
        >
            <Backdrop
                open={data == null || imageChallengeNames == null}
                sx={{ zIndex: "1" }}
            >
                <CircularProgress></CircularProgress>
            </Backdrop>
            <Backdrop open={backdrop} sx={{ zIndex: "1" }}>
                <CircularProgress></CircularProgress>
            </Backdrop>
            <Box elevation={4}>
                <List>
                    <ListItem
                        sx={{
                            justifyContent: "center",
                        }}
                    >
                        <Paper sx={{ minWidth: "300px" }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "2rem",
                                    fontFamily: "Kaushan Script, cursive",
                                    textAlign: "center",
                                }}
                            >
                                Admin Page
                            </Typography>
                        </Paper>
                    </ListItem>
                    <ListItem>
                        <List sx={{ width: "100%" }}>
                            {data && imageChallengeNames ? (
                                <>
                                    {imageChallengeNames.map((name) => {
                                        return (
                                            <>
                                                <ListItem>
                                                    <Paper
                                                        sx={{ width: "100%" }}
                                                    >
                                                        <List
                                                            sx={{
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <ListItem>
                                                                <Typography
                                                                    variant="h4"
                                                                    sx={{
                                                                        fontSize:
                                                                            "20px",
                                                                    }}
                                                                >
                                                                    {name}
                                                                </Typography>
                                                            </ListItem>
                                                            <Divider></Divider>
                                                            <ListItem>
                                                                <EmojiEventsIcon
                                                                    sx={{
                                                                        marginRight:
                                                                            "1rem",
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="h5"
                                                                    sx={{
                                                                        fontSize:
                                                                            "16px",
                                                                    }}
                                                                >
                                                                    Winning
                                                                    Solution:
                                                                </Typography>
                                                            </ListItem>
                                                            <ListItem
                                                                sx={{
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                {data.filter(
                                                                    (a) =>
                                                                        a.challengeName ==
                                                                            name &&
                                                                        a.isAccepted ==
                                                                            "VERIFIED"
                                                                ).length >=
                                                                1 ? (
                                                                    data
                                                                        .filter(
                                                                            (
                                                                                a
                                                                            ) =>
                                                                                a.challengeName ==
                                                                                    name &&
                                                                                a.isAccepted ==
                                                                                    "VERIFIED"
                                                                        )
                                                                        .map(
                                                                            (
                                                                                submissionData
                                                                            ) => {
                                                                                return (
                                                                                    <ImageSubmission
                                                                                        setBackdrop={
                                                                                            setBackdrop
                                                                                        }
                                                                                        api_url={
                                                                                            api_url
                                                                                        }
                                                                                        actionsCount={
                                                                                            actionsCount
                                                                                        }
                                                                                        setActionsCount={
                                                                                            setActionsCount
                                                                                        }
                                                                                        submissionData={
                                                                                            submissionData
                                                                                        }
                                                                                        adminCode={
                                                                                            adminCode
                                                                                        }
                                                                                    />
                                                                                );
                                                                            }
                                                                        )
                                                                ) : (
                                                                    <MoreHorizIcon />
                                                                )}
                                                            </ListItem>
                                                            <ListItem>
                                                                <QuizIcon
                                                                    sx={{
                                                                        marginRight:
                                                                            "1rem",
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="h5"
                                                                    sx={{
                                                                        fontSize:
                                                                            "16px",
                                                                    }}
                                                                >
                                                                    Unverified
                                                                    Solutions:
                                                                </Typography>
                                                            </ListItem>
                                                            <ListItem
                                                                sx={{
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                <List>
                                                                    {data.filter(
                                                                        (a) =>
                                                                            a.challengeName ==
                                                                                name &&
                                                                            a.isAccepted ==
                                                                                "UNVERIFIED"
                                                                    ).length >=
                                                                    1 ? (
                                                                        data
                                                                            .filter(
                                                                                (
                                                                                    a
                                                                                ) =>
                                                                                    a.challengeName ==
                                                                                        name &&
                                                                                    a.isAccepted ==
                                                                                        "UNVERIFIED"
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    submissionData
                                                                                ) => {
                                                                                    return (
                                                                                        <ImageSubmission
                                                                                            setBackdrop={
                                                                                                setBackdrop
                                                                                            }
                                                                                            api_url={
                                                                                                api_url
                                                                                            }
                                                                                            actionsCount={
                                                                                                actionsCount
                                                                                            }
                                                                                            setActionsCount={
                                                                                                setActionsCount
                                                                                            }
                                                                                            submissionData={
                                                                                                submissionData
                                                                                            }
                                                                                            adminCode={
                                                                                                adminCode
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                }
                                                                            )
                                                                    ) : (
                                                                        <MoreHorizIcon />
                                                                    )}
                                                                </List>
                                                            </ListItem>
                                                        </List>
                                                    </Paper>
                                                </ListItem>
                                                <Divider></Divider>
                                            </>
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}
                        </List>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

export default Admin;
