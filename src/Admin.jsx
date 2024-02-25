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

import Done from "@mui/icons-material/Done";
import Close from "@mui/icons-material/Close";

function Admin({ api_url }) {
    const [actionsCount, setActionsCount] = useState(0);
    const [data, setData] = useState(null);

    const search = useLocation().search;
    const adminCode = new URLSearchParams(search).get("adminCode");

    useEffect(() => {
        async function fetchData() {
            const endpoint =
                api_url + `/get-pending-submissions?adminCode=${adminCode}`;

            const response = await fetch(endpoint);
            const json = await response.json();

            setData(json);
        }

        fetchData();
    }, [actionsCount]);

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
                        <List>
                            {data ? (
                                <>
                                    {data.map((item) => {
                                        return (
                                            <ListItem
                                                key={item.id}
                                                id={item.id}
                                            >
                                                <Card
                                                    sx={{ minWidth: "300px" }}
                                                >
                                                    <Box
                                                        sx={{ padding: "8px" }}
                                                    >
                                                        <Typography variant="body1">
                                                            Submitted:{" "}
                                                            {item.timestamp}
                                                        </Typography>
                                                    </Box>
                                                    <Divider></Divider>
                                                    <List>
                                                        <ListItem>
                                                            <List>
                                                                <ListItem>
                                                                    <Typography variant="body2">
                                                                        Challenge:{" "}
                                                                        {item.goldenTicketId ==
                                                                        "9"
                                                                            ? "Chessboard Paradox"
                                                                            : "The Missing Puzzle"}
                                                                    </Typography>
                                                                </ListItem>
                                                                <ListItem>
                                                                    {" "}
                                                                    <Typography variant="body2">
                                                                        Submitter:{" "}
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Typography>
                                                                </ListItem>
                                                                <ListItem>
                                                                    <Typography variant="body2">
                                                                        Class:{" "}
                                                                        {
                                                                            item.rollClass
                                                                        }
                                                                    </Typography>
                                                                </ListItem>
                                                            </List>
                                                        </ListItem>
                                                        <ListItem
                                                            sx={{
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            <img
                                                                src={item.image}
                                                            />
                                                        </ListItem>
                                                    </List>

                                                    <Divider></Divider>
                                                    <Box
                                                        sx={{
                                                            padding: "8px",
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Button
                                                            startIcon={<Done />}
                                                            onClick={async (
                                                                event
                                                            ) => {
                                                                const id =
                                                                    event.target
                                                                        .parentElement
                                                                        .parentElement
                                                                        .parentElement
                                                                        .id;

                                                                const api_endpoint =
                                                                    api_url +
                                                                    `/verify-submission?adminCode=${adminCode}&id=${id}`;

                                                                await fetch(
                                                                    api_endpoint
                                                                );

                                                                setActionsCount(
                                                                    actionsCount +
                                                                        1
                                                                );
                                                            }}
                                                        >
                                                            Verify
                                                        </Button>
                                                        <Button
                                                            startIcon={
                                                                <Close />
                                                            }
                                                            onClick={async (
                                                                event
                                                            ) => {
                                                                const id =
                                                                    event.target
                                                                        .parentElement
                                                                        .parentElement
                                                                        .parentElement
                                                                        .id;

                                                                const api_endpoint =
                                                                    api_url +
                                                                    `/reject-submission?adminCode=${adminCode}&id=${id}`;
                                                                ad;

                                                                await fetch(
                                                                    api_endpoint
                                                                );
                                                                setActionsCount(
                                                                    actionsCount +
                                                                        1
                                                                );
                                                            }}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Box>
                                                </Card>
                                            </ListItem>
                                        );
                                    })}
                                </>
                            ) : (
                                <ListItem sx={{ justifyContent: "center" }}>
                                    {" "}
                                    <CircularProgress />
                                </ListItem>
                            )}
                        </List>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

export default Admin;
