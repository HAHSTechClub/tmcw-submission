import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Divider from "@mui/material/Divider";

import CircularProgress from "@mui/material/CircularProgress";

function SubmissionsInfo({ api_url, submissionsCount }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                api_url + "/get-submitted-code-information"
            );

            const json = await response.json();

            setData(json);
        }

        fetchData();
    }, [submissionsCount]);

    return (
        <Box>
            {data ? (
                data.map((row, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        width: "66.66%",
                                    }}
                                >
                                    {row.challengeName}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "text.secondary",
                                        textAlign: "right",
                                    }}
                                >
                                    {row.winner}
                                </Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <List>
                                    <ListItem>
                                        <Typography variant="body1">
                                            {`${row.winner} has won ${row.prize}. 🎉 
                                              
                                              `}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <em>
                                            <Typography variant="body2">
                                                {`As a bonus challenge, ${row.challenge}
                                              !`}
                                            </Typography>
                                        </em>
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    );
                })
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
}

export default SubmissionsInfo;
