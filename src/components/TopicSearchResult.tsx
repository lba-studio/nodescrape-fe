import React from 'react';
import { GetTopicResult } from '../services/TopicService';
import { Typography, Card, CardHeader, Grid, CardContent, makeStyles, CardMedia } from '@material-ui/core';
import PageSection from './PageSection';

interface TopicSearchResultProps {
  getTopicResult: GetTopicResult;
}

const useStyles = makeStyles(theme => ({
  newsArticleCard: {
    height: '100%',
    width: '100%',
    textAlign: 'left',
  },
  newsArticleCardContainer: {
    padding: theme.spacing(2),
  },
  media: {
    height: '128px',
  }
}));

const TopicSearchResult: React.FC<TopicSearchResultProps> = (props) => {
  const { getTopicResult } = props;
  const classes = useStyles();
  if (getTopicResult.score === null) {
    return <>
      <Typography variant="h2">Cannot find news articles</Typography>
      <Typography>Please try another topic.</Typography>
    </>
  }
  return <>
    <PageSection>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">Result</Typography>
          <Typography variant="h2">{getTopicResult.score.toFixed(4)}</Typography>
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
            .map(article => (
              <Grid item xs={12} sm={6} md={3} className={classes.newsArticleCardContainer}>
                <Card className={classes.newsArticleCard}>
                  <CardMedia
                    className={classes.media}
                    image={article.imageUrl}
                    title={article.title}
                  />
                  <CardHeader title={article.title} />
                  <CardContent>
                    {article.content}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </PageSection>
  </>;
}

export default TopicSearchResult;