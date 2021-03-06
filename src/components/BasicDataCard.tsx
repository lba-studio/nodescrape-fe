import {
  Card,
  Box,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  useTheme,
} from "@material-ui/core";
import React from "react";
import computeColorHex from "../utils/computeColorHex";

interface BasicDataCardProp {
  label: string;
  data?: number;
  extraDataLabel?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    score: {
      // backgroundColor: 'orange',
      margin: "auto",
      padding: theme.spacing(2),
    },
    label: {
      padding: theme.spacing(2),
      margin: "auto",
    },
  });

const BasicDataCard: React.FC<BasicDataCardProp & WithStyles<typeof styles>> = (
  props
) => {
  const theme = useTheme();
  const { classes, label, data, extraDataLabel } = props;
  const backgroundColor = computeColorHex(data || 0);
  const color = theme.palette.getContrastText(backgroundColor);
  return (
    <Card>
      <Box display="flex" flexDirection="row">
        <div className={classes.label}>{label}</div>
        <div className={classes.score} style={{ backgroundColor, color }}>
          {data
            ? `${data.toFixed(4)}${
                extraDataLabel ? ` (${extraDataLabel})` : ""
              }`
            : "N/A"}
        </div>
      </Box>
    </Card>
  );
};

export default withStyles(styles)(BasicDataCard);
