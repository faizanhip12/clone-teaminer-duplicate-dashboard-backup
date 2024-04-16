// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode, useContext, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import { PusherContext } from 'src/context/PusherContext'
import { notificationService } from 'src/services'
import { useNotification } from 'src/@core/hooks/apps/useNotification'
import { formatDistanceToNow } from 'date-fns'
import { IUser } from 'src/types/apps/user'
import useMessaging from 'src/@core/hooks/apps/useMessaging'
import toast from 'react-hot-toast'
import Notification from 'src/@core/components/apps/firebase/Notification'
import { Skeleton, useTheme } from '@mui/material'

interface Props {
  settings: Settings
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 344,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// interface

interface INotification {
  title: string
  id: string
  description: string
  createdAt: Date
  user: IUser
}

const NotificationDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  const { notification, notificationStatus, setNotification, setIsOpen } = useNotification()

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const theme = useTheme()

  // ** Vars
  const { direction } = settings

  // ** Context

  const { message } = useContext(PusherContext)
  // console.log(anchorEl, 'anchorEl')

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setIsOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
    setIsOpen(false)
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }



  return (
    <Fragment>
      <IconButton color='secondary' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <BellOutline />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            {/* <CustomChip
              skin='light'
              size='small'
              label='8 New'
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            /> */}
          </Box>
        </MenuItem>
        {/* <ScrollWrapper> */}
        <Box
          sx={{
            height:
              notificationStatus === 'pending'
                ? 150
                : notificationStatus === 'success' && !notification.length
                  ? 150
                  : 330,
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              width: '2px'
            },
            '&:empty': {
              height: 'auto'
            },
            borderRadius: 1
          }}
        >
          {notificationStatus === 'pending' ? (
            <MenuItem>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>
                    <Skeleton
                      variant='rectangular'
                      sx={{ height: '50px', width: '100%', background: theme.palette.customColors.skeletongrey }}
                    />
                  </MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>
                    <Skeleton
                      variant='rectangular'
                      sx={{ height: '100%', width: '100%', background: theme.palette.customColors.skeletongrey }}
                    />
                  </MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  <Skeleton
                    variant='rectangular'
                    sx={{ height: '100%', width: '100%', background: theme.palette.customColors.skeletongrey }}
                  />
                </Typography>
              </Box>
            </MenuItem>
          ) : notificationStatus === 'success' && !notification.length ? (
            <MenuItem>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle textAlign={'center'}>No Notifications</MenuItemTitle>
                </Box>
              </Box>
            </MenuItem>
          ) : (
            notification?.map((item: INotification) => {
              return (
                <MenuItem onClick={handleDropdownClose} key={item.id}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Avatar alt='Flora' src={item?.user?.profile_picture || '/images/avatars/4.png'} />
                    <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{item?.title}</MenuItemTitle>
                      <MenuItemSubtitle variant='body2'>{item.description}</MenuItemSubtitle>
                    </Box>
                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                      {item?.createdAt ? formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true }) : null}
                    </Typography>
                  </Box>
                </MenuItem>
              )
            })
          )}
        </Box>
        {/* <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar skin='light'>VU</Avatar>
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>New user registered.</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>5 hours ago</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Yesterday
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='message' src='/images/avatars/5.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>New message received 👋🏻</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>You have 10 unread messages</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                11 Aug
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <img width={38} height={38} alt='paypal' src='/images/misc/paypal.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Paypal</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Received Payment</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                25 May
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='order' src='/images/avatars/3.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Revised Order 📦</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>New order revised from john</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                19 Mar
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <img width={38} height={38} alt='chart' src='/images/misc/chart.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Finance report has been generated</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>25 hrs ago</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                27 Dec
              </Typography>
            </Box>
          </MenuItem> */}
        {/* </ScrollWrapper> */}
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
