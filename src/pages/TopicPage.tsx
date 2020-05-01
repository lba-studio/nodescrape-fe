import React from 'react';
import { TextField, makeStyles, Grid, Box, Typography, Button, LinearProgress } from '@material-ui/core';
import PageSection from '../components/PageSection';
import TopicService, { GetTopicResult } from '../services/TopicService';
import parseError from '../utils/parseError';
import TopicSearchResult from '../components/TopicSearchResult';

const useStyles = makeStyles(theme => ({
  topicSearchField: {
    width: '100%',
  },
  topicSearchFormElement: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  topicSearchFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    }
  }
}));

const TopicPage: React.FC = () => {
  const [topic, setTopic] = React.useState('');
  const [data, setData] = React.useState<GetTopicResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const classes = useStyles();
  function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadData();
  }
  function loadData() {
    setIsLoading(true);
    setError(null);
    TopicService.searchTopic(topic)
      .then(res => setData(res))
      .catch(e => setError(parseError(e)))
      .finally(() => setIsLoading(false));
  }
  // React.useEffect(loadData, []);
  return <>
    <PageSection>
      <Typography variant="h1">Topic Sentiment Viewer</Typography>
      <Typography variant="subtitle1">How negative are your everyday topics?</Typography>
    </PageSection>
    <form onSubmit={onSearch} className={classes.topicSearchFormContainer}>
        <TextField
          id="search-topic-query"
          label="Search for a topic"
          helperText="(e.g. you can search for Donald Trump or Coronavirus)"
          margin="normal"
          name="searchTopicQuery"
          fullWidth
          value={topic}
          onChange={(event) => setTopic(event.target.value as string)}
          variant="outlined"
          className={classes.topicSearchField}
          required
        />
        <div className={classes.topicSearchFormElement}>
          <Button variant="contained" color="primary" type="submit">Search</Button>
        </div>
    </form>
    {isLoading && <LinearProgress />}
    {error && error}
    {data && <TopicSearchResult getTopicResult={data} />}
    
  </>;
};

export default TopicPage;