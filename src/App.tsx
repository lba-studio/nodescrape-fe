import React from 'react';
import './App.css';
import { Typography, MuiThemeProvider, Theme, createStyles, withStyles, WithStyles, Box, LinearProgress, Divider } from '@material-ui/core';
import { appTheme } from './styles';
import NewsSourceScoreService, { NewsSourceScore } from './services/NewsSourceScoreService';
import NewsScoreCard from './components/NewsScoreCard';
import AverageNewsScoreCard from './components/AverageNewsScoreCard';
import PageSection from './components/PageSection';
import Footer from './components/Footer';
import Explanation from './components/Explanation';
import MedianNewsScoreCard from './components/MedianNewsScoreCard';
import MagGlassIcon from './assets/magnifying_glass_icon.svg';
import AnalyticService from './services/AnalyticService';
import ScoreChart from './components/ScoreChart';
import FilterBox, { Filters } from './components/FilterBox';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    margin: theme.spacing(4),
  },
  dataCard: {
    margin: theme.spacing(2),
  },
  logo: {
    maxWidth: '128px',
    maxHeight: '128px',
  },
  filter: {
    flexBasis: '128px',
  },
});


const App: React.FC<WithStyles<typeof styles>> = (props) => {
  const [newsSourceScores, setNewsSourceScores] = React.useState<Array<NewsSourceScore> | null>(null);
  const [displayedScores, setDisplayedScores] = React.useState<Array<NewsSourceScore> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<any | null>(null);
  const [filters, setFilters] = React.useState<Filters>({
    country: '',
    name: '',
  }); 
  React.useEffect(() => {
    AnalyticService.initialize();
    setIsLoading(true);
    NewsSourceScoreService.getNewsScores()
      .then(res => {
        if (res.length === 0) {
          throw new Error('Unable to retrieve any score data. Please try again later.')
        }
        setNewsSourceScores(res.sort((a, b) => b.score - a.score));
      })
      .catch(e => {
        console.error(e);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }, []);
  React.useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (newsSourceScores) {
      let scoresToDisplay = newsSourceScores;
      if (filters.country) {
        scoresToDisplay = scoresToDisplay.filter(score => score.country === filters.country);
      }
      if (filters.name) {
        scoresToDisplay = scoresToDisplay.filter(score => score.name.toLowerCase().includes(filters.name.toLowerCase()));
      }
      setDisplayedScores(scoresToDisplay);
    }
  }, [newsSourceScores, filters]);
  const { classes } = props;
  return (
    <MuiThemeProvider theme={appTheme}>
      <div className={classes.root}>
        <PageSection>
          <img className={classes.logo} src={MagGlassIcon} alt="Logo" aria-label="logo" />
          <Typography variant="h1">News Neutrality Watcher</Typography>
          <Typography variant="subtitle1">How positive/negative is your news source?</Typography>
          <Explanation />
        </PageSection>
        <PageSection>
          {isLoading && <LinearProgress />}
          {error && <Typography color="error">An error has occurred. Please try again later.</Typography>}
        </PageSection>
        {newsSourceScores && displayedScores && <>
          <PageSection>
            <FilterBox newsSourceScores={newsSourceScores} onFilterChange={(newFilters) => setFilters(newFilters)} />
          </PageSection>
          <Divider />
          <PageSection>
            <ScoreChart newsSourceScores={displayedScores} />
          </PageSection>
          <PageSection>
            <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
              <div className={classes.dataCard}>
                <AverageNewsScoreCard newsSourceScores={displayedScores} />
              </div>
              <div className={classes.dataCard}>
                <MedianNewsScoreCard newsSourceScores={displayedScores} />
              </div>
            </Box>
          </PageSection>
          <PageSection>
            <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
              {displayedScores
                .map((newsSourceScore, index) =>
                  <NewsScoreCard key={newsSourceScore.id} newsSourceScore={newsSourceScore} position={index + 1} />)}
            </Box>
          </PageSection>
        </>}
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
