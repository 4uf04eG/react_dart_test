import React, {useState} from "react";
import {Button, Container, CssBaseline, Grid, makeStyles, Typography} from "@material-ui/core";
import translate from "../../locale/base/Extensions";
import Auth from "../Authentication";
import LoginDialog from "../components/LoginDialog";
import PasswordDialog from "../components/PasswordDialog";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    name: {
        color: theme.palette.primary.dark,
        fontWeight: 500,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    value: {
        fontWeight: "normal",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    changeButton: {
        marginTop: theme.spacing(2)
    },
    button: {
      color: '#fff'
    }
}));

const Name = (params: any) => {
    const {children, ...props} = params;
    return (
        <Typography variant="h5" {...props}>
            {children}
        </Typography>)
}

const Value = (params: any) => {
    const {children, ...props} = params;
    return (
        <Typography variant="h5" align={'right'} {...props}>
            {children}
        </Typography>)
}

export default function ProfilePage() {
    const classes = useStyles();

    const [loginOpened, setLoginOpened] = useState(false);
    const [passwordOpened, setPasswordOpened] = useState(false);

    const getUser = () => Auth.getInstance().currentUser!;

    return (<Container component="main" maxWidth="sm">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h4" className={classes.title}>
                    {translate("profile_title")}
                </Typography>
                <Grid container spacing={2}>
                    <Grid container item xs={6} direction="column">
                        <Name className={classes.name}>{translate("registration_name")}:</Name>
                        <Name className={classes.name}>{translate("registration_country")}:</Name>
                        <Name className={classes.name}>{translate("registration_age")}:</Name>
                        <Name className={classes.name}>{translate("registration_login")}:</Name>
                        <Name className={classes.name}>{translate("registration_password")}:</Name>
                    </Grid>
                    <Grid container item xs={6} direction="column">
                        <Value className={classes.value}>{getUser().name}</Value>
                        <Value className={classes.value}>{translate(`country_${getUser().country}`)}</Value>
                        <Value className={classes.value}>{getUser().age}</Value>
                        <Value className={classes.value}>
                            <Button
                                className={classes.button}
                                color="primary"
                                onClick={() => setLoginOpened(true)}
                                variant="contained">
                                {translate("profile_change")}
                            </Button>
                            <LoginDialog open={loginOpened} onClose={() => setLoginOpened(false)}/>
                        </Value>

                        <Value className={classes.value}>
                            <Button
                                className={classes.button}
                                color="primary"
                                onClick={() => setPasswordOpened(true)}
                                variant="contained">
                                {translate("profile_change")}
                            </Button>
                            <PasswordDialog open={passwordOpened} onClose={() => setPasswordOpened(false)}/>
                        </Value>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}