import React from "react";
import "./App.css";
import {
  MuiThemeProvider,
  Divider,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import { appTheme } from "./styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Router, Route, Switch } from "react-router-dom";
import Routing from "./utils/Routing";
import NewsSourceScoresPage from "./pages/NewsSourceScoresPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContributePage from "./pages/ContributePage";
import FeedbackPage from "./pages/FeedbackPage";
import TopicPage from "./pages/TopicPage";
import WelcomeDialog from "./components/dialogs/WelcomeDialog";

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    textAlign: "center",
    padding: theme.spacing(4),
    minHeight: "100%",
  },
}));

function ContentRoot() {
  const classes = useStyles();
  return (
    <div className={classes.contentRoot}>
      <FeedbackPage />
      <Divider />
      <WelcomeDialog />
      <Router history={Routing.history}>
        <Switch>
          <Route exact path={["/sources"]} component={NewsSourceScoresPage} />
          <Route exact path={["/about"]} component={ContributePage} />
          <Route exact path={["/", "/topics"]} component={TopicPage} />
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
