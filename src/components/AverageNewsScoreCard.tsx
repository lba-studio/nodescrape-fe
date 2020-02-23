import React from 'react';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import { Typography } from '@material-ui/core';
import BasicDataCard from './BasicDataCard';

interface AverageNewsScoreCardProp {
  newsSourceScores: Array<NewsSourceScore>;
}

const AverageNewsScoreCard: React.FC<AverageNewsScoreCardProp> = (props) => {
  const { newsSourceScores } = props;
  let average: number | undefined = undefined;
  let firstElement = newsSourceScores.pop();
  if (firstElement) {
    average = newsSourceScores.reduce((acc, curr) => (acc + curr.score) / 2, firstElement.score);
  } else {
    return <Typography>Cannot get average score if there are no scores to begin with. Please try again later.</Typography>;
  }
  return (
    <BasicDataCard label="Average news score:" data={average}/>
    || <></>
  );
}

export default AverageNewsScoreCard;