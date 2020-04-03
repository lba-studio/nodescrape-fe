import { Card, CardHeader, Theme, WithStyles, withStyles, createStyles, CardContent, Typography, Avatar, Divider } from "@material-ui/core";
import React from 'react';
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import computeColorHex from "../utils/computeColorHex";
import getTimePassedString from "../utils/getTimePassedString";

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
    overflowWrap: 'break-word',
    msWordBreak: 'break-all',
    display: 'flex',
  }
});


const NewsScoreCard: React.FC<NewsScoreCardProps & WithStyles<typeof styles>> = (props) => {
  const { position, classes, newsSourceScore } = props;
  return (
    <div
      style={{ maxWidth: '100%' }}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar style={{ backgroundColor: computeColorHex(newsSourceScore.score) }}>
            {position}
          </Avatar>}
          className={classes.cardHeader}
          title={newsSourceScore.name}
          subheader={newsSourceScore.url}
        />
        <CardContent>
          <Typography>
            Score: {newsSourceScore.score.toFixed(4)}
          </Typography>
          <Divider />
          <Typography variant="subtitle2">
            Retrieved from: {newsSourceScore.retrievedFrom || 'Scraper'}
          </Typography>
          <Typography variant="subtitle2">
            Last updated: {getTimePassedString(new Date(newsSourceScore.lastUpdatedMs))}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(NewsScoreCard);