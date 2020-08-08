import React from "react";
import { Divider, Typography, Link } from "@material-ui/core";

const Footer: React.FC = () => (
  <>
    <Divider />
    <Typography variant="subtitle1">
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
    <Typography variant="subtitle1">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/verzac/nodescrape-fe"
      >
        GitHub Repo
      </Link>
    </Typography>
  </>
);

export default Footer;
