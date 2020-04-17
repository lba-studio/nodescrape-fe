import React from 'react';
import './App.css';
import { MuiThemeProvider, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { appTheme } from './styles';
import Footer from './components/Footer';
import Header from './components/Header';
import { Router, Route, Switch } from 'react-router-dom';
import Routing from './utils/Routing';
import NewsSourceScoresPage from './pages/NewsSourceScoresPage';
import NotFoundPage from './pages/NotFoundPage';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
  },
  contentRoot: {
    margin: theme.spacing(2),
  }
});


const App: React.FC<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={appTheme}>
      <div className={classes.root}>
        <Header />
        <div className={classes.contentRoot}>
          <Router history={Routing.history}>
            <Switch>
              <Route exact path={['/']} component={NewsSourceScoresPage} />
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
