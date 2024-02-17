import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Alert from "@mui/material/Alert";
import { useState } from "react";

function SubmissionForm() {
    const [backdropOpen, setBackdropOpen] = useState(false);

    const [data, setData] = useState(null);

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

        if (shouldReturn) {
            return;
        }

        console.log("Making API Call");
        setBackdropOpen(true);

        setShowingMessage(true);
        const api_endpoint = `https://tmcw-api.onrender.com/submit/?name=${formValues.name.value}&code=${formValues.code.value}&rollClass=${formValues.rollClass.value}`;

        const response = await fetch(api_endpoint);

        const json = await response.json();

        setData(json);
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

    const [showingMessage, setShowingMessage] = useState(false);

    return (
        <Paper elevation={4} sx={{ flexGrow: "1" }}>
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
                            onChange={(event) => handleChange(event)}
                        />
                    </ListItem>
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
                    <Paper sx={{ width: "350px" }}>
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
