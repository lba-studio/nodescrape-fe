import { NewsSourceScore } from "../services/NewsSourceScoreService";
import React from "react";
import BasicDataCard from "./BasicDataCard";

interface MedianNewsScoreCardProp {
  newsSourceScores: Array<NewsSourceScore>;
}

const MedianNewsScoreCard: React.FC<MedianNewsScoreCardProp> = (props) => {
  const { newsSourceScores } = props;
  if (!newsSourceScores.length) {
    console.error(newsSourceScores);
    throw new Error('Cannot get median: An empty array (or undefined) is passed in.');
  }
  let medianNewsSource = newsSourceScores[Math.floor(newsSourceScores.length / 2)];
  return <BasicDataCard label="Median news score:" data={medianNewsSource.score} extraDataLabel={medianNewsSource.name} />
}

export default MedianNewsScoreCard;