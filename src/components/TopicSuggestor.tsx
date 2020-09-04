import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import useIsMobile from "../utils/useIsMobile";

interface TopicSuggestion {
  topic: string;
  imgUrl: string;
}

const data: Array<TopicSuggestion> = [
  {
    topic: "Coronavirus",
    imgUrl:
      "https://www.nationalgeographic.com/content/dam/science/2020/03/13/coronavirus_og/01_coronavirus_cdc_2871.adapt.1900.1.jpg",
  },
  {
    topic: "Joe Biden",
    imgUrl:
      "https://static.politico.com/dims4/default/22f65e1/2147483647/resize/1160x%3E/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fb9%2Fc3%2F54a99abc4bd5832dea2d4cb25ffb%2Fgettyimages-1256156642-773.jpg",
  },
  {
    topic: "Donald Trump",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg",
  },
];

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
  return (
    <>
      <Typography gutterBottom variant="h2" align="center">
        Trending Topics
      </Typography>
      <Grid container spacing={1} justify="center">
        {data.slice(0, numberOfItemsToDisplayPerRow).map((e) => (
          <Grid key={e.topic} item xs={6} sm={4}>
            <Card>
              <CardActionArea onClick={() => onSuggestion && onSuggestion(e)}>
                <CardMedia
                  image={e.imgUrl}
                  className={classes.cardMedia}
                  title={e.topic}
                />
                <CardHeader className={classes.cardHeader} title={e.topic} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default TopicSuggestor;
