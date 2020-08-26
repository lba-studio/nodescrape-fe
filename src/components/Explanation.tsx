import React from "react";
import { Button, Box } from "@material-ui/core";
import TutorialDialog from "./dialogs/TutorialDialog";

export default function () {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Button
        color="primary"
        variant="text"
        onClick={() => setDialogOpen(true)}
      >
        How does this work?
      </Button>
      <TutorialDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </Box>
  );
}
