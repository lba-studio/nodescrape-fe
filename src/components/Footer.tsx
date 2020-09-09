import React from "react";
import { Divider, Typography, Link } from "@material-ui/core";
import PageSection from "./PageSection";

const Footer: React.FC = () => (
  <PageSection>
    <Divider />
    <Typography align="center" variant="subtitle1">
      This project is made with love (and coffee) by{" "}
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://about.benjamintanone.com"
      >
        Benjamin Tanone
      </Link>
      .
    </Typography>
    <Typography align="center" variant="subtitle1">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/verzac/nodescrape-fe"
      >
        GitHub Repo
      </Link>
    </Typography>
  </PageSection>
);

export default Footer;
