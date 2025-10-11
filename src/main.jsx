import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    
     <BrowserRouter>
       <MainLayout />
     </BrowserRouter>
    
  </StrictMode>
);
