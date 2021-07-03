import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import ValidatedTextField from "../../components/ValidatedTextField";
import translate from "../../locale/base/Extensions";
import Auth from "../Authentication";
import {User} from "../UserModel";
import Validations from "../../components/Validations";

interface Props {
    open: boolean,
    onClose: () => any
}

interface State {
    curPassword: string,
    newPassword: string,
    arePasswordMatch: boolean,
    validateCallbacks: (() => boolean)[]
}

export default class PasswordDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            curPassword: "",
            newPassword: "",
            arePasswordMatch: true,
            validateCallbacks: []
        };
    }

    validate = () => {
        let isAllValid = true;
        console.log(this.state.validateCallbacks)
        this.state.validateCallbacks.forEach((c: () => boolean) => isAllValid = c() && isAllValid);

        if (!isAllValid) return false;

        const match = Auth.getInstance().isPasswordMatch(this.state.curPassword);
        this.setState({arePasswordMatch: match});

        return match;
    }

    setCurPassword = (event: any) => this.setState({curPassword: event.target.value})

    setNewPassword = (event: any) => this.setState({newPassword: event.target.value})


    handleSave = () => {
        if (!this.validate()) return;

        const copy = User.clone(Auth.getInstance().currentUser!);
        copy.password = Auth.getInstance().hashPassword(this.state.newPassword);
        Auth.getInstance().updateUser(copy);

        this.onCancel();
    }

    onCancel = () => {
        this.setState({curPassword: "", newPassword: ""});
        this.props.onClose();
    }

    setCallback = (callback: () => boolean) => {
        this.state.validateCallbacks.push(callback)
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{translate("profile_change_password")}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid container>
                            <ValidatedTextField
                                fullWidth
                                validations={[Validations.nonempty, Validations.longerThan3]}
                                onChange={this.setCurPassword}
                                setUpdateCallback={this.setCallback}
                                error={!this.state.arePasswordMatch ? !this.state.arePasswordMatch : undefined}
                                helperText={!this.state.arePasswordMatch
                                    ? translate("profile_invalid_password")
                                    : null}
                                label={translate("profile_current_password")}/>
                        </Grid>
                        <Grid container>
                            <ValidatedTextField
                                fullWidth
                                validations={[Validations.nonempty, Validations.longerThan3]}
                                setUpdateCallback={this.setCallback}
                                onChange={this.setNewPassword}
                                label={translate("profile_new_password")}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={this.handleSave}
                        style={{color: '#fff'}}
                        variant="contained">
                        {translate("profile_change")}
                    </Button>
                    <Button onClick={this.onCancel}>
                        {translate("dialog_cancel")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}