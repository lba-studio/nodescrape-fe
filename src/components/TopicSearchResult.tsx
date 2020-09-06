import React from "react";
import { GetTopicResult } from "../services/TopicService";
import {
  Typography,
  Card,
  CardHeader,
  Grid,
  CardContent,
  makeStyles,
  CardMedia,
  Box,
  Tooltip,
  CardActionArea,
} from "@material-ui/core";
import PageSection from "./PageSection";
import InfoIcon from "@material-ui/icons/Info";
import { getSentimentScoreLikertValue } from "../utils/sentimentScoreUtil";
import computeColorHex from "../utils/computeColorHex";
import SentimentIcon from "./SentimentIcon";

interface TopicSearchResultProps {
  getTopicResult: GetTopicResult;
}

const useStyles = makeStyles((theme) => ({
  newsArticleCard: {
    height: "100%",
    width: "100%",
    textAlign: "left",
  },
  media: {
    height: "128px",
  },
  infoIcon: {
    marginLeft: theme.spacing(1),
  },
  sentimentIcon: {
    fontSize: "5rem",
    textAlign: "center",
  },
  dataCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  newsArticleCounter: {
    fontSize: "7rem",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1,
  },
}));

const TopicSearchResult: React.FC<TopicSearchResultProps> = (props) => {
  const { getTopicResult } = props;
  const classes = useStyles();
  if (getTopicResult.score === null) {
    return (
      <>
        <Typography variant="h2" align="center">
          Cannot find news articles
        </Typography>
        <Typography align="center">Please try another topic.</Typography>
      </>
    );
  }
  const sentimentScoreLikertValue = getSentimentScoreLikertValue(
    getTopicResult.score
  );
  return (
    <>
      <PageSection>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className={classes.dataCard}>
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <SentimentIcon
                  score={getTopicResult.score}
                  htmlColor={computeColorHex(getTopicResult.score)}
                />
                <Typography
                  variant="h3"
                  align="center"
                  style={{ color: computeColorHex(getTopicResult.score) }}
                >
                  {sentimentScoreLikertValue} ({getTopicResult.score.toFixed(2)}
                  )
                </Typography>
              </Box>

              <Tooltip
                title="The average sentiment score of the articles of this topic, with scores closer to 1 indicating that the article is positive, and scores closer to -1 indicating that the article is negative."
                arrow
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h4" align="center">
                    Sentiment Score
                  </Typography>
                  <InfoIcon className={classes.infoIcon} />
                </Box>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.dataCard}>
              <Typography className={classes.newsArticleCounter}>
                {getTopicResult.newsArticlesAnalyzed}
              </Typography>
              <Typography variant="h4" align="center">
                News articles analyzed
              </Typography>
            </div>
          </Grid>
        </Grid>
      </PageSection>
      <PageSection fullWidth>
        <Grid item container xs={12} justify="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center">
              Sample news articles
            </Typography>
          </Grid>
          {getTopicResult.sampleAnalyzedArticles.slice(0, 4).map((article) => (
            <Grid item xs={12} sm={6} md={3}>
              <CardActionArea
                className={classes.newsArticleCard}
                onClick={() => window.open(article.url, "_blank")}
              >
                <Card className={classes.newsArticleCard}>
                  <CardMedia
                    className={classes.media}
                    image={article.imageUrl}
                    title={article.title}
                  />
                  <CardHeader
                    title={article.title}
                    subheader={article.sourceName}
                  />
                  <CardContent>
                    <Typography>{article.content}</Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </PageSection>
    </>
  );
};

export default TopicSearchResult;
