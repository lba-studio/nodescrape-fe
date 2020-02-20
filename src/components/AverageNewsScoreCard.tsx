import React from 'react';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import { Card, Box, createStyles, withStyles, WithStyles, Typography, Theme } from '@material-ui/core';
import computeColorHex from '../utils/computeColorHex';

const styles = (theme: Theme) => createStyles({
  score: {
    // backgroundColor: 'orange',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  label: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
});

interface AverageNewsScoreCardProp {
  newsSourceScores: Array<NewsSourceScore>;
}

const AverageNewsScoreCard: React.FC<AverageNewsScoreCardProp & WithStyles<typeof styles>> = (props) => {
  const { classes, newsSourceScores } = props;
  let average: number | undefined = undefined;
  let firstElement = newsSourceScores.pop();
  if (firstElement) {
    average = newsSourceScores.reduce((acc, curr) => (acc + curr.score) / 2, firstElement.score);
  } else {
    return <Typography>Cannot get average score if there are no scores to begin with. Please try again later.</Typography>;
  }
  return (
    <Card>
      <Box display="flex" flexDirection="row">
        <div className={classes.label}>
          Average News Score:
        </div>
        <div className={classes.score} style={{ backgroundColor: computeColorHex(average) }}>
          {average.toFixed(4)}
        </div>
      </Box>
    </Card>
    || <></>
  );
}

export default withStyles(styles)(AverageNewsScoreCard);