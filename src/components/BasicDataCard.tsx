import { Card, Box, withStyles, Theme, createStyles, WithStyles } from "@material-ui/core";
import React from 'react';
import computeColorHex from "../utils/computeColorHex";

interface BasicDataCardProp {
  label: string;
  data: number;
  extraDataLabel?: string;
}

const styles = (theme: Theme) => createStyles({
  score: {
    // backgroundColor: 'orange',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  label: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
});

const BasicDataCard: React.FC<BasicDataCardProp & WithStyles<typeof styles>> = (props) => {
  const { classes, label, data, extraDataLabel } = props;
  return (
    <Card>
      <Box display="flex" flexDirection="row">
        <div className={classes.label}>
          {label}
        </div>
        <div className={classes.score} style={{ backgroundColor: computeColorHex(data) }}>
          {data.toFixed(4)}{extraDataLabel && ` (${extraDataLabel})`}
        </div>
      </Box>
    </Card>
  )
}

export default withStyles(styles)(BasicDataCard);