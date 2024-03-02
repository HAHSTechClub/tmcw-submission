import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";

function SubmissionForm({ api_url, submissionsCount, setSubmissionCount }) {
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [data, setData] = useState(null);

    const [imageSubmission, setImageSubmission] = useState(false);
    const [imageFile, setImageFile] = useState(null);

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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
            },
        });
    };

    const submitForm = async function (event) {
        event.preventDefault();

        const newFormValues = structuredClone(formValues);
        let shouldReturn;

        await Object.keys(formValues).forEach((name) => {
            newFormValues[name].error = formValues[name].value === "";
        });

        setFormValues(newFormValues);

        await Object.keys(newFormValues).forEach((name) => {
            if (newFormValues[name].error) {
                console.log("ERROR");
                shouldReturn = true;
                return;
            }
        });

        if (imageSubmission && imageFile == null) {
            alert("Please upload a photo of your solution!");
            return;
        }

        if (shouldReturn) {
            return;
        }

        console.log("Making API Call");
        setBackdropOpen(true);

        if (imageSubmission) {
            const api_endpoint =
                api_url +
                `/submit-image/?name=${formValues.name.value}&challengeName=${formValues.code.value}&rollClass=${formValues.rollClass.value}`;

            const response = await fetch(api_endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: imageFile }),
            });
            const json = await response.json();
            setData(json);
        } else {
            const api_endpoint =
                api_url +
                `/submit-code/?name=${formValues.name.value}&code=${formValues.code.value}&rollClass=${formValues.rollClass.value}`;

            const response = await fetch(api_endpoint);
            const json = await response.json();
            setData(json);
        }

        setSubmissionCount(submissionsCount + 1);
    };

    const [formValues, setFormValues] = useState({
        name: {
            value: "",
            error: false,
            errorMessage: "You must enter a name",
        },
        rollClass: {
            value: "",
            error: false,
            errorMessage: "You must enter an age",
        },
        code: {
            value: "",
            error: false,
            errorMessage: "You must enter a code",
        },
    });

    return (
        <Paper elevation={4} sx={{ flexGrow: "1" }}>
            <Backdrop open={!imageChallengeNames == null} sx={{ zIndex: "1" }}>
                <CircularProgress></CircularProgress>
            </Backdrop>
            <form>
                <List style={{ justifyContent: "center" }}>
                    <ListItem>
                        <Alert severity="info">
                            Congratulations on solving the puzzle! Submit you
                            answer by typing your guess, name, and class below.
                        </Alert>
                    </ListItem>

                    <ListItem sx={{ justifyContent: "center" }}>
                        <TextField
                            autoComplete="off"
                            required
                            id="outlined-required"
                            name="code"
                            label="Code"
                            error={formValues.code.error}
                            onChange={(event) => {
                                handleChange(event);
                                setImageSubmission(
                                    imageChallengeNames.includes(
                                        event.target.value
                                    )
                                );
                            }}
                        />
                    </ListItem>
                    {imageSubmission ? (
                        <>
                            <Divider
                                sx={{
                                    transition: "all 200ms ease-in",
                                }}
                            ></Divider>
                            <ListItem
                                sx={{
                                    justifyContent: "center",
                                    transition: "all 200ms ease-in",
                                }}
                            >
                                <List>
                                    <ListItem sx={{ justifyContent: "center" }}>
                                        <Paper sx={{ padding: "8px" }}>
                                            <img
                                                src={imageFile}
                                                width="200px"
                                            />
                                        </Paper>
                                    </ListItem>
                                    <ListItem sx={{ justifyContent: "center" }}>
                                        <input
                                            type="file"
                                            name="imageUpload"
                                            id="imageUpload"
                                            hidden
                                            onChange={(event) => {
                                                const reader = new FileReader();

                                                reader.readAsDataURL(
                                                    event.target.files[0]
                                                );
                                                reader.onload = function (
                                                    event
                                                ) {
                                                    setImageFile(reader.result);
                                                };
                                            }}
                                        />
                                        <label htmlFor="imageUpload">
                                            <Button
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                component="span"
                                            >
                                                Upload Image
                                            </Button>
                                        </label>
                                    </ListItem>
                                </List>
                            </ListItem>
                            <Divider></Divider>
                        </>
                    ) : (
                        <></>
                    )}
                    <ListItem sx={{ justifyContent: "center" }}>
                        <TextField
                            autoComplete="off"
                            required
                            id="outlined-required"
                            name="name"
                            label="Your name"
                            error={formValues.name.error}
                            onChange={(event) => handleChange(event)}
                        />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <TextField
                            autoComplete="off"
                            required
                            id="outlined-required"
                            name="rollClass"
                            label="Your class"
                            error={formValues.rollClass.error}
                            onChange={(event) => handleChange(event)}
                        />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <Button variant="outlined" onClick={submitForm}>
                            Submit
                        </Button>
                    </ListItem>
                </List>
            </form>
            <Backdrop open={backdropOpen} sx={{ zIndex: "1" }}>
                {data ? (
                    <Paper sx={{ width: "300px" }}>
                        <List>
                            <ListItem>
                                <Typography variant="h6">
                                    {data.status}
                                </Typography>
                            </ListItem>
                            <Divider></Divider>
                            <ListItem>
                                <Typography variant="body1">
                                    {data.message}
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ justifyContent: "right" }}>
                                <Button
                                    onClick={() => {
                                        setBackdropOpen(false);
                                        setData(null);
                                    }}
                                >
                                    Close
                                </Button>
                            </ListItem>
                        </List>
                    </Paper>
                ) : (
                    <CircularProgress />
                )}
            </Backdrop>
        </Paper>
    );
}

export default SubmissionForm;
