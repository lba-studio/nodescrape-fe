import React from "react";
import "./App.css";
import {
  MuiThemeProvider,
  makeStyles,
  CssBaseline,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { appTheme } from "./styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Router, Route, Switch } from "react-router-dom";
import Routing from "./utils/Routing";
import loadable from "@loadable/component";
import HomePage from "./pages/HomePage";
import "url-search-params-polyfill";

const defaultLoadableConfig = {
  fallback: (
    <Box display="flex" justifyContent="center" width="100%">
      <CircularProgress />
    </Box>
  ),
};
const NewsSourceScoresPage = loadable(
  () => import("./pages/NewsSourceScoresPage"),
  defaultLoadableConfig
);
const ContributePage = loadable(
  () => import("./pages/ContributePage"),
  defaultLoadableConfig
);
const TopicPage = loadable(
  () => import("./pages/TopicPage"),
  defaultLoadableConfig
);
const NotFoundPage = loadable(
  () => import("./pages/NotFoundPage"),
  defaultLoadableConfig
);
const WelcomeDialog = loadable(() =>
  import("./components/dialogs/WelcomeDialog")
);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  contentRoot: {
    marginTop: theme.spacing(2),
    flex: "1 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={appTheme}>
      <Router history={Routing.history}>
        <CssBaseline />
        <div className={classes.root}>
          <WelcomeDialog />
          <Box flex="0 0">
            <Header />
          </Box>
          <div className={classes.contentRoot}>
            <Switch>
              <Route
                exact
                path={["/sources"]}
                component={NewsSourceScoresPage}
              />
              <Route exact path={["/about"]} component={ContributePage} />
              <Route exact path={["/topics"]} component={TopicPage} />
              <Route exact path={["/"]} component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <Box flex="0 0">
            <Footer />
          </Box>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
