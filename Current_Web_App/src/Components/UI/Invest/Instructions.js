import "./Case.css";
import React from "react";
import helpGif from "../../../Images/help.gif";
import Help from "./Help";
import Grid from "@mui/material/Grid";

function Instructions() {
  return (
    <div>
        <div className="title3">
            Please read the guidlines on how to use the Virtual Patient Simulator before you proceed !
        </div>
        <div className="insgrid">
            <Grid container spacing={1}>
                <Grid Item xs={8}>
                    <div className="fontForlist2">
                        <div className="alert alert-dismissible alert-secondary">
                            {/* New Instructions */}
                            <strong>Examination Phase: Instructions & Guidelines</strong>
                            <ul>
                                <li>
                                    <strong>Overview of Tasks:</strong> Simulate the process of assessing a patient as in real-life clinical settings.
                                </li>
                                <li>
                                    <strong>Navigating Intra and Extra Oral Views:</strong> Use buttons on the simulator window to switch between intra and extra oral views of the patient.
                                </li>
                                <li>
                                    <strong>Movement Controls:</strong> Use W, A, S, D keys for movement and the mouse to look around. Space bar for moving up and Shift key for moving down.
                                </li>
                                <li>
                                    <strong>Using Dental Tools:</strong> In the intra oral view, use keys 1, 2, 3, etc., to switch between tools. Tab key to exit from the tools.
                                </li>
                                <li>
                                    <strong>Screen Control:</strong> Press the Escape key to freeze the screen.
                                </li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid Item xs={4}>
                    <Help />
                </Grid>
            </Grid>
        </div>
    </div>
);

}

export default Instructions;
