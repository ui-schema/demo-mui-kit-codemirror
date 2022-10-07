import React from 'react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { DemoEditor } from './DemoEditor'
import { createTheme } from '@mui/material/styles'

const headingFont =
    '"Playfair Display", Didot, Georgia, "Times New Roman", Times, serif'
const headingBody =
    'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif'
const universal = {
    palette: {
        contrastThreshold: 2,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 543,
            md: 768,
            lg: 1180,
            xl: 1920,
        },
    },
    typography: {
        fontSize: 14,
        h1: {
            fontFamily: headingFont,
            fontSize: '2.45rem',
        },
        h2: {
            fontFamily: headingFont,
            fontSize: '2.115rem',
        },
        h3: {
            fontFamily: headingFont,
            fontSize: '1.95rem',
        },
        h4: {
            fontFamily: headingFont,
            fontSize: '1.75rem',
        },
        h5: {
            fontFamily: headingFont,
            fontSize: '1.615rem',
        },
        h6: {
            fontFamily: headingFont,
            fontSize: '1.25rem',
        },
        body1: {
            fontFamily: headingBody,
            fontSize: '1.0125rem',
            letterSpacing: '0.0195em',
        },
        body2: {
            fontFamily: headingBody,
            fontSize: '0.95rem',
            letterSpacing: '0.021em',
        },
        subtitle1: {
            fontFamily: headingFont,
            fontSize: '1.25rem',
        },
        subtitle2: {
            fontFamily: headingFont,
            fontSize: '1rem',
        },
    },
    /*shape: {
          borderRadius: 0,
      },*/
}

const customTheme = createTheme({
    ...universal,
    palette: {
        ...universal.palette,
        mode: 'dark',
        primary: {
            main: '#05aeca',
        },
        secondary: {
            light: '#adf3e8',
            main: '#4ee3d7',
            dark: '#266e62',
        },
        background: {
            paper: '#13181c',
            default: '#010203',
        },
        text: {
            primary: '#c6c4c4',
            secondary: '#acc9c5',
        },
        info: {
            main: '#1872b9',
        },
        error: {
            main: '#9d190f',
            //main: '#b71c10',
        },
        warning: {
            main: '#d54600',
        },
        action: {
            hoverOpacity: 0.2,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {root: {backgroundImage: 'unset'}},
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    //variant: '#6431f7',
                    '&$focused': {
                        color: '#7649f6',
                    },
                    '&$error': {
                        color: '#b71c10',
                    },
                },
            },
        },
    },
})

export const App: React.ComponentType<{}> = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={customTheme}>
                <CssBaseline/>

                <DemoEditor/>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
