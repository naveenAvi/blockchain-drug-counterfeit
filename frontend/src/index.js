import React from "react";
import ReactDOM from 'react-dom/client';

// import { BrowserRouter } from "react-router-dom";
import Approuter from "./approuter";

// import { App } from "./app";
import 'bootstrap/dist/css/bootstrap.min.css';
//CSS & Bootstrap
import "./assets/css/style.css";
//  import "./assets/js/bootstrap.bundle.min.js";
import "./assets/css/select2.min.css";
//Font Awesome
// import "./assets/plugins/fontawesome/css/fontawesome.min.css";
// import "./assets/plugins/fontawesome/css/all.min.css";
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Approuter/>
);
// ReactDOM.render(
//     <BrowserRouter>
//       <Approuter />
//     </BrowserRouter>,
//     document.getElementById("root")
//   );

// ReactDOM.render(
//   <Approuter/>,
// document.getElementById('root')
// );