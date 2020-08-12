import PageSection from "../components/PageSection";
import React from "react";
import { Typography, Link } from "@material-ui/core";

const FeedbackPage = () => {
  return (
    <PageSection>
      <Typography variant="h2" id="feedback">
        We're looking for your feedback!
      </Typography>
      <Typography>
        When you have the time, we'd like to gather your feedback to improve
        what we have. In return, we'll make sure to include you in our list of
        early supporters.
      </Typography>
      <Link
        href="https://forms.gle/WtDNApBLvh65ugni8"
        target="_blank"
        rel="noopener noreferrer"
      >
        Form link
      </Link>
    </PageSection>
  );
};

export default FeedbackPage;
