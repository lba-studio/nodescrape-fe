import React from "react";
import {
  TextField,
  makeStyles,
  Typography,
  Button,
  LinearProgress,
  Box,
  Collapse,
} from "@material-ui/core";
import PageSection from "../components/PageSection";
import TopicService, { GetTopicResult } from "../services/TopicService";
import parseError from "../utils/parseError";
import TopicSearchResult from "../components/TopicSearchResult";
import ImageContainer from "../components/ImageContainer";
import PencilIcon from "../assets/pencil-alt-solid.svg";
import TopicSuggestor from "../components/TopicSuggestor";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  topicSearchField: {
    flex: "1 1 100%",
  },
  topicSearchFormElement: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: "auto",
    marginBottom: "auto",
    transition: "width 0.5s",
  },
  topicSearchFormContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    marginLeft: -theme.spacing(1),
    marginRight: -theme.spacing(1),
  },
  noDisplay: {
    width: 0,
    overflow: "hidden",
  },
}));

const TopicPage: React.FC = () => {
  const [topic, setTopic] = React.useState("");
  const [data, setData] = React.useState<GetTopicResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [displaySuggestions, setDisplaySuggestions] = React.useState(true);
  const classes = useStyles();
  function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadData();
  }
  function loadData() {
    setIsLoading(true);
    setError(null);
    setDisplaySuggestions(false);
    TopicService.searchTopic(topic)
      .then((res) => setData(res))
      .catch((e) => setError(parseError(e)))
      .finally(() => setIsLoading(false));
  }
  return (
    <>
      <PageSection>
        <Box display="flex" justifyContent="center" alignItems="center">
          <ImageContainer
            src={PencilIcon}
            variant="logo"
            alt="Logo"
            aria-label="logo"
          />
          <Typography variant="h1">Topics</Typography>
        </Box>
        <Typography variant="subtitle1" align="center">
          How negative are your everyday topics?
        </Typography>
      </PageSection>
      <PageSection>
        <form onSubmit={onSearch} className={classes.topicSearchFormContainer}>
          <TextField
            id="search-topic-query"
            label="Search for a topic"
            margin="normal"
            name="searchTopicQuery"
            fullWidth
            value={topic}
            onChange={(event) => setTopic(event.target.value as string)}
            variant="outlined"
            className={clsx(
              classes.topicSearchField,
              classes.topicSearchFormElement
            )}
            required
          />
          <Button
            className={classes.topicSearchFormElement}
            variant="contained"
            color="primary"
            type="submit"
          >
            Search
          </Button>
        </form>
      </PageSection>
      <Collapse in={displaySuggestions}>
        <PageSection>
          <TopicSuggestor
            onSuggestion={(suggestion) => {
              setTopic(`"${suggestion.topic}"`);
              loadData();
            }}
          />
        </PageSection>
      </Collapse>
      <Collapse in={!displaySuggestions}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDisplaySuggestions(true)}
          >
            Suggestions
          </Button>
        </Box>
      </Collapse>
      {isLoading && (
        <PageSection>
          <LinearProgress />
        </PageSection>
      )}
      {error && error}
      {data && <TopicSearchResult getTopicResult={data} />}
    </>
  );
};

export default TopicPage;
