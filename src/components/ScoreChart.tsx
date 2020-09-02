import React from "react";
import Chart from "chart.js";
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import _ from "lodash";
import computeColorHex from "../utils/computeColorHex";
import useIsMobile from "../utils/useIsMobile";
import {
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  Box,
  Avatar,
  DialogContent,
  Link,
  Divider,
  DialogActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Align, Anchor } from "chartjs-plugin-datalabels/types/options";
import getTimePassedString from "../utils/getTimePassedString";

interface ScoreChartProps {
  newsSourceScores: Array<NewsSourceScore>;
}

function getDataFromCtx(ctx: Parameters<Chart.Scriptable<any>>[0]): number {
  return _.get(ctx, `dataset.data[${ctx.dataIndex}]`, 0);
}

function getAlignAnchor(ctx: Parameters<Chart.Scriptable<Align | Anchor>>[0]) {
  return getDataFromCtx(ctx) > 0 ? "start" : "end";
}

interface NewsSourceScoreDialogData {
  data: NewsSourceScore;
  position: number;
  colorHex: string;
  textColorHex: string;
}

const useStyles = makeStyles((theme) => ({
  dialogTitleAvatar: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: theme.spacing(1),
  },
}));

const ScoreChart: React.FC<ScoreChartProps> = function (props) {
  const { newsSourceScores } = props;
  const chartRef = React.useRef<Chart | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const theme = useTheme();
  const classes = useStyles();
  const onBarClick = React.useCallback(
    (event, chartElement) => {
      const elementIndex = chartElement[0]._index;
      const newsSourceScore = newsSourceScores[elementIndex];
      const colorHex = computeColorHex(newsSourceScore.score);
      setDialogData({
        data: newsSourceScore,
        position: elementIndex + 1,
        colorHex: colorHex,
        textColorHex: theme.palette.getContrastText(colorHex),
      });
    },
    [newsSourceScores, theme]
  );
  const [
    dialogData,
    setDialogData,
  ] = React.useState<NewsSourceScoreDialogData | null>(null);
  React.useEffect(() => {
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
          onClick: onBarClick,
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
                  beginAtZero: true,
                  suggestedMin: -0.2,
                  suggestedMax: 0.2,
                },
              },
            ],
          },
        },
      });
    }
  }, [newsSourceScores, isMobile, theme, onBarClick]);
  return (
    <>
      <Typography align="center">
        Click on the bars for more information!
      </Typography>
      <div
        style={{
          minHeight: `${
            newsSourceScores.length * 44 || 44
          }px` /** I hate this solution... but the height automatically to the smallest height possible on mobile!!! */,
        }}
      >
        <canvas aria-label="graph for scores" role="img" ref={canvasRef}>
          Score graph goes here. Your browser may not support this
          functionality.
        </canvas>
      </div>
      <Dialog onClose={() => setDialogData(null)} open={dialogData !== null}>
        {dialogData && (
          <>
            <DialogTitle>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar
                  className={classes.dialogTitleAvatar}
                  style={{
                    backgroundColor: dialogData.colorHex,
                    color: dialogData.textColorHex,
                  }}
                >
                  {dialogData.position}
                </Avatar>
                <div>{dialogData.data.name}</div>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Link
                href={dialogData.data.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dialogData.data.url}
              </Link>
              <Typography>
                News score: {dialogData.data.score.toFixed(3)}
              </Typography>
              <Divider />
              <Typography variant="subtitle2">
                Retrieved from: {dialogData.data.retrievedFrom || "Scraper"}
              </Typography>
              <Typography variant="subtitle2">
                Last updated:{" "}
                {getTimePassedString(
                  new Date(dialogData.data.lastUpdatedMs || 0)
                )}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogData(null)}>Back</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ScoreChart;
