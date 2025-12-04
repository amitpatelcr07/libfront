import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import { Provider } from "react-redux";
import  store  from "./redux/store";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
