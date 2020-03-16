import React from "react";
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@material-ui/core";
import PageSection from "./PageSection";

export default function () {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  function onClose() {
    setDialogOpen(false);
  }
  return <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
    <Button color="primary" variant="contained" onClick={() => setDialogOpen(true)}>How does this work?</Button >
    <Dialog onClose={onClose} open={dialogOpen}>
      <DialogTitle>How does this work?</DialogTitle>
      <DialogContent>
        <PageSection>
          <Typography variant="h3">What do the scores mean?</Typography>
          <b>Each news source is given a score from -1 to 1.</b> These scores are obtained by doing an automated sentiment analysis on the source's most recent 100 text articles and averaging each articles' scores.
          <ul>
            <li>1 = implies that the news source contains only sentimentally positive articles. <i>For example: "I love ice creams because they are really delicious!"</i></li>
            <li>0 = implies that the news source contains only sentimentally neutral articles. <i>For example: "1 + 1 is 2."</i></li>
            <li>-1 = implies that the news source contains only sentimentally negative articles. <i>For example: "I really hate life. Go f*** yourself."</i></li>
          </ul>
        </PageSection>
        <PageSection>
          <Typography variant="h3">How do we come up with the score for a news source?</Typography>
          <ul>
            <li>A scraper retrieves news articles from various sources (English-only, for now).</li>
            <li>Those news articles are then fed into our sentiment analysis pipeline, which spits out this score.</li>
            <li>The scores of each tokens/words in the news articles are then averaged for their respective news sources.</li>
          </ul>
        </PageSection>
        <PageSection>
          <Typography variant="h3">Sentiment analysis pipeline? What's that?</Typography>
          <p>It sounds fancy, but it really isn't.</p>
          <p>We are currently using Amazon Comprehend, which is Amazon's natural language processing (NLP) service. In essence, it's sort of like the system that powers Amazon Echo/Google Home in the sense that it uses machine learning to understand what someone is trying to say.</p>
        </PageSection>
        <PageSection>
          <Typography variant="h3">Wait, so can the score be biased?</Typography>
          <p>Of course! Sentiments are always subjective; it is literally to the eye of the beholden. Words mean differently in different contexts and cultures, so it is ultimately impossible to come up with an objective score.</p>
          <p>However, by using hosted services (such as Amazon Comprehend), we hope to leverage the immense dataset that they have, which should yield a more accurate, less-biased result.</p>
        </PageSection>
        <PageSection>
          <i>Keep in mind that this is still under active development, and can change at anytime! Visit the <a target="_blank" rel="noopener noreferrer" href="https://github.com/verzac/nodescrape-fe">project's GitHub</a> to ask any questions or to give any feedback.</i>
        </PageSection>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK! Take me back!</Button>
      </DialogActions>
    </Dialog>
  </Box >
}