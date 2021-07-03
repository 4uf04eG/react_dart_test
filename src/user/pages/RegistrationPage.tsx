import React, {useState} from "react";
import {
    Button,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    Link,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import translate from "../../locale/base/Extensions";
import ValidatedTextField from "../../components/ValidatedTextField";
import Validations from "../../components/Validations";
import Auth from "../Authentication";
import {User} from "../UserModel";

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
        marginTop: theme.spacing(3),
    },
    error: {
        marginTop: 10
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white'
    },
}));

export default function RegistrationPage() {
    const classes = useStyles();

    const [isUserAlreadyExist, setIsExist] = useState(false);
    const [isValidating, setValidating] = useState(false);
    const [arePasswordsMatch, setPasswordsMatch] = useState(true);
    const [callbacks, setCallbacks] = useState<(() => boolean)[]>([]);
    const [country, onChange] = useState("none");

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setValidating(true);

        if (!validate(event)) return;

        const name = event.target["name"].value;
        const login = event.target["login"].value;
        const password = event.target["password"].value;
        const country = event.target[8].value; // For some reason id doesn't work
        const age = event.target["age"].value;
        const user = new User(false, name, login, password, country, age);

        if (Auth.getInstance().register(user)) {
            window.location.replace("/profile");
        } else {
            setIsExist(true);
        }
    }

    const validate = (event: any) => {
        const password = event.target["password"].value;
        const confirm = event.target["confirm-password"].value;
        const match = password === confirm;
        setPasswordsMatch(match);

        if (!match) return;

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
                <Typography component="h1" variant="h5">
                    {translate("registration_title")}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={7}>
                            <ValidatedTextField
                                validate={isValidating}
                                validations={[Validations.nonempty]}
                                setUpdateCallback={addCallback}
                                variant="outlined"
                                fullWidth
                                id="name"
                                label={translate("registration_name")}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <ValidatedTextField
                                validate={isValidating}
                                validations={[Validations.nonempty, Validations.onlyLatin]}
                                setUpdateCallback={addCallback}
                                variant="outlined"
                                fullWidth
                                id="login"
                                label={translate("registration_login")}
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField
                                validate={isValidating}
                                validations={[Validations.nonempty, Validations.longerThan3]}
                                setUpdateCallback={addCallback}
                                variant="outlined"
                                fullWidth
                                label={translate("registration_password")}
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField
                                validate={isValidating}
                                validations={[Validations.nonempty, Validations.longerThan3]}
                                setUpdateCallback={addCallback}
                                error={!arePasswordsMatch ? !arePasswordsMatch : undefined}
                                helperText={!arePasswordsMatch
                                    ? translate("registration_passwords_not_match")
                                    : null}
                                variant="outlined"
                                fullWidth
                                label={translate("registration_confirm_password")}
                                type="password"
                                id="confirm-password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>{translate("registration_country")}</InputLabel>
                                <Select
                                    autoWidth
                                    value={country}
                                    onChange={(event: any, _: any) => onChange(event.target.value)}
                                    label={translate("registration_country")}
                                >
                                    <MenuItem value="none"><em>{translate("country_none")}</em>
                                    </MenuItem>
                                    <MenuItem value={"russia"}>{translate("country_russia")}</MenuItem>
                                    <MenuItem value={"ukraine"}>{translate("country_ukraine")}</MenuItem>
                                    <MenuItem value={"china"}>{translate("country_china")}</MenuItem>
                                    <MenuItem value={"poland"}>{translate("country_poland")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <ValidatedTextField
                                validate={isValidating}
                                validations={[Validations.nonempty, Validations.numerical, Validations.notTooBig150]}
                                setUpdateCallback={addCallback}
                                fullWidth
                                variant="outlined"
                                id="age"
                                label={translate("registration_age")}>
                            </ValidatedTextField>
                        </Grid>
                    </Grid>
                    {isUserAlreadyExist
                        ? <Alert severity="error" className={classes.error}>{translate("registration_exists")}</Alert>
                        : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        {translate("registration_submit")}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                {translate("registration_sign_in")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}