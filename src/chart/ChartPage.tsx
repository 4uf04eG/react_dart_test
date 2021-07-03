import React from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, Grid} from "@material-ui/core";
import Chart from "./Chart";
import {FunctionsList, Params} from "./FunctionsList";

let chartInstance: Chart;

// Couldn't find any better way to redraw chart on functions list callback
function _onUpdate(params: Array<Params>) {
    chartInstance.updateParams(params);
}

export default function ChartPage() {
    const [open, setOpen] = React.useState(false);

    // @ts-ignore
    window.handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid container justify="center">

            <Box width={1 / 2} marginTop={5}>
                <Chart ref={chart => {
                    chartInstance = chart!
                }}/>
                <FunctionsList onUpdate={_onUpdate}/>
            </Box>
            <Box>
                <iframe allow='camera *;microphone *' src='http://localhost:49922/main'
                        style={{border: 0, height: 900, width: 600}}/>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <iframe title='dialog' allow='camera *;microphone *' src={'https://gtuner.herokuapp.com/'} style={{border: 0, height: 900, width: 550}}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
