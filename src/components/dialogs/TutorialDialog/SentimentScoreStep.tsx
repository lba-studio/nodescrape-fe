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

const hslArray = [
  "hsl(0, 100%, 50%)",
  "hsl(60, 100%, 50%)",
  "hsl(120, 100%, 50%)",
];

const useStyles = makeStyles((theme) => ({
  gradientHslBackground: {
    height: theme.spacing(2),
    background: `linear-gradient(to right, ${hslArray.join(", ")})`,
    width: "100%",
  },
  explanationColumn: {
    // textAlign: "center",
  },
}));

const SentimentScoreStep: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  return (
    <>
      <DialogTitle>Sentiment Score - What is it?</DialogTitle>
      <DialogContent>
        <div className={classes.gradientHslBackground} />
        <Box display="flex">
          <Box mr="auto">
            <Typography align="left">-1</Typography>
            <Typography align="left" variant="overline">
              negative
            </Typography>
          </Box>
          <Box ml="auto" mr="auto">
            <Typography align="center">0</Typography>
            <Typography align="center" variant="overline">
              neutral
            </Typography>
          </Box>
          <Box ml="auto">
            <Typography align="right">1</Typography>
            <Typography align="right" variant="overline">
              positive
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            {isMobile && (
              <Typography component="p" variant="overline">
                negative
              </Typography>
            )}
            <Typography>
              Implies that the text/article contains words/phrases which are
              sentimentally negative. These include articles which can make you
              angry or sad.
            </Typography>
            <Typography>
              Example: "I really hate life. Go f*** yourself."
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {isMobile && (
              <Typography component="p" variant="overline">
                neutral
              </Typography>
            )}
            <Typography>
              Implies that the text/article contains words/phrases which are
              sentimentally neutral. These may include news articles that are
              mostly factual by nature.
            </Typography>
            <Typography>Example: "1 + 1 is 2."</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {isMobile && (
              <Typography component="p" variant="overline">
                positive
              </Typography>
            )}
            <Typography>
              Implies that the text/article contains words/phrases which are
              sentimentally positive. These include articles which can make you
              happy or enthusiastic about life.
            </Typography>
            <Typography>
              Example: "I love ice creams because they are really delicious!"
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

export default SentimentScoreStep;
