import React from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./routes";

function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
        transition={Zoom}
        toastStyle={{
          backgroundColor: "#FAC41B",
          color: "black",
          fontWeight: "bold",
          borderRadius: "0",
        }}
      />
    </>
  );
}

export default App;
