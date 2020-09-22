import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import {CustomerDetailsProvider} from "./components/componentStates/CustomerDetailsContext";
import {AuthenticatedUserContextProvider} from "./components/componentStates/LoggedInUserState";
import {CSSReset, ThemeProvider} from "@chakra-ui/core";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthenticatedUserContextProvider>
                <CustomerDetailsProvider>
                    <ThemeProvider>
                        <CSSReset/>
                        <App/>
                    </ThemeProvider>
                </CustomerDetailsProvider>
            </AuthenticatedUserContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    rootElement
);
