import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
export const appTheme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      h1: {
        // fontSize: "3rem",
      },
      h2: {
        // fontSize: "2.5rem",
      },
      h3: {
        // fontSize: "2rem",
        fontWeight: 300,
      },
      h4: {
        // fontSize: "1.5rem",
      },
      body1: {
        lineHeight: 1,
        marginBottom: "0.5rem",
      },
    },
    overrides: {
      MuiCardHeader: {
        content: {
          minWidth: 0, // for enforcing flex and forcing wrapping
        },
      },
      MuiTableCell: {
        head: {
          fontWeight: 700,
          color: "#666666",
        },
      },
    },
    // palette: {
    //   type: "dark",
    //   primary: {
    //     main: "#054A91",
    //   },
    //   secondary: {
    //     main: "#3E7CB1",
    //   },
    // },
  })
);
