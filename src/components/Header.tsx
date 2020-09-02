import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { siteTitle } from "../config/constants";

const useStyles = makeStyles((theme) => ({
  siteTitle: {
    flexGrow: 1,
    textAlign: "start",
  },
  headerItem: {
    margin: theme.spacing(2),
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography className={classes.siteTitle}>
          {siteTitle} (BETA)
        </Typography>
        <Button color="inherit" component={RouterLink} to="/topics">
          Topics
        </Button>
        <Button color="inherit" component={RouterLink} to="/sources">
          Sources
        </Button>
        <Button color="inherit" component={RouterLink} to="/about">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
