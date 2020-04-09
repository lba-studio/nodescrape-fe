import React from 'react';
import { Box, makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  siteTitle: {
    flexGrow: 1,
    textAlign: 'start',
    marginBottom: theme.spacing(2),
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
        News Watch
              </Typography>
      <Button color="inherit" onClick={() => Routing.goTo('/')}>Home</Button>
      <Button color="inherit" onClick={() => Routing.goTo('/contact')}>Contact Me</Button>
    </Toolbar>
  </AppBar>
  {/* <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_donations" />
      <input type="hidden" name="business" value="HFQWXS77A5Q8J" />
      <input type="hidden" name="currency_code" value="AUD" />
      <input type="image" src="https://www.paypalobjects.com/en_AU/i/btn/btn_donate_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
      <img alt="" src="https://www.paypal.com/en_AU/i/scr/pixel.gif" width="1" height="1" />
    </form> */};
}

export default Header;