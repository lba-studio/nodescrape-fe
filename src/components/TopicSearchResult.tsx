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

interface TopicSearchResultProps {
  getTopicResult: GetTopicResult;
}

const useStyles = makeStyles((theme) => ({
  newsArticleCard: {
    height: "100%",
    width: "100%",
    textAlign: "left",
  },
  newsArticleCardContainer: {
    padding: theme.spacing(2),
  },
  media: {
    height: "128px",
  },
  infoIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const TopicSearchResult: React.FC<TopicSearchResultProps> = (props) => {
  const { getTopicResult } = props;
  const classes = useStyles();
  if (getTopicResult.score === null) {
    return (
      <>
        <Typography variant="h2">Cannot find news articles</Typography>
        <Typography>Please try another topic.</Typography>
      </>
    );
  }
  return (
    <>
      <PageSection>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
                <Typography variant="h3">Sentiment Score</Typography>
                <InfoIcon className={classes.infoIcon} />
              </Box>
            </Tooltip>
            <Typography variant="h2">
              {getTopicResult.score.toFixed(4)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">News articles analyzed</Typography>
            <Typography variant="h2">
              {getTopicResult.newsArticlesAnalyzed}
            </Typography>
          </Grid>
          <Grid item container xs={12} justify="center">
            <Grid item xs={12}>
              <Typography variant="h3">Sample news articles</Typography>
            </Grid>
            {getTopicResult.sampleAnalyzedArticles
              .slice(0, 4)
              .map((article) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className={classes.newsArticleCardContainer}
                >
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
        </Grid>
      </PageSection>
    </>
  );
};

export default TopicSearchResult;
