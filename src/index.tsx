import React from 'react';
import ReactDOM from 'react-dom';
import {Locale} from './locale/base/Locale';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {lightBlue} from "@material-ui/core/colors";
import App from "./components/App";
import AlertDialog from './chart/ChartPage'
import ChartPage from "./chart/ChartPage";


const blueTheme = createMuiTheme({palette: {primary: lightBlue}})


// Not the best solution, but it helps to avoid problems when locale not yet initialized
Locale.getInstance().init().then(_ => {
    console.log("Locale instantiated")

    ReactDOM.render(
        <React.StrictMode>
            <MuiThemeProvider theme={blueTheme}>
                <App/>
            </MuiThemeProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
})



