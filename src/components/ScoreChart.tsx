import React from "react";
import Chart from "chart.js";
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import _ from "lodash";
import computeColorHex from "../utils/computeColorHex";
import useIsMobile from "../utils/useIsMobile";
import { Typography } from "@material-ui/core";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Align, Anchor } from "chartjs-plugin-datalabels/types/options";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  Legend,
  Cell,
  CartesianGrid,
  YAxis,
  LabelList,
  Label,
  LabelProps,
  Text,
} from "recharts";

interface ScoreChartProps {
  newsSourceScores: Array<NewsSourceScore>;
}

function getDataFromCtx(ctx: Parameters<Chart.Scriptable<any>>[0]): number {
  return _.get(ctx, `dataset.data[${ctx.dataIndex}]`, 0);
}

function getAlignAnchor(ctx: Parameters<Chart.Scriptable<Align | Anchor>>[0]) {
  return getDataFromCtx(ctx) > 0 ? "start" : "end";
}

function mapToLabel(e: NewsSourceScore) {
  return {
    value: e.name,
    payload: e,
  };
}

function CustomLabel(props: LabelProps) {
  const { x, y, stroke, value, height = 0, offset = 0 } = props;
  console.log(props);
  if (value! > 0) {
    return (
      <Text
        x={x! - offset}
        y={y! + height / 2}
        textAnchor="end"
        stroke="white"
        verticalAnchor="middle"
      >
        {Number(value).toFixed(2)}
      </Text>
    );
  } else {
    return (
      <Text
        x={x! + offset}
        y={y! + height / 2}
        textAnchor="start"
        stroke="white"
        verticalAnchor="middle"
      >
        {Number(value).toFixed(2)}
      </Text>
    );
  }
}

const ScoreChart: React.FC<ScoreChartProps> = function (props) {
  const { newsSourceScores } = props;
  const isMobile = useIsMobile();
  const positiveNewsSourceScoresLabelData = React.useMemo(
    () => newsSourceScores.filter((e) => e.score >= 0).map(mapToLabel),
    [newsSourceScores]
  );
  const negativeNewsSourceScoresLabelData = React.useMemo(
    () => newsSourceScores.filter((e) => e.score < 0).map(mapToLabel),
    [newsSourceScores]
  );

  return (
    <>
      <ResponsiveContainer width="100%" height={newsSourceScores.length * 44}>
        <BarChart layout="vertical" data={newsSourceScores} maxBarSize={22}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <Bar dataKey="score" label={CustomLabel}>
            {newsSourceScores.map((e, index) => (
              <Cell key={index} fill={computeColorHex(e.score)} />
            ))}
            {/* {newsSourceScores.map((e, index) => (
              <Label key={index} value={e.name} position="insideRight" />
            ))} */}
            {/* <LabelList dataKey="name" position="left" /> */}
          </Bar>
          <XAxis type="number" />
          <YAxis hide type="category" dataKey="name" />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ScoreChart;
