import { NewsSourceScore } from "../services/NewsSourceScoreService";
import React from "react";
import BasicDataCard from "./BasicDataCard";

interface MedianNewsScoreCardProp {
  newsSourceScores: Array<NewsSourceScore>;
}

const MedianNewsScoreCard: React.FC<MedianNewsScoreCardProp> = (props) => {
  const { newsSourceScores } = props;
  let data;
  let extraDataLabel;
  if (!newsSourceScores.length) {
    console.error('Cannot get median: An empty array (or undefined) is passed in.', newsSourceScores);
  } else {
    let medianNewsSource = newsSourceScores[Math.floor(newsSourceScores.length / 2)];
    data = medianNewsSource.score;
    extraDataLabel = medianNewsSource.name
  }
  return <BasicDataCard label="Median news score:" data={data} extraDataLabel={extraDataLabel} />
}

export default MedianNewsScoreCard;