import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography, MuiThemeProvider, Theme, createStyles, Button, withStyles, WithStyles, Box, Link } from '@material-ui/core';
import { appTheme } from './styles';
import NewsSourceScoreService, { NewsSourceScore } from './services/NewsSourceScoreService';
import NewsScoreCard from './components/NewsScoreCard';
import AverageNewsScoreCard from './components/AverageNewsScoreCard';
import PageSection from './components/PageSection';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    margin: theme.spacing(4),
  }
});



const App: React.FC<WithStyles<typeof styles>> = (props) => {
  const [newsSourceScores, setNewsSourceScores] = React.useState<Array<NewsSourceScore>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<any | undefined>(undefined);
  useEffect(() => {
    setIsLoading(true);
    NewsSourceScoreService.getNewsScores()
      .then(res => setNewsSourceScores(res.sort((a, b) => b.score - a.score)))
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  }, []);
  React.useEffect(() => console.error(error), [error]);
  const { classes } = props;
  return (
    <MuiThemeProvider theme={appTheme}>
      <div className={classes.root}>
        <PageSection>
          <Typography variant="h1">News Neutrality Scraper</Typography>
          <Typography variant="subtitle1">How positive/negative is your news source?</Typography>
          <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
            <Button color="primary" variant="contained">How does this work?</Button>
          </Box>
        </PageSection>
        <PageSection>
          {isLoading && <Typography>Loading data...</Typography>}
          {error && <Typography color="error">An error has occurred. Please try again later.</Typography>}
        </PageSection>
        <PageSection>
          <Typography variant="h2">Interesting tidbits</Typography>
          <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
            <AverageNewsScoreCard newsSourceScores={newsSourceScores} />
          </Box>
        </PageSection>
        <PageSection>
          <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
            {newsSourceScores
              .map((newsSourceScore, index) =>
                <NewsScoreCard newsSourceScore={newsSourceScore} position={index + 1} />)}
          </Box>
        </PageSection>
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
