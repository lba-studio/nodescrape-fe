import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardHeader,
  makeStyles,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import useIsMobile from "../utils/useIsMobile";
import TopicService, { TopicSuggestion } from "../services/TopicService";

const useStyles = makeStyles({
  cardMedia: {
    height: 128,
  },
  cardHeader: {
    textAlign: "center",
  },
});

interface TopicSuggestorProps {
  onSuggestion?: (suggestion: TopicSuggestion) => void;
}

function TopicSuggestor(props: TopicSuggestorProps) {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const numberOfItemsToDisplayPerRow = isMobile ? 2 : 3;
  const { onSuggestion } = props;
  const [data, setData] = React.useState<Array<TopicSuggestion> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    TopicService.getSuggestedTopic()
      .then((suggestions) => setData(suggestions))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <Box display="flex" width="100%" flexDirection="column" alignItems="center">
      {data && (
        <>
          <Typography gutterBottom variant="h2" align="center">
            Trending Topics
          </Typography>
          <Grid container spacing={1} justify="center">
            {data.slice(0, numberOfItemsToDisplayPerRow).map((e) => (
              <Grid key={e.topic} item xs={6} sm={4}>
                <Card>
                  <CardActionArea
                    onClick={() => onSuggestion && onSuggestion(e)}
                  >
                    <CardMedia
                      image={e.imgUrl}
                      className={classes.cardMedia}
                      title={e.topic}
                    />
                    <CardHeader
                      className={classes.cardHeader}
                      title={e.topic}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {isLoading && <CircularProgress />}
    </Box>
  );
}

export default TopicSuggestor;
