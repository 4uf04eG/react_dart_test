import React from "react";
import {Button, Card, Grid, IconButton, List} from "@material-ui/core";
import {Add, Delete, Edit} from "@material-ui/icons";
import {BlockPicker} from 'react-color';
import FunctionsDialog from "./FunctionsDialog";
import ValidatedTextField from "../components/ValidatedTextField";
import Validations from "../components/Validations";

type Color = 'r' | 'g' | 'b' | 'a';

export interface Params {
    a: number
    b: number
    c: number
    color: Record<Color, number>
    displayColorPicker: boolean
}

export type Callback = (params: Array<Params>) => any

interface Props {
    onUpdate: Callback
    params?: Array<Params>
    isDialog?: boolean
}

interface State {
    dialogOpened: boolean
    isDirty: boolean
    chartsParams: Array<Params>
}

export class FunctionsList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogOpened: false,
            isDirty: true,
            chartsParams: this.props.params ?? [],
        };
    }

    updateParent = () => {
        this.props.onUpdate(this.state.chartsParams);
    }

    updateParams = (params: Array<Params>) => {
        this.setState({chartsParams: params, isDirty: true})
    }

    handleClick = (index: number) => {
        const params = this.state.chartsParams.slice();
        params[index].displayColorPicker = !params[index].displayColorPicker;
        this.updateParams(params);
    };

    handleClose = (index: number) => {
        const params = this.state.chartsParams.slice();
        params[index].displayColorPicker = false;
        this.updateParams(params);
    };

    handleColorChange = (index: number, color: any) => {
        const params = this.state.chartsParams.slice();
        params[index].color = color.rgb;
        this.updateParams(params);
    };

    handleClickOpen() {
        this.setState({dialogOpened: true});
    }

    handleDialogClose() {
        this.setState({dialogOpened: false});
    }

    //TODO: Somehow remove this boilerplate
    onTextChangeA = (index: number, value: string) => {
        const params = this.state.chartsParams.slice();
        params[index].a = parseInt(value);
        this.updateParams(params);
    }

    onTextChangeB = (index: number, value: string) => {
        const params = this.state.chartsParams.slice();
        params[index].b = parseInt(value);
        this.updateParams(params);
    }

    onTextChangeC = (index: number, value: string) => {
        const params = this.state.chartsParams.slice();
        params[index].c = parseInt(value);
        this.updateParams(params);
    }

    onItemAdd = () => {
        this.updateParams([...this.state.chartsParams, {
                a: Math.round(Math.random() * 15),
                b: Math.round(Math.random() * 10),
                c: Math.round(Math.random() * 5), color: {
                    r: Math.random() * 255,
                    g: Math.random() * 255,
                    b: Math.random() * 255,
                    a: 1,
                }, displayColorPicker: false
            }]
        );
    }

    onItemRemove = (index: number) => {
        const params = this.state.chartsParams.slice();
        params.splice(index, 1);
        this.updateParams(params);
    }

    passParams = () => this.state.chartsParams;

    //Updates parent after state change
    componentDidUpdate = () => {
        if (this.state.isDirty) {
            this.updateParent();
            this.setState({isDirty: false})
        }
    }

    render() {
        const styles: Record<any, React.CSSProperties> = {
            itemRoot: {
                marginTop: '6px',
                marginBottom: '6px',
                paddingTop: '10px',
                paddingBottom: '10px'
            },
            textField: {
                width: '20ch',
                marginLeft: '15px'
            },
            colorContainer: {
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: '10px',
                marginRight: '15px'
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                right: '55px',
                zIndex: 2
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
            color: {
                width: '42px',
                height: '26px',
                borderRadius: '2px',
            },
            addButton: {
                paddingTop: '6px',
                paddingBottom: '6px',
                color: '#fff'
            }
        };
        const validations = [Validations.nonempty, Validations.numerical, Validations.notTooBig999]

        return <List>
            {
                this.state.chartsParams.map((item: Params, index: number) => (
                    <Card key={item.toString() + index} style={styles.itemRoot}>
                        <Grid container justify="space-between">
                            <form>
                                <ValidatedTextField
                                    validate
                                    validations={validations}
                                    label="a"
                                    variant="outlined"
                                    style={styles.textField}
                                    value={!Number.isNaN(item.a) ? item.a: ""}
                                    onChange={(event: any) => {
                                        this.onTextChangeA(index, event.target.value)
                                    }}
                                />
                                <ValidatedTextField
                                    validate
                                    validations={validations}
                                    label="b"
                                    variant="outlined"
                                    style={styles.textField}
                                    value={!Number.isNaN(item.b) ? item.b: ""}
                                    onChange={(event: any) => {
                                        this.onTextChangeB(index, event.target.value)
                                    }}
                                />
                                <ValidatedTextField
                                    validate
                                    validations={validations}
                                    label="c"
                                    variant="outlined"
                                    style={styles.textField}
                                    value={!Number.isNaN(item.c) ? item.c: ""}
                                    onChange={(event: any) => {
                                        this.onTextChangeC(index, event.target.value)
                                    }}
                                />
                            </form>
                            <div style={styles.colorContainer}>
                                <div style={styles.swatch} onClick={() => this.handleClick(index)}>
                                    <div style={{
                                        ...styles.color,
                                        background: `rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, ${item.color.a})`,
                                    }}/>
                                </div>
                                {this.state.chartsParams[index].displayColorPicker
                                    ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={() => this.handleClose(index)}/>
                                        <BlockPicker color={this.state.chartsParams[index].color}
                                                     onChange={(color: any) => this.handleColorChange(index, color)}/>
                                    </div>
                                    : null}

                            </div>
                            {!this.props.isDialog
                                ? <IconButton color="primary" onClick={() => this.handleClickOpen()}>
                                    <Edit/>
                                </IconButton>
                                : null}
                            <IconButton color="secondary" onClick={() => this.onItemRemove(index)}>
                                <Delete/>
                            </IconButton>
                        </Grid>
                    </Card>))
            }
            <Button fullWidth variant="contained" color="primary" onClick={this.onItemAdd}>
                <Add style={styles.addButton}/>
            </Button>
            {this.state.dialogOpened
                ? <FunctionsDialog open={this.state.dialogOpened} getParams={this.passParams.bind(this)}
                                   onUpdate={this.updateParams.bind(this)}
                                   onClose={this.handleDialogClose.bind(this)}/>
                : null}

        </List>;
    }
}

