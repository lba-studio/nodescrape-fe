import React from "react";
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";

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
          <ul>
            <li><b>Scores are from -1 to 1</b>, with -1 implying that all the text in that news source only contains sentimentally negative words, and 1 implying that the text only contains positive words.</li>
            <li>A scraper retrieves news articles from various sources (English-only, for now).</li>
            <li>Those news articles are then fed into our sentiment analysis pipeline.</li>
            <li>The text in those news articles are broken down into "tokens" (i.e. individual words).</li>
            <li>The words are run against a "lexicon" (specifically AFINN, for now; see roadmap); things that contain words and their properties (in this case, our sentiment polarity score).</li>
            <li>The scores of each tokens/words in the news articles are then averaged for their respective news sources.</li>
          </ul>
          <i>Keep in mind that this is still under active development, and can change at anytime! Visit the <a target="_blank" rel="noopener noreferrer" href="https://github.com/verzac/nodescrape-fe">project's GitHub</a> to ask any questions or to give any feedback.</i>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK! Take me back!</Button>
      </DialogActions>
    </Dialog>
  </Box >
}