import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import RegistrationPage from "../user/pages/RegistrationPage";
import ChartPage from "../chart/ChartPage";
import SignInPage from "../user/pages/SignInPage";
import ProfilePage from "../user/pages/ProfilePage";
import NotFoundPage from "../404/NotFoundPage";
import TopBar from "./TopBar";
import Auth from "../user/Authentication";
import AdminPage from "../user/pages/AdminPage";
import IntroPage from "../user/pages/IntroductionPage";


function PrivateRoute(params: any) {
    const {children, ...rest} = params;

    return (
        <Route
            {...rest}
            render={({location}) =>
                Auth.getInstance().isAuthenticated
                    ? params.children
                    : <Redirect
                        to={{
                            pathname: "/intro",
                            state: {from: location}
                        }}
                    />

            }
        />
    );
}

function AdminRoute() {
    return (
        <Route
            path="/admin"
            render={({location}) =>
                Auth.getInstance().currentUser?.isAdmin
                    ? <AdminPage/>
                    : <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />

            }
        />
    );
}

export default function App() {
    return (
        <div>
            <TopBar/>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/">
                        <ChartPage/>
                    </PrivateRoute>
                    <Route path="/registration">
                        <RegistrationPage/>
                    </Route>
                    <Route path="/signin">
                        <SignInPage/>
                    </Route>
                    <Route path="/intro">
                        <IntroPage/>
                    </Route>
                    <PrivateRoute path="/profile">
                        <ProfilePage/>
                    </PrivateRoute>
                    <AdminRoute/>
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}