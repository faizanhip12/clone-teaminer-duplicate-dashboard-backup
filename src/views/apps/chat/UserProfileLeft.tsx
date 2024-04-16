// ** React Imports
import { ChangeEvent, Fragment, ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Radio from '@mui/material/Radio'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import OfflineIcon from '@mui/icons-material/WifiOff'
import AwayIcon from '@mui/icons-material/DirectionsRun'
import BusyIcon from '@mui/icons-material/EventBusy'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import Available from '@mui/icons-material/CheckCircleOutline'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Types
import { StatusType, UserProfileLeftType } from 'src/types/apps/chatTypes'

// ** Custom Component Imports
import Sidebar from 'src/@core/components/sidebar'
import { useAuth } from 'src/hooks/useAuth'
import { useTheme } from '@mui/material'
import { renderClient } from 'src/@core/components/common/renderClient'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { updateStatusOfAUser } from 'src/store/apps/chat'
import { AuthServices } from 'src/services'

const UserProfileLeft = (props: UserProfileLeftType) => {
  const {
    store,
    hidden,
    statusObj,
    userStatus,
    sidebarWidth,
    setUserStatus,
    userProfileLeftOpen,
    handleUserProfileLeftSidebarToggle
  } = props

  const handleUserStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setUserStatus(e.target.value as StatusType)
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }

  const { user, setUser, status } = useAuth()

  const {
    palette: {
      customColors: { blue }
    }
  } = useTheme()

  const dispatch = useDispatch<AppDispatch>()

  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    if (isUpdate) {
      fetchUpdatedData()
    }
  }, [isUpdate])

  const fetchUpdatedData = async () => {
    const { data } = await AuthServices.me()
    setUser(data?.data?.user)
    setIsUpdate(false)
  }

  const statusEnum = ['OFFLINE', 'AWAY', 'BUSY', 'DO_NOT_DISTURB', 'AVAILABLE']

  function changeStatusOfAUser(status: string) {
    let data = {
      id: user?.id,
      status,
      setIsUpdate
    }
    dispatch(updateStatusOfAUser({ data }))
  }

  return (
    <Sidebar
      show={userProfileLeftOpen}
      backDropClick={handleUserProfileLeftSidebarToggle}
      sx={{
        zIndex: 9,
        height: '100%',
        width: sidebarWidth,
        borderTopLeftRadius: theme => theme.shape.borderRadius,
        borderBottomLeftRadius: theme => theme.shape.borderRadius,
        '& + .MuiBackdrop-root': {
          zIndex: 8,
          borderRadius: 1
        },
        background: blue
      }}
    >
      {store && user ? (
        <Fragment>
          <IconButton
            size='small'
            onClick={handleUserProfileLeftSidebarToggle}
            sx={{ top: '.7rem', right: '.7rem', position: 'absolute' }}
          >
            <Close />
          </IconButton>

          <Box sx={{ px: 5, pb: 7, pt: 9.5, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4.25, display: 'flex', justifyContent: 'center' }}>
              <Badge
                overlap='circular'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                badgeContent={
                  <Box
                    component='span'
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%'
                      // color: `${statusObj[userStatus]}.main`,
                      // backgroundColor: `${statusObj[userStatus]}.main`,
                      // boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`
                    }}
                  />
                }
              >
                {renderClient(user?.profile_picture as string, `${user?.first_name} ${user?.last_name}`)}
              </Badge>
            </Box>
            <Typography sx={{ mb: 0.75, fontWeight: 600, textAlign: 'center' }}>
              {`${user?.first_name} ${user?.last_name}`}
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center', textTransform: 'capitalize' }}>
              {user?.role?.code}
            </Typography>
          </Box>
          <Box sx={{ height: 'calc(100% - 13.375rem)' }}>
            <ScrollWrapper>
              <Box sx={{ p: 5 }}>
                {/* <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                  About
                </Typography> 
                <TextField minRows={3} multiline fullWidth sx={{ mb: 6 }} defaultValue={'None'} /> */}
                <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                  Status
                </Typography>
                <RadioGroup value={userStatus} sx={{ mb: 6.5, ml: 0.8 }} onChange={handleUserStatus}>
                  {statusEnum.map((item, index) => {
                    return (
                      <div key={index}>
                        <FormControlLabel
                          value={item}
                          label={
                            <Box component={'div'} display={'flex'} gap={2}>
                              {item === 'OFFLINE' ? (
                                <OfflineIcon />
                              ) : item === 'AWAY' ? (
                                <AwayIcon />
                              ) : item === 'BUSY' ? (
                                <BusyIcon />
                              ) : item === 'DO_NOT_DISTURB' ? (
                                <DoNotDisturbIcon />
                              ) : (
                                <Available />
                              )}
                              {' ' + item}
                            </Box>
                          }
                          disabled={status === 'pending' || store.status === 'pending'}
                          control={
                            <Radio
                              size='small'
                              color='success'
                              sx={{ p: 1.5, margin: 0.5 }}
                              checked={user?.ConversationSetting[0]?.status === item}
                              onChange={e => changeStatusOfAUser(e.target.value)}
                            />
                          }
                          sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                        />
                      </div>
                    )
                  })}
                  {/* <div>
                    <FormControlLabel
                      value='away'
                      label='Away'
                      control={<Radio size='small' color='warning' sx={{ p: 1.5 }} />}
                      sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='busy'
                      label='Do not Disturb'
                      control={<Radio size='small' color='error' sx={{ p: 1.5 }} />}
                      sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='offline'
                      label='Offline'
                      control={<Radio size='small' color='secondary' sx={{ p: 1.5 }} />}
                      sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                    />
                  </div> */}
                </RadioGroup>
                {/* <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                  Settings
                </Typography>
                <List dense sx={{ p: 0, mb: 6 }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <CheckCircleOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Two-step Verification' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <BellOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Notification' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <AccountOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Invite Friends' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <DeleteOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Delete Account' />
                    </ListItemButton>
                  </ListItem>
                </List> 
                <Button variant='contained'>Save</Button> */}
              </Box>
            </ScrollWrapper>
          </Box>
        </Fragment>
      ) : null}
    </Sidebar>
  )
}

export default UserProfileLeft
