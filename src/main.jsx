import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import { Provider } from "react-redux";
import  store  from "./redux/store";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored" // 🔥 BEST looking
        />
        <MainLayout />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
