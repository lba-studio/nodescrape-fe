import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, useTheme, Tooltip } from '@material-ui/core';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import computeColorHex from '../utils/computeColorHex';

interface NewsSourceScoreDisplayProps {
  newsSourceScores: Array<NewsSourceScore>
}

const NewsSourceScoreDisplay: React.FC<NewsSourceScoreDisplayProps> = (props) => {
  const { newsSourceScores } = props;
  const theme = useTheme();
  return <TableContainer>
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
              style={{
                backgroundColor: colorHex,
              }}
            >
              <TableCell style={{ color: textColorHex }}>{index + 1}</TableCell>
              <TableCell style={{ color: textColorHex }}>{newsSourceScore.name}</TableCell>
              <TableCell style={{ color: textColorHex }}>{newsSourceScore.score.toFixed(4)}</TableCell>
            </TableRow>
          })}
      </TableBody>
    </Table>
  </TableContainer>
};

export default NewsSourceScoreDisplay;