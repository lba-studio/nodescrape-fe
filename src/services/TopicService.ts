import axios from "axios";
import { backendUrl, shouldMock } from "../config/constants";
import getTopicScoreMock from "../mocks/getTopicScoreMock";
import { OnlineNewsArticle } from "../typedefs";
import mockAsync from "../utils/mockAsync";
import getSuggestedTopicMock from "../mocks/getSuggestedTopicMock";

export type GetTopicResult = {
  score: number | null;
  newsArticlesAnalyzed: number;
  sampleAnalyzedArticles: Array<OnlineNewsArticle>;
};

export interface TopicSuggestion {
  topic: string;
  imgUrl: string;
}

async function searchTopic(topic: string): Promise<GetTopicResult> {
  if (shouldMock) {
    return mockAsync(getTopicScoreMock);
  }
  return axios
    .post(backendUrl + "/topic-search", {
      topic: topic,
    })
    .then((res) => res.data);
}

async function getSuggestedTopic(): Promise<Array<TopicSuggestion>> {
  if (shouldMock) {
    return mockAsync(getSuggestedTopicMock);
  }
  return axios.get(backendUrl + "/suggested-topics").then((res) => res.data);
}

export default {
  searchTopic,
  getSuggestedTopic,
};
