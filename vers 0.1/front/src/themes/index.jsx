import {createMuiTheme, MuiThemeProvider as ThemeProvider} from '@material-ui/core'


const Theme1 = createMuiTheme({
    typography: {
        "fontFamily": `Montserrat, sans-serif`,
        "fontSize": 16,
        // "fontWeightLight": 300,
        // "fontWeightRegular": 400,
        // "fontWeightMedium": 500
       }
})


export {ThemeProvider, Theme1};
