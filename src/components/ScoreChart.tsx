import React from 'react';
import Chart from 'chart.js';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import _ from 'lodash';
import computeColorHex from '../utils/computeColorHex';

interface ScoreChartProps {
  newsSourceScores: Array<NewsSourceScore>;
};

const ScoreChart: React.FC<ScoreChartProps> = function (props) {
  const { newsSourceScores } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  console.dir(canvasRef);
  // console.dir((canvasRef.current as HTMLCanvasElement).getContext('2d'));
  React.useEffect(() => {
    const canvasContext = _.invoke(canvasRef, 'current.getContext', '2d');
    console.dir(canvasContext);
    if (canvasContext) {
      const chart = new Chart(canvasContext, {
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
          }],
        },
        options: {
          // maintainAspectRatio: true,
          legend: {
            display: false,
          },
        },
      });
      console.log('Chart made!');
    }
  }, [newsSourceScores]);

  return <>
    Chart is here!
    <canvas aria-label="graph for scores" role="img" ref={canvasRef}>Score graph</canvas>
  </>;
}

export default ScoreChart;