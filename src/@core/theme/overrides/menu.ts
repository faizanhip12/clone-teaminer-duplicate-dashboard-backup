// ** MUI Imports
import { Theme } from '@mui/material/styles'

// ** Theme Type Import
import { Skin } from 'src/@core/layouts/types'

const Menu = (theme: Theme, skin: Skin) => {
  const boxShadow = () => {
    if (skin === 'bordered') {
      return theme.shadows[0]
    } else if (theme.palette.mode === 'light') {
      return theme.shadows[8]
    } else return theme.shadows[9]
  }

  return {
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiMenu-paper': {
            borderRadius: 5,
            boxShadow: boxShadow(),
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` }),
            background: 'linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%), linear-gradient(136.64deg, rgba(255, 255, 255, 0.35) -0.95%, rgba(255, 255, 255, 0.32) 135.8%)',
            color: '#fff'
          }
        }
      }
    }
  }
}

export default Menu
