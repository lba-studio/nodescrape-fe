import React from "react";
import { makeStyles, AppBar, Toolbar, Button } from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { siteTitle } from "../config/constants";

const useStyles = makeStyles((theme) => ({
  siteTitle: {
    flexGrow: 1,
    textAlign: "start",
    margin: 0,
    letterSpacing: 1,
    fontWeight: 600,
    justifyContent: "center",
  },
  headerItem: {
    margin: theme.spacing(2),
  },
}));

interface HeaderLinkProps {
  to: string;
  children: React.ReactNode;
}

function HeaderLink(props: HeaderLinkProps) {
  const { to, children } = props;
  const location = useLocation();
  return (
    <Button
      color={to === location.pathname ? "primary" : "inherit"}
      component={RouterLink}
      to={to}
    >
      {children}
    </Button>
  );
}

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <div className={classes.siteTitle}>
          <HeaderLink to="/">{siteTitle} (BETA)</HeaderLink>
        </div>
        <HeaderLink to="/topics">Topics</HeaderLink>
        <HeaderLink to="/sources">Sources</HeaderLink>
        <HeaderLink to="/about">About</HeaderLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
