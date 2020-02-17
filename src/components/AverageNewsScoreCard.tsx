import React from 'react';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import NewsScoreCard from './NewsScoreCard';
import { Card, CardHeader, Box, CardContent, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = createStyles({
  score: {
    backgroundColor: 'orange'
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
    return <></>;
  }
  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <div>
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