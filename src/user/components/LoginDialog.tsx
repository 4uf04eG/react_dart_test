import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import ValidatedTextField from "../../components/ValidatedTextField";
import translate from "../../locale/base/Extensions";
import Auth from "../Authentication";
import Validations from "../../components/Validations";
import {User} from "../UserModel";

interface Props {
    open: boolean,
    onClose: () => any
}

interface State {
    login: string,
    isLoginOccupied: boolean,
    validateCallback: () => boolean
}

export default class LoginDialog extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: this.getUser().login,
            isLoginOccupied: false,
            validateCallback: () => true
        }
    }

    getUser = () => User.clone(Auth.getInstance().currentUser!);

    onChange = (event: any) => {
        this.setState({login: event.target.value});
    }

    updateUser = () => {
        if (this.state.validateCallback()) {
            const newUser = this.getUser();
            newUser.login = this.state.login;

            const occupied = !Auth.getInstance().updateUser(newUser);
            this.setState({isLoginOccupied: occupied});

            if (!occupied) this.props.onClose();
        } else {
            this.setState({isLoginOccupied: false});
        }
    }

    onCancel = () => {
        this.setState({login: this.getUser().login})
        this.props.onClose();
    }

    setValidateCallback = (validateCallback: () => boolean) => {
        this.setState({validateCallback: validateCallback});
    }
    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{translate("profile_change_login")}</DialogTitle>
                <DialogContent>
                    <ValidatedTextField
                        id="login-field"
                        validate={false}
                        defaultValue={this.state.login}
                        validations={[Validations.nonempty, Validations.onlyLatin]}
                        error={this.state.isLoginOccupied ? true : undefined}
                        helperText={this.state.isLoginOccupied ? translate("registration_exists") : null}
                        onChange={event => this.onChange(event)}
                        setUpdateCallback={this.setValidateCallback}
                        label={translate("registration_current_password")}/>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={this.updateUser}
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