import React from "react";
import { Alert, Button } from "@material-tailwind/react";
 
export function Notification(prop) {

    const {notify, setNotify} = prop
  return (
    <>
      <Alert
        notify={notify}
        
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        A dismissible alert with custom animation.
      </Alert>
    </>
  );
}