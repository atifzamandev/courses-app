import { createTheme, Theme } from '@mui/material'
import { deepPurple, teal } from '@mui/material/colors'

export const theme: Theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: deepPurple[400],
      contrastText: '#fff',
    },
    secondary: {
      main: teal[700],
      contrastText: '#fff',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#fff',
          fontSize: '24px',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'body1' },
          style: {
            color: '#fff',
            fontSize: '24px',
          },
        },
      ],
    },
  },
})
