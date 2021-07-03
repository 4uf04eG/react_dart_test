import React from "react";
import {Container, CssBaseline, Grid, makeStyles, Typography} from "@material-ui/core";
import MaterialTable from 'material-table'
import translate from "../../locale/base/Extensions";
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

export default class AdminPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            columns: [
                {title: 'isAdmin', field: 'isAdmin', type: "boolean"},
                {title: translate("registration_name"), field: 'name'},
                {title: translate("registration_login"), field: 'login',},
                {title: translate("registration_password"), field: 'password', type: 'numeric'},
                {
                    title: translate("registration_country"),
                    field: 'country',
                    lookup: {
                        "none": translate("country_none"),
                        "russia": translate("country_russia"),
                        "ukraine": translate("country_ukraine"),
                        "russian": translate("country_russian"),
                        "poland": translate("country_poland"),
                    },
                },
                {title: translate("registration_age"), field: 'age', type: 'numeric'}
            ],
            data: []
        }
    }

    getUsers = () => Auth.getInstance().getAllUsers()!;

    setData = (users: User[]) => this.setState({data: users})

    componentWillMount = () => {
        this.setData(this.getUsers());
    }

    render() {
        return (<Container component="main" maxWidth="md">
            <CssBaseline/>
            <div>
                <Typography component="h1" variant="h4" style={{marginBottom: 23}}>
                    {translate("admin_title")}
                </Typography>
                <Grid container>
                    <MaterialTable
                        title={translate("admin_users")}
                        columns={this.state.columns as any}
                        data={this.state.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    this.setData([...this.state.data, newData]);
                                    Auth.getInstance().addUser(newData as User);
                                    resolve();
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    const dataUpdate = [...this.state.data];
                                    const index = dataUpdate.indexOf(oldData!);
                                    dataUpdate[index] = newData
                                    this.setData(dataUpdate);
                                    Auth.getInstance().updateUser(newData as User, oldData as User)

                                    resolve();

                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    const dataDelete = [...this.state.data];
                                    const index = dataDelete.indexOf(oldData);
                                    dataDelete.splice(index, 1);
                                    this.setData([...dataDelete]);
                                    Auth.getInstance().deleteUser((oldData as User).login)

                                    resolve()
                                }),
                        }}
                    />
                </Grid>

            </div>
        </Container>)
    }
}