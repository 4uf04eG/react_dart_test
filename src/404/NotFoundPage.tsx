import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import translate from "../locale/base/Extensions";

const NotFoundPage = () => (
    <Grid container justify="center">
        <Box flexDirection="column" position="absolute" top="30%">
            <Typography align="center" variant="h1">
                {translate("page_404_title")}
            </Typography>

            <Typography align="center" variant="h4">
                {translate("page_404_content")}
            </Typography>
        </Box>
    </Grid>
)

export default NotFoundPage