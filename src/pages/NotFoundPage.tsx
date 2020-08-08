import React from "react";
import { Typography, Button } from "@material-ui/core";
import Routing from "../utils/Routing";

export default function () {
  return (
    <>
      <Typography variant="h1">404 Not Found</Typography>
      <Typography>
        Were you trying to find something? Did a page exist here beforehand?
      </Typography>
      <Button onClick={() => Routing.goTo("/")}>Take me home!</Button>
    </>
  );
}
