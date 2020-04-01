import React from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, makeStyles, TextField } from '@material-ui/core';
import { NewsSourceScore } from '../services/NewsSourceScoreService';
import countryUtil from '../utils/countryUtil';

interface FilterBoxProps {
  onFilterChange: (filter: Filters) => void;
  newsSourceScores: Array<NewsSourceScore>;
}

export interface Filters {
  country: string;
  name: string;
}

const useStyles = makeStyles(theme => ({
  mediumFilter: {
    flexBasis: '128px',
  },
  textFilter: {
    flexBasis: '256px',
  },
  item: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}));

const initialState: Filters = {
  country: countryUtil.getLocation() || '',
  name: '',
};

const FilterBox: React.FC<FilterBoxProps> = (props) => {
  const { newsSourceScores, onFilterChange } = props;
  const classes = useStyles();
  const [filters, setFilters] = React.useState<Filters>(initialState);
  const countryOptions = React.useMemo<Array<string>>(() => Array.from(new Set(newsSourceScores.map(score => score.country))), [newsSourceScores]);
  React.useEffect(() => {
    onFilterChange(filters);
    // (async () => onFilterChange(filters))();
    countryUtil.setLocation(filters.country);
  }, [filters, onFilterChange]);
  return (
    <>
      <Typography variant="h2">Filters</Typography>
      <form>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
          <TextField
            // required
            id="search-query"
            label="By News Source Name"
            margin="normal"
            name="searchQuery"
            value={filters.name}
            onChange={(event) => setFilters({ ...filters, name: event.target.value as string })}
            variant="outlined"
            className={classes.textFilter}
          // InputLabelProps={{ shrink: true }}
          // fullWidth
          />
          <FormControl margin="normal" className={classes.mediumFilter + ' ' + classes.item}>
            <InputLabel
              // shrink
              id="choose-country-filter-label"
              htmlFor="choose-country-filter"
            >
              By Country
            </InputLabel>
            <Select
              labelId="choose-country-filter-label"
              id="choose-country-filter"
              value={filters.country}
              onChange={(event) => setFilters({ ...filters, country: event.target.value as string })}
              displayEmpty
            >
              {/* <MenuItem value="" disabled>-</MenuItem> */}
              {countryOptions.map(countryOption => <MenuItem value={countryOption}>{countryOption}</MenuItem>)}
            </Select>
          </FormControl>
          {/* <div className={classes.item}>
            <Button color="primary" variant="contained" className="" onClick={() => onFilterChange(filters)}>Submit</Button>
          </div> */}
          <div className={classes.item}>
            <Button variant="contained" className="" onClick={() => setFilters(initialState)}>Clear</Button>
          </div>
        </Box>
      </form>
    </>
  );
}

export default FilterBox;