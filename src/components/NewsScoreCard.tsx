import { Card, CardHeader, Theme, WithStyles, withStyles, createStyles, CardContent, Typography, Avatar } from "@material-ui/core";
import React from 'react';
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import { green } from "@material-ui/core/colors";

interface NewsScoreCardProps {
  newsSourceScore: NewsSourceScore;
  variant?: 'super-flashy' | 'flashy' | 'normal'
  position: number;
};

const styles = (theme: Theme) => createStyles({
  root: {
    // maxWidth: '256px',
    margin: theme.spacing(2),
  },
  cardHeader: {
    wordWrap: 'break-word',
  }
});


const NewsScoreCard: React.FC<NewsScoreCardProps & WithStyles<typeof styles>> = (props) => {
  const { position, classes, newsSourceScore } = props;
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar style={{backgroundColor: green[500]}}>
            {position}
          </Avatar>}
          className={classes.cardHeader}
          title={newsSourceScore.name}
          subheader={newsSourceScore.url}
        />
        <CardContent>
          <Typography>
            Score: {newsSourceScore.score.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(NewsScoreCard);