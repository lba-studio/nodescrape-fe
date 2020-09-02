import React from "react";
import Chart from "chart.js";
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import _ from "lodash";
import computeColorHex from "../utils/computeColorHex";
import useIsMobile from "../utils/useIsMobile";
import { Typography, useTheme } from "@material-ui/core";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Align, Anchor } from "chartjs-plugin-datalabels/types/options";

interface ScoreChartProps {
  newsSourceScores: Array<NewsSourceScore>;
}

function getDataFromCtx(ctx: Parameters<Chart.Scriptable<any>>[0]): number {
  return _.get(ctx, `dataset.data[${ctx.dataIndex}]`, 0);
}

function getAlignAnchor(ctx: Parameters<Chart.Scriptable<Align | Anchor>>[0]) {
  return getDataFromCtx(ctx) > 0 ? "start" : "end";
}

const ScoreChart: React.FC<ScoreChartProps> = function (props) {
  const { newsSourceScores } = props;
  const chartRef = React.useRef<Chart | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const theme = useTheme();
  React.useEffect(() => {
    console.debug("isMobile:", isMobile);
    const canvasContext: CanvasRenderingContext2D = _.invoke(
      canvasRef,
      "current.getContext",
      "2d"
    );
    if (canvasContext) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasContext, {
        plugins: [ChartDataLabels],
        type: "horizontalBar",
        data: {
          labels: newsSourceScores.map((score) => score.name),
          datasets: [
            {
              label: "Average sentiment score",
              data: newsSourceScores.map((score) =>
                Number(score.score.toFixed(3))
              ),
              backgroundColor: (ctx) => computeColorHex(getDataFromCtx(ctx)),
              datalabels: {
                formatter: (value, context) => {
                  return `${newsSourceScores[context.dataIndex].name} ${value}`;
                },
                color: "white",
                // backgroundColor: 'white',
                align: getAlignAnchor,
                anchor: getAlignAnchor,
                font: {
                  family: theme.typography.fontFamily,
                },
              },
            },
          ],
        },
        options: {
          layout: {
            // padding: 0,
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: false,
                },
                display: false,
              },
            ],
            xAxes: [
              {
                ticks: {
                  // autoSkip: false,
                  beginAtZero: true,
                  suggestedMin: -0.2,
                  suggestedMax: 0.2,
                },
              },
            ],
          },
        },
      });
      console.debug("Rendering chart.", newsSourceScores);
    }
  }, [newsSourceScores, isMobile, theme]);
  console.debug("Rerendering chart!");
  return (
    <>
      <Typography align="center">
        {isMobile ? "Click on" : "Hover over"} the bars for more information!
      </Typography>
      <div
        style={{
          minHeight: `${
            newsSourceScores.length * 44 || 44
          }px` /** I hate this solution... but the height automatically to the smallest height possible on mobile!!! */,
        }}
      >
        <canvas
          aria-label="graph for scores"
          role="img"
          ref={canvasRef}
          // height={`${newsSourceScores.length * 22 || 22}px`}
        >
          Score graph goes here. Your browser may not support this
          functionality.
        </canvas>
      </div>
    </>
  );
};

export default ScoreChart;
