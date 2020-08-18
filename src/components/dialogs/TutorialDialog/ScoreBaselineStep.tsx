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
import LightbulbIcon from "../../../assets/lightbulb-regular.svg";
import ImageContainer from "../../ImageContainer";

const ScoreBaselineStep: React.FC = () => {
  return (
    <>
      <DialogTitle>How do you feel after reading the news?</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <ImageContainer src={LightbulbIcon} alt="" />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography>
              Have you ever looked at the news and thought: "All this negative
              talk is really bringing my mood down!"
            </Typography>
            <Typography>
              Through this project, we aim to quantify how the news can make you
              feel happier or less happy.
            </Typography>
            <Typography>
              In order to do that, we assign a score - a <i>Sentiment Score</i>{" "}
              - to various elements of the news (whether it be a news source or
              a news topic).
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

export default ScoreBaselineStep;
