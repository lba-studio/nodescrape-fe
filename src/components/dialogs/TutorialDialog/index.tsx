import React from "react";
import { Dialog, Button, MobileStepper } from "@material-ui/core";
import SentimentScoreStep from "./SentimentScoreStep";
import ScoreCalculationStep from "./ScoreCalculationStep";
import ScoreBaselineStep from "./ScoreBaselineStep";

const steps = [
  ScoreBaselineStep,
  SentimentScoreStep,
  ScoreCalculationStep,
] as const;

interface TutorialDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (nextVal: boolean) => void;
}

const TutorialDialog = (props: TutorialDialogProps) => {
  const { dialogOpen, setDialogOpen } = props;
  const [stepNumber, setStepNumber] = React.useState(0);
  const totalNumberOfSteps = steps.length;
  const CurrentStep = steps[stepNumber];
  React.useEffect(() => {
    if (stepNumber >= totalNumberOfSteps) {
      setDialogOpen(false);
    }
  }, [stepNumber, totalNumberOfSteps, setDialogOpen]);
  return (
    <>
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        {CurrentStep && (
          <>
            <CurrentStep />
            <MobileStepper
              variant="dots"
              steps={totalNumberOfSteps}
              position="static"
              activeStep={stepNumber}
              backButton={
                <Button
                  size="small"
                  onClick={() => setStepNumber((n) => n - 1)}
                  disabled={stepNumber === 0}
                >
                  Back
                </Button>
              }
              nextButton={
                <Button
                  size="small"
                  onClick={() => setStepNumber((n) => n + 1)}
                  disabled={stepNumber === totalNumberOfSteps}
                >
                  {stepNumber === totalNumberOfSteps - 1 ? "OK!" : "Next"}
                </Button>
              }
            />
          </>
        )}
      </Dialog>
    </>
  );
};

export default TutorialDialog;
