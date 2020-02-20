import axios from 'axios';
import { backendUrl, shouldMock } from '../config/constants';
import newsScoresMock from '../mocks/newsScoresMock';
import mockAsync from '../utils/mockAsync';

const axiosInstance = axios.create({ baseURL: backendUrl });

export interface NewsSourceScore {
  score: number;
  id: string;
  url: string;
  retrievedFrom?: string;
  name: string;
  lastUpdatedMs: number;
  country: string;
};

export default {
  getNewsScores: async (): Promise<Array<NewsSourceScore>> => {
    if (shouldMock) {
      return mockAsync(newsScoresMock, 0);
    }
    return axiosInstance.get('/news-scores').then(res => res.data);
  }
};