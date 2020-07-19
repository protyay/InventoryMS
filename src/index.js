import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { CustomerDetailsProvider } from "./components/componentStates/CustomerDetailsContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerDetailsProvider>
        <App />
      </CustomerDetailsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
