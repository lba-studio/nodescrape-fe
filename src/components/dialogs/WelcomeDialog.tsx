import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import TutorialDialog from "./TutorialDialog";

const FIRST_TIME_USER_KEY = "firstTimeUser";

function isFirstTimeUser() {
  return true;
  const firstTimeUserVal = localStorage.getItem(FIRST_TIME_USER_KEY);
  return firstTimeUserVal === null;
}

function toggleIsNotFirstTimeUser() {
  localStorage.setItem(FIRST_TIME_USER_KEY, "false");
}

const WelcomeDialog: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(isFirstTimeUser());
  const [shouldRenderTutorial, setShouldRenderTutorial] = React.useState(true);
  const onTutorial = () => {
    setDialogOpen(false);
    setShouldRenderTutorial(true);
  };
  React.useEffect(() => {
    toggleIsNotFirstTimeUser();
  }, []);
  return !shouldRenderTutorial ? (
    <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
      <DialogTitle>Welcome, friend!</DialogTitle>
      <DialogContent>
        We noticed that this is the first time you're on the site. Would you
        like us to give a <b>really quick tour</b> on how it all works?
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onTutorial}>
          Sure!
        </Button>
        <Button onClick={() => setDialogOpen(false)}>No, thank you</Button>
      </DialogActions>
    </Dialog>
  ) : (
    <TutorialDialog />
  );
};

export default WelcomeDialog;
