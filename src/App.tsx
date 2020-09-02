import React from "react";
import "./App.css";
import {
  MuiThemeProvider,
  makeStyles,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";
import { appTheme } from "./styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Routing from "./utils/Routing";
import loadable from "@loadable/component";

const defaultLoadableConfig = {
  fallback: <CircularProgress />,
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
  contentRoot: {
    padding: theme.spacing(4),
    minHeight: "100%",
  },
}));

function ContentRoot() {
  const classes = useStyles();
  return (
    <div className={classes.contentRoot}>
      <WelcomeDialog />
      <Router history={Routing.history}>
        <Switch>
          <Route exact path={["/sources"]} component={NewsSourceScoresPage} />
          <Route exact path={["/about"]} component={ContributePage} />
          <Route exact path={["/topics"]} component={TopicPage} />
          <Route exact path={["/"]}>
            <Redirect to="/topics" />
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <ContentRoot />
    </MuiThemeProvider>
  );
};

export default App;
