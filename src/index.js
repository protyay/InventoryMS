import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { CustomerDetailsProvider } from "./components/componentStates/CustomerDetailsContext";
import { AuthenticatedUserContextProvider } from "./components/componentStates/LoggedInUserState";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerDetailsProvider>
        <AuthenticatedUserContextProvider>
          <App />
        </AuthenticatedUserContextProvider>
      </CustomerDetailsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
