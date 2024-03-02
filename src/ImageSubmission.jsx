import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import Done from "@mui/icons-material/Done";
import Close from "@mui/icons-material/Close";

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
            }}
            key={submissionData.id}
            id={submissionData.id}
        >
            <Card
                sx={{
                    minWidth: "300px",
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
                        <img width="250px" src={submissionData.image} />
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
                                setActionsCount(actionsCount + 1);
                                setTimeout(() => setBackdrop(false), 2000);
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

                                setActionsCount(actionsCount + 1);
                                setTimeout(() => setBackdrop(false), 2000);
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
