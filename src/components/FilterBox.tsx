import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import { NewsSourceScore } from "../services/NewsSourceScoreService";
import countryUtil from "../utils/countryUtil";

interface FilterBoxProps {
  onFilterChange: (filter: Filters) => void;
  newsSourceScores: Array<NewsSourceScore>;
}

export interface Filters {
  country: string;
  name: string;
}

const initialState: Filters = {
  country: "",
  name: "",
};

const FilterBox: React.FC<FilterBoxProps> = (props) => {
  const { newsSourceScores, onFilterChange } = props;
  const [filters, setFilters] = React.useState<Filters>({
    ...initialState,
    country: countryUtil.getLocation() || initialState.country,
  });
  const countryOptions = React.useMemo<Array<string>>(
    () => Array.from(new Set(newsSourceScores.map((score) => score.country))),
    [newsSourceScores]
  );
  React.useEffect(() => {
    onFilterChange(filters);
    // (async () => onFilterChange(filters))();
    countryUtil.setLocation(filters.country);
  }, [filters, onFilterChange]);
  return (
    <>
      <form>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              id="search-query"
              label="By News Source Name"
              name="searchQuery"
              value={filters.name}
              onChange={(event) =>
                setFilters({ ...filters, name: event.target.value as string })
              }
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              id="choose-country-filter"
              variant="outlined"
              onChange={(event) =>
                setFilters({
                  ...filters,
                  country: event.target.value as string,
                })
              }
              value={filters.country}
              label="By Country"
              select
              fullWidth
            >
              <MenuItem key="" value="">
                <em>None</em>
              </MenuItem>
              {countryOptions.map((countryOption) => (
                <MenuItem key={countryOption} value={countryOption}>
                  {countryOption}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => setFilters(initialState)}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FilterBox;
