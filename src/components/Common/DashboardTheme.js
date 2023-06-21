import { createTheme } from "@mui/material/styles";

export const dashboardTheme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
  palette: {
    primary: {
        main: 'blue'
    }
  }
});