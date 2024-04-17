// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Drawer = (theme: Theme) => {
  return {
    MuiDrawer: {

      styleOverrides: {
        root: {
          border: 0,
          
          color: 'black',
          backgroundColor: 'linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%), linear-gradient(136.64deg, rgba(255, 255, 255, 0.35) -0.95%, rgba(255, 255, 255, 0.32) 135.8%)'
        }
      }
    }
  }
}

export default Drawer
