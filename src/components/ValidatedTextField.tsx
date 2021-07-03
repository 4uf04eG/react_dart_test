import React from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import {Validation} from "./Validations";

type PropsExtensions = {
    validations: Validation[],
    validate?: boolean
    setUpdateCallback?: (callback: () => boolean) => any
};

type Props = TextFieldProps & PropsExtensions;

interface State {
    currentValue: string
    errorText?: string
}

// I know it's bad...
class ValidatedTextField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentValue: this.props.value as string ?? this.props.defaultValue as string ?? "",
            errorText: undefined
        }
    }

    private updateCallback = () => this.validate(this.state.currentValue);

    private validate = (curValue: string) => {
        for (const val of this.props.validations) {
            if (val.validate(curValue)) {
                this.setState({errorText: val.getErrorMsg()});
                return false;
            }
        }

        this.setState({errorText: undefined});
        return true;
    }

    private validateOnChange = (event: any) => {
        const value = event.target.value;
        console.log("sds")
        this.setState({currentValue: value});
        this.props.onChange?.call(null, event);
        if (this.props.validate) this.validate(value);
    }

    componentWillMount = () => {
        if (this.props.setUpdateCallback != null) {
            this.props.setUpdateCallback(() => this.updateCallback())
        }
    }

    render() {
        // Passing custom parameter causes warning
        const {validate, validations, setUpdateCallback, ...restProps} = this.props;

        return <TextField
            {...restProps}
            error={restProps.error ?? this.state.errorText != null}
            helperText={restProps.helperText ?? this.state.errorText}
            onChange={this.validateOnChange}
        />;
    }
}

export default ValidatedTextField