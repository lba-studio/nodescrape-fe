import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  fullWidth: {
    maxWidth: "100%",
  },
}));

interface PageSectionProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const PageSection: React.FC<PageSectionProps> = (props) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.section, {
        [classes.fullWidth]: props.fullWidth,
      })}
    >
      {props.children}
    </div>
  );
};

export default PageSection;
