import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Routing from '../utils/Routing';

const useStyles = makeStyles(theme => ({
  siteTitle: {
    flexGrow: 1,
    textAlign: 'start',
  },
  headerItem: {
    margin: theme.spacing(2),
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return <AppBar position="sticky">
    <Toolbar>
      <Typography className={classes.siteTitle}>
        NewsWatch
      </Typography>
      <Button color="inherit" onClick={() => Routing.goTo('/')}>Home</Button>
      {/* <Button color="inherit" onClick={() => Routing.goTo('/about')}>About</Button> */}
    </Toolbar>
  </AppBar>;
}

export default Header;