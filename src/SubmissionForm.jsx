import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Alert from "@mui/material/Alert";
import { useState } from "react";

function SubmissionForm() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [rollClass, setRollClass] = useState("");

    return (
        <Paper elevation={3} sx={{ flexGrow: "1" }}>
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
                            required
                            id="outlined-required"
                            label="Code"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                        />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Your name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Your class"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <Button
                            variant="outlined"
                            onClick={async function () {
                                const api_endpoint = `https://tmcw-api.onrender.com/?name=${name}&code=${code}`;

                                const response = await fetch(api_endpoint);

                                const json = await response.json();
                                alert(json);
                            }}
                        >
                            Submit
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Paper>
    );
}

export default SubmissionForm;
