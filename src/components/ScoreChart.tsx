import React from 'react';
import Chart from 'chart.js';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import _ from 'lodash';
import computeColorHex from '../utils/computeColorHex';
import { useMediaQuery, useTheme } from '@material-ui/core';

interface ScoreChartProps {
  newsSourceScores: Array<NewsSourceScore>;
};

const ScoreChart: React.FC<ScoreChartProps> = function (props) {
  const { newsSourceScores } = props;
  const chartRef = React.useRef<Chart| undefined>(undefined);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
            label: '',
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
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                autoSkip: false,
              },
              display: !isMobile,
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
      console.debug('Rendering chart.');
    }
  }, [newsSourceScores, isMobile]);

  return <>
    <canvas
      aria-label="graph for scores"
      role="img"
      ref={canvasRef}
      style={{ minHeight: `${newsSourceScores.length * 22 || 0}px` /** I hate this solution... but the height automatically to the smallest height possible on mobile!!! */ }}>
      Score graph goes here. Your browser may not support this functionality.
      </canvas>
  </>;
}

export default ScoreChart;