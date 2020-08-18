import React from "react";
import {
  makeStyles,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
} from "@material-ui/core";
import RobotIcon from "../../../assets/robot-solid.svg";
import ImageContainer from "../../ImageContainer";

const ScoreCalculationStep: React.FC = () => {
  return (
    <>
      <DialogTitle>How do we calculate scores?</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <ImageContainer src={RobotIcon} alt="" />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography>
              <s>
                We have a bunch of underpaid interns score each piece of text.
              </s>
            </Typography>
            <Typography>
              On a serious note, we run texts through a robot (machine-learning
              model) specially trained on being able to infer whether or not a
              particular text is negative or positive (or neutral).
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

export default ScoreCalculationStep;
