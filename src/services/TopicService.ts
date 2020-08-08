import axios from "axios";
import { backendUrl, shouldMock } from "../config/constants";
import getTopicScoreMock from "../mocks/getTopicScoreMock";
import { OnlineNewsArticle } from "../typedefs";

export type GetTopicResult = {
  score: number | null;
  newsArticlesAnalyzed: number;
  sampleAnalyzedArticles: Array<OnlineNewsArticle>;
};

async function searchTopic(topic: string): Promise<GetTopicResult> {
  if (shouldMock) {
    return Promise.resolve(getTopicScoreMock);
  }
  return axios
    .post(backendUrl + "/topic-search", {
      topic: topic,
    })
    .then((res) => res.data);
}

export default {
  searchTopic,
};
