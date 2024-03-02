import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import Done from "@mui/icons-material/Done";
import Close from "@mui/icons-material/Close";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function ImageSubmission({
    setBackdrop,
    actionsCount,
    setActionsCount,
    api_url,
    submissionData,
    adminCode,
}) {
    return (
        <ListItem
            sx={{
                justifyContent: "center",
                width: "100%",
            }}
            key={submissionData.id}
            id={submissionData.id}
        >
            <Card
                sx={{
                    minWidth: "300px",
                    boxShadow:
                        submissionData.isAccepted == "VERIFIED"
                            ? "0px 2px 1px -1px gold, 0px 1px 1px 0px gold, 0px 1px 3px 0px gold"
                            : "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                }}
            >
                <Box
                    sx={{
                        padding: "8px",
                    }}
                >
                    <Typography variant="body1">
                        Submitted: {submissionData.timestamp}
                    </Typography>
                </Box>
                <Divider></Divider>
                <List>
                    <ListItem>
                        <List>
                            <ListItem>
                                <Typography variant="body2">
                                    Challenge: {submissionData.challengeName}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {" "}
                                <Typography variant="body2">
                                    Submitter: {submissionData.name}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body2">
                                    Class: {submissionData.rollClass}
                                </Typography>
                            </ListItem>
                        </List>
                    </ListItem>
                    <ListItem
                        sx={{
                            justifyContent: "center",
                        }}
                    >
                        <PhotoProvider>
                            <PhotoView src={submissionData.image}>
                                <img width="250px" src={submissionData.image} />
                            </PhotoView>
                        </PhotoProvider>
                    </ListItem>
                </List>

                <Divider></Divider>
                <Box
                    sx={{
                        padding: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {submissionData.isAccepted == "VERIFIED" ? (
                        <Button
                            startIcon={<Close />}
                            onClick={async (event) => {
                                const id =
                                    event.target.parentElement.parentElement
                                        .parentElement.id;

                                const api_endpoint =
                                    api_url +
                                    `/unverify-submission?adminCode=${adminCode}&id=${id}`;

                                setBackdrop(true);

                                await fetch(api_endpoint);
                                setTimeout(() => {
                                    setActionsCount(actionsCount + 1);
                                    setBackdrop(false);
                                }, 1000);
                                setTimeout(() => {
                                    setBackdrop(false);
                                }, 3000);
                            }}
                        >
                            Reject
                        </Button>
                    ) : (
                        <Button
                            startIcon={<Done />}
                            onClick={async (event) => {
                                const id =
                                    event.target.parentElement.parentElement
                                        .parentElement.id;

                                const api_endpoint =
                                    api_url +
                                    `/verify-submission?adminCode=${adminCode}&id=${id}`;

                                setBackdrop(true);

                                await fetch(api_endpoint);

                                setTimeout(() => {
                                    setActionsCount(actionsCount + 1);
                                    setBackdrop(false);
                                }, 1000);
                                setTimeout(() => {
                                    setBackdrop(false);
                                }, 3000);
                            }}
                        >
                            Verify
                        </Button>
                    )}
                </Box>
            </Card>
        </ListItem>
    );
}

export default ImageSubmission;
