import BasicDataCard from "./BasicDataCard";
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import React from "react";

interface AverageNewsScoreCardProp {
  newsSourceScores: Array<NewsSourceScore>;
}

const AverageNewsScoreCard: React.FC<AverageNewsScoreCardProp> = (props) => {
  const { newsSourceScores } = props;
  let average: number | undefined;
  const firstElement = newsSourceScores[0];
  if (firstElement) {
    average = newsSourceScores.reduce(
      (acc, curr) => (acc + curr.score) / 2,
      firstElement.score
    );
  }
  return <BasicDataCard label="Average news score:" data={average} />;
};

export default AverageNewsScoreCard;
