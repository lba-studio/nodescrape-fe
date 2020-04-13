import { Card, CardHeader, Theme, WithStyles, withStyles, createStyles, CardContent, Typography, Avatar, Divider, IconButton, Dialog, DialogContent, Box, DialogTitle, DialogActions, Button, CardActionArea, CardActions } from "@material-ui/core";
import React from 'react';
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import computeColorHex from "../utils/computeColorHex";
import getTimePassedString from "../utils/getTimePassedString";
import InfoIcon from '@material-ui/icons/Info';

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
  },
  dialogTitleAvatar: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: theme.spacing(1),
  },
  dialogTitleName: {
    margin: 'auto',
  },
  infoButton: {
    marginLeft: 'auto',
  },
});


const NewsScoreCard: React.FC<NewsScoreCardProps & WithStyles<typeof styles>> = (props) => {
  const { position, classes, newsSourceScore } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <>
      <div
        style={{ maxWidth: '100%' }}
      >
        <Card className={classes.root}>
          <CardActionArea onClick={() => window.open(newsSourceScore.url, '_blank')}>
            <CardHeader
              avatar={<Avatar style={{ backgroundColor: computeColorHex(newsSourceScore.score) }}>
                {position}
              </Avatar>}
              className={classes.cardHeader}
              title={newsSourceScore.name}
            />
            <CardContent>
              <Typography>
                Score: {newsSourceScore.score.toFixed(3)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Divider />
          <CardActions disableSpacing>
            {/* <Button className={classes.infoButton} onClick={() => setDialogOpen(true)}>More</Button> */}
            <IconButton className={classes.infoButton} disableRipple aria-label="more info" onClick={() => setDialogOpen(true)}>
              <InfoIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <DialogTitle>
          <Box display="flex" flexDirection="row">
            <Avatar className={classes.dialogTitleAvatar} style={{ backgroundColor: computeColorHex(newsSourceScore.score) }}>
              {position}
            </Avatar>
            <div className={classes.dialogTitleName}>
              {newsSourceScore.name}
            </div>
          </Box>
        </DialogTitle>
        <DialogContent>
          <a href={newsSourceScore.url} target="_blank" rel="noopener noreferrer">{newsSourceScore.url}</a>
          <Typography>
            News score: {newsSourceScore.score.toFixed(3)}
          </Typography>
          <Divider />
          <Typography variant="subtitle2">
            Retrieved from: {newsSourceScore.retrievedFrom || 'Scraper'}
          </Typography>
          <Typography variant="subtitle2">
            Last updated: {getTimePassedString(new Date(newsSourceScore.lastUpdatedMs))}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Back</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(NewsScoreCard);