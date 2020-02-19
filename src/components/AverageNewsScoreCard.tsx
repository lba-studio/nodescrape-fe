import React from 'react';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import { Card, Box, CardContent, createStyles, withStyles, WithStyles, Typography, Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  score: {
    // backgroundColor: 'orange',
    paddingLeft: theme.spacing(1),
  },
  label: {
    paddingRight: theme.spacing(1),
  }
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
      <CardContent>
        <Box display="flex" flexDirection="row">
          <div className={classes.label}>
            Average News Score:
          </div>
          <div className={classes.score}>
            {average}
          </div>
        </Box>
      </CardContent>
    </Card>
    || <></>
  );
}

export default withStyles(styles)(AverageNewsScoreCard);