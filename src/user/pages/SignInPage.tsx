import React, {useState} from "react";
import {Button, Container, CssBaseline, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import translate from "../../locale/base/Extensions";
import ValidatedTextField from "../../components/ValidatedTextField";
import Validations from "../../components/Validations";
import Auth from "../Authentication";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    error: {
        marginTop: 10
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#fff'
    },
}));

export default function SignInPage() {
    const classes = useStyles();

    const [isUserNotFound, setNotFound] = useState(false);
    const [isValidating, setValidate] = useState(false);
    const [callbacks, setCallbacks] = useState<(() => boolean)[]>([])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setValidate(true);

        if (!validate()) return;

        const login = event.target["login"].value;
        const password = event.target["password"].value;

        if (Auth.getInstance().authenticate(login, password)) {
            window.location.replace("/");
        } else {
            setNotFound(true);
        }
    }

    const validate = () => {
        let isAllValid = true;
        callbacks.forEach((c: () => boolean) => isAllValid = c() && isAllValid);
        return isAllValid;
    }

    const addCallback = (callback: () => boolean) => {
        // Bad practice but it allow to add two callbacks at the same time
        callbacks.push(callback)
        console.log(callbacks)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <iframe src='http://localhost:49922/greeting' style={{border: 0, height: 100}}/>
                <Typography component="h1" variant="h5">
                    {translate("sign_in_title")}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <ValidatedTextField
                        validate={isValidating}
                        validations={[Validations.nonempty, Validations.onlyLatin]}
                        setUpdateCallback={addCallback}
                        id="login"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={translate("registration_login")}
                        autoFocus
                    />
                    <ValidatedTextField
                        validate={isValidating}
                        validations={[Validations.nonempty, Validations.longerThan3]}
                        setUpdateCallback={addCallback}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={translate("registration_password")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {isUserNotFound
                        ? <Alert severity="error" className={classes.error}>{translate("sign_in_not_found")}</Alert>
                        : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {translate("sign_in_submit")}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/registration" variant="body2">
                                {translate("sign_in_registration")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}