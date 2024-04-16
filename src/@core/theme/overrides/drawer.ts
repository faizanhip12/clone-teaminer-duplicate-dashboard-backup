// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Drawer = (theme: Theme) => {
  return {
    MuiDrawer: {

      styleOverrides: {
        root: {
          border: 0,
          
          color: 'black',
          backgroundColor: 'linear-gradient(180deg, #65BDE6 0%, #07C 100%)'
        }
      }
    }
  }
}

export default Drawer
