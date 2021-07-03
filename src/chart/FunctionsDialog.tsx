import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Theme, withStyles} from "@material-ui/core";
import {Callback, FunctionsList, Params} from "./FunctionsList";
import {TransitionProps} from "@material-ui/core/transitions";
import translate from "../locale/base/Extensions";

type GetParams = () => Array<Params>

interface Props {
    open: boolean
    getParams: GetParams
    onUpdate: Callback
    onClose: Function
}

interface State {
    initialParams: Array<Params>
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ColorButton = withStyles((_: Theme) => ({
    root: {
        color: '#fff',
    },
}))(Button);

class FunctionsDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            initialParams: this.props.getParams()
        }
    }

    handleCancelClose = (_: any = undefined, __: string = '') => {
        this.props.onUpdate(this.state.initialParams);
        this.props.onClose();
    }

    render() {
        return <Dialog open={this.props.open} onClose={this.handleCancelClose} TransitionComponent={Transition}
                       maxWidth={false}>
            <DialogTitle>
                {translate("dialog_title")}
            </DialogTitle>
            <DialogContent>
                <FunctionsList params={this.state.initialParams} onUpdate={this.props.onUpdate} isDialog={true}/>
            </DialogContent>
            <DialogActions style={{marginTop:'10px', marginBottom:'10px'}}>
                <ColorButton variant="contained" color="primary" onClick={(_: any) => this.props.onClose()}>
                    {translate("dialog_save")}
                </ColorButton>
                <Button onClick={this.handleCancelClose}>
                    {translate("dialog_cancel")}
                </Button>
            </DialogActions>
        </Dialog>;
    }
}

export default FunctionsDialog