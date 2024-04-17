// ** Type Imports
import { PaletteMode } from '@mui/material'
import { Skin } from 'src/@core/layouts/types'

const DefaultPalette = (mode: PaletteMode, skin: Skin) => {
  // ** Vars
  const lightColor = '76, 78, 100'
  const darkColor = '234, 234, 255'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return '#FFF'
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#0c0c0c'
    } else if (mode === 'light') {
      return '#0c0c0c'
    } else {
      return '#FFF' //'#282A42'
    }
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      darkBg: '#0c0c0c', // '#282A42',
      lightBg: '#0c0c0c',
      white: '#fff',
      skeletongrey: '#eee',
      grey: '#fff',
      lightgrey: '#fff',
      darkgrey: '#fff',
      themeColor: '#0c0c0c',
      customgrey: '#eee',
      blue: '#07c',
      gold: '#0c0c0c',
      bodyBg: mode === 'light' ? '#0c0c0c' : '#0c0c0c', // '#282A42', // Same as palette.background.default but doesn't consider bordered skin
      tooltipBg: mode === 'light' ? '#262732' : '#464A65',
      tableHeaderBg: mode === 'light' ? 'rgb(33, 33, 33)' : 'rgb(33, 33, 33)',
      tableFooterBg: mode === 'light' ? 'rgb(33, 33, 33)' : 'rgb(33, 33, 33)',
      border: '#2b95d7',
      buttonGradient:
        mode === 'light'
          ? 'linear-gradient(180deg, rgb(33, 33, 33) -73.58%, #0c0c0c 97.53%)'
          : 'linear-gradient(180deg, rgb(33, 33, 33) -73.58%, #0c0c0c 97.53%)',
      buttonGradient_new:
        mode === 'light'
          ? 'linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(201, 201, 201) 100%)'
          : 'linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(201, 201, 201) 100%)',
      tableRootBg:
        mode === 'light'
          ? 'linear-gradient(135.45deg, rgb(33, 33, 33) 11.55%, #0c0c0c 101.52%)'
          : 'linear-gradient(135.45deg, rgb(33, 33, 33) 11.55%, #0c0c0c 101.52%)'
    },
    common: {
      black: '#000',
      white: '#FFF'
    },
    mode: mode,
    primary: {
      light: 'rgb(33, 33, 33)', // '#EFD9AE', // '#787EFF',
      main: '#FFF', //'#666CFF',
      dark: '#53aee1', // '#5A5FE0',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D', // '#252529'
      dark: '#606A7C',
      contrastText: '#FFF'
    },
    success: {
      light: '#83E542',
      main: '#72E128',
      dark: '#64C623',
      contrastText: '#FFF'
    },
    error: {
      light: '#FF625F',
      main: '#FF4D49',
      dark: '#E04440',
      contrastText: '#FFF'
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: '#FFF'
    },
    info: {
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper:
        mode === 'light'
          ? 'linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%)'
          : 'linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%)',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    },
    linear_gradient: {
      cardGradient: 'linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%)',
      modalGradient: 'linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%)',
      multiGradient:
        'linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%),linear-gradient(135.45deg, rgb(54, 54, 54) 11.55%, rgb(0, 0, 0) 101.52%)',
      radialGradient: 'linear-gradient(180deg, #0c0c0c -17.92%, rgb(33, 33, 33) 82.7%)'
    }
  }
}

export default DefaultPalette
