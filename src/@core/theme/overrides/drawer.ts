// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Drawer = (theme: Theme) => {
  return {
    MuiDrawer: {

      styleOverrides: {
        root: {
          border: 0,
          
          color: 'black',
          backgroundColor: 'linear-gradient(180deg, #C89220 0%, #F3CA41 100%)'
        }
      }
    }
  }
}

export default Drawer
