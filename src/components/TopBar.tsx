import React from "react";
import {Avatar, Box, Button, Link, Toolbar, Typography} from "@material-ui/core";
import {Locale} from "../locale/base/Locale";
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import translate from "../locale/base/Extensions";
import Auth from "../user/Authentication";


class TopBar extends React.Component<any, any> {

    private signOut() {
        Auth.getInstance().signOut();
        window.location.replace("/");
    }

    render() {
        const styles: Record<any, CSSProperties> = {
            root: {
                marginTop: 12,
                marginBottom: 12,
                marginLeft: 20,
                marginRight: 20,
            },
            languagesBlock: {
                marginRight: 30,
            },
            language: {
                minWidth: '40px'
            },
            title: {
                flexGrow: 1,
                textTransform: 'uppercase',
                cursor: 'pointer'
            },

        }

        return <Toolbar style={styles.root}>
            <Typography variant="h6" style={styles.title}>
                {Auth.getInstance().isAuthenticated
                    ? <Link href="/">
                        {translate("top_bar_chart")}
                    </Link>
                    : null}
            </Typography>

            <div style={styles.languagesBlock}>
                <Button color="inherit" size="small" style={styles.language} onClick={() => {
                    Locale.getInstance().setLocale("en");
                    window.location.reload();
                }}>en</Button>
                <Button color="inherit" size="small" style={styles.language} onClick={() => {
                    Locale.getInstance().setLocale("ru");
                    window.location.reload();
                }}>ru</Button>
            </div>

            {
                Auth.getInstance().isAuthenticated
                    ? <Box flexDirection="row">
                        <Button href="/profile">
                            <Avatar>{Auth.getInstance().currentUser?.name.slice(0, 2)}</Avatar>
                        </Button>
                        <Button color="inherit" size="large" onClick={this.signOut}>
                            {translate("top_bar_sign_out")}
                        </Button>
                    </Box>
                    : <Button color="primary" size="large" href="/signin">
                        {translate("sign_in_submit")}
                    </Button>

            }

        </Toolbar>;
    }

}

export default TopBar