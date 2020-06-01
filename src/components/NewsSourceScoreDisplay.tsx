import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, useTheme, Tooltip, Dialog, DialogTitle, Box, Avatar, DialogContent, Typography, Divider, DialogActions, Button, Paper, Card } from '@material-ui/core';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import computeColorHex from '../utils/computeColorHex';
import getTimePassedString from '../utils/getTimePassedString';
import InfoIcon from '@material-ui/icons/Info';

interface NewsSourceScoreDisplayProps {
  newsSourceScores: Array<NewsSourceScore>
}

interface NewsSourceScoreDialogData {
  data: NewsSourceScore;
  position: number;
  colorHex: string;
  textColorHex: string;
}

const useStyles = makeStyles(theme => ({
  dialogTitleAvatar: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: theme.spacing(1),
  },
  dialogTitleName: {
    margin: 'auto',
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tableHead: {
    fontWeight: 700,
  },
}));

const NewsSourceScoreDisplay: React.FC<NewsSourceScoreDisplayProps> = (props) => {
  const { newsSourceScores } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [dialogData, setDialogData] = React.useState<NewsSourceScoreDialogData | null>(null);
  return <>
    <TableContainer component={Card}>
      <Table>
        <TableHead>
          <TableRow>
            <Tooltip
              title="Rank of the news source vs other news sources"
              arrow
            >
              <TableCell>Rank</TableCell>
            </Tooltip>
            <Tooltip
              title="Name of the news source"
              arrow
            >
              <TableCell>Source Name</TableCell>
            </Tooltip>
            <Tooltip
              title="The average sentiment score of the articles in that news source"
              arrow
            >
              <TableCell>Sentiment Score</TableCell>
            </Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsSourceScores
            .map((newsSourceScore, index) => {
              const colorHex = computeColorHex(newsSourceScore.score);
              const textColorHex = theme.palette.getContrastText(colorHex);
              return <TableRow
                key={newsSourceScore.id}
                style={{
                  backgroundColor: colorHex,
                }}
                className={classes.tableRow}
                onClick={() => setDialogData({ data: newsSourceScore, position: index + 1, colorHex, textColorHex })}
              >
                <TableCell style={{ color: textColorHex }}>{index + 1}</TableCell>
                <TableCell style={{ color: textColorHex }}>{newsSourceScore.name}</TableCell>
                <TableCell style={{ color: textColorHex }}>{newsSourceScore.score.toFixed(4)}</TableCell>
              </TableRow>
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog onClose={() => setDialogData(null)} open={dialogData !== null}>
      {dialogData && <>
        <DialogTitle>
          <Box display="flex" flexDirection="row">
            <Avatar
              className={classes.dialogTitleAvatar}
              style={{ 
                backgroundColor: dialogData.colorHex, 
                color: dialogData.textColorHex 
              }}
            >
              {dialogData.position}
            </Avatar>
            <div className={classes.dialogTitleName}>
              {dialogData.data.name}
            </div>
          </Box>
        </DialogTitle>
        <DialogContent>
          <a href={dialogData.data.url} target="_blank" rel="noopener noreferrer">{dialogData.data.url}</a>
          <Typography>
            News score: {dialogData.data.score.toFixed(3)}
          </Typography>
          <Divider />
          <Typography variant="subtitle2">
            Retrieved from: {dialogData.data.retrievedFrom || 'Scraper'}
          </Typography>
          <Typography variant="subtitle2">
            Last updated: {getTimePassedString(new Date(dialogData.data.lastUpdatedMs || 0))}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogData(null)}>Back</Button>
        </DialogActions>
      </>}

    </Dialog>
  </>
};

export default NewsSourceScoreDisplay;