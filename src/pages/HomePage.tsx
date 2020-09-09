import React from "react";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import PageSection from "../components/PageSection";
import ImageContainer from "../components/ImageContainer";
import ArrowImage from "../assets/arrow.png";
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <PageSection>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h1" align="center">
            Who can you trust?
          </Typography>
        </Box>
        <Typography variant="subtitle1" align="center">
          The news is NOT always objective.
        </Typography>
      </PageSection>
      <PageSection>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex">
            <ImageContainer
              src={ArrowImage}
              variant="logo"
              alt="Logo"
              aria-label="logo"
            />
            <ImageContainer
              src={ArrowImage}
              variant="logo"
              alt="Logo"
              aria-label="logo"
              style={{
                transform: "scaleX(-1)",
              }}
            />
          </Box>
          <Grid
            style={{ textAlign: "center" }}
            container
            spacing={1}
            justify="center"
          >
            <Grid container item xs={6} sm={3} justify="center">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Button
                  fullWidth
                  variant="outlined"
                  component={RouterLink}
                  to="/topics"
                  color="primary"
                >
                  Pick your own news topic
                </Button>
              </Box>
            </Grid>
            <Grid container item xs={6} sm={3} justify="center">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Button
                  fullWidth
                  to="/sources"
                  component={RouterLink}
                  variant="outlined"
                  color="primary"
                >
                  Explore your news sources
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </PageSection>
    </div>
  );
};

export default HomePage;
