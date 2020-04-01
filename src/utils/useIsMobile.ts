import { useTheme, useMediaQuery } from "@material-ui/core";

export default function useIsMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return isMobile;
}