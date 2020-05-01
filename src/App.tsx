import React from 'react';
import './App.css';
import { MuiThemeProvider, Theme, createStyles, withStyles, WithStyles, Divider } from '@material-ui/core';
import { appTheme } from './styles';
import Footer from './components/Footer';
import Header from './components/Header';
import { Router, Route, Switch } from 'react-router-dom';
import Routing from './utils/Routing';
import NewsSourceScoresPage from './pages/NewsSourceScoresPage';
import NotFoundPage from './pages/NotFoundPage';
import ContributePage from './pages/ContributePage';
import FeedbackPage from './pages/FeedbackPage';
import TopicPage from './pages/TopicPage';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
  },
  contentRoot: {
    margin: theme.spacing(4),
  }
});


const App: React.FC<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={appTheme}>
      <div className={classes.root}>
        <Header />
        <div className={classes.contentRoot}>
          <FeedbackPage />
          <Divider />
          <Router history={Routing.history}>
            <Switch>
              <Route exact path={['/']} component={NewsSourceScoresPage} />
              <Route exact path={['/about']} component={ContributePage} />
              <Route exact path={['/topics']} component={TopicPage} />
              {/* <Route exact path={['/feedback']} component={FeedbackPage}/> */}
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
