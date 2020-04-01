import React from 'react';
import Chart from 'chart.js';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import _ from 'lodash';
import computeColorHex from '../utils/computeColorHex';
import useIsMobile from '../utils/useIsMobile';
import { Typography } from '@material-ui/core';

interface ScoreChartProps {
  newsSourceScores: Array<NewsSourceScore>;
};

const ScoreChart: React.FC<ScoreChartProps> = function (props) {
  const { newsSourceScores } = props;
  const chartRef = React.useRef<Chart | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  React.useEffect(() => {
    console.debug('isMobile:', isMobile);
    const canvasContext: CanvasRenderingContext2D = _.invoke(canvasRef, 'current.getContext', '2d');
    if (canvasContext) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasContext, {
        type: 'horizontalBar',
        data: {
          labels: newsSourceScores.map(score => score.name),
          datasets: [{
            label: 'Average sentiment score',
            data: newsSourceScores.map(score => score.score),
            backgroundColor: (ctx) => {
              let data = _.get(ctx, `dataset.data[${ctx.dataIndex}]`, 0);
              return computeColorHex(data);
            },
            // barThickness: 22,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            // display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                autoSkip: false,
              },
              // display: !isMobile,
            }],
            xAxes: [{
              ticks: {
                // autoSkip: false,
                beginAtZero: true,
              }
            }]
          }
        },
      });
      console.debug('Rendering chart.', newsSourceScores);
    }
  }, [newsSourceScores, isMobile]);
  console.debug('Rerendering chart!');
  return <>
    <Typography>{isMobile ? 'Click on' : 'Hover over'} the bars for more information!</Typography>
    <div style={{ minHeight: `${newsSourceScores.length * 44 || 44}px` /** I hate this solution... but the height automatically to the smallest height possible on mobile!!! */ }}>
      <canvas
        aria-label="graph for scores"
        role="img"
        ref={canvasRef}
      // height={`${newsSourceScores.length * 22 || 22}px`}
      >
        Score graph goes here. Your browser may not support this functionality.
    </canvas>
    </div>
  </>;
}

export default ScoreChart;