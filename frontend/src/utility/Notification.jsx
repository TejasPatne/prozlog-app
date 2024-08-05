import React from 'react'
import { Toaster } from "react-hot-toast";

const Notification = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  )
}

export default Notification