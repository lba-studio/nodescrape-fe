import React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  });

const PageSection: React.FC<
  WithStyles<typeof styles> & { className?: string }
> = (props) => {
  return (
    <div className={props.classes.section + " " + (props.className || "")}>
      {props.children}
    </div>
  );
};

export default withStyles(styles)(PageSection);
