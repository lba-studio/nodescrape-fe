import React from 'react';
import { Divider, Typography } from '@material-ui/core';

const Footer: React.FC = () => <>
  <Divider />
  <Typography variant="subtitle1">This project is made with love (and coffee) by <a target="_blank" rel="noopener noreferrer" href="https://about.benjamintanone.com">Benjamin Tanone</a>.</Typography>
  <Typography variant="subtitle1"><a target="_blank" rel="noopener noreferrer" href="https://github.com/verzac/nodescrape-fe">GitHub Repo</a></Typography>
</>;

export default Footer;