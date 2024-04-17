// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { CardBoxSingle } from 'src/@core/constants/styles'
import { Box, Grid } from '@mui/material'
import { AvatarGroup, Divider } from '@mui/material'
import Image from 'next/image'
import { EmailShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import ShareIcon from '@mui/icons-material/Share'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { renderClient } from 'src/@core/components/common/renderClient'
import { IReferral } from 'src/types/apps/dashboard'
import { useAuth } from 'src/hooks/useAuth'
import requests from 'src/services/httpService'

// Styled component for the avatar image
const AvatarImg = styled('img')(({ theme }) => ({
  right: 21,
  bottom: 24,
  height: 162,
  position: 'absolute',

  [theme.breakpoints.down('md')]: {
    height: 154
  },
  [theme.breakpoints.down('sm')]: {
    height: 149
  }
}))

const InviteFriendsText = styled('h6')(({ theme }) => ({
  maxWidth: '60%',
  margin: 0,
  fontSize: '13px',

  [theme.breakpoints.down('lg')]: {},

  [theme.breakpoints.down('md')]: {
    marginBottom: '15px'
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px'
  }
}))

const InviteFriends = () => {
  const { store } = useDashboard()

  const {
    user: { referCode }
  }: any = useAuth()

  const requestsURI = requests.getUri()

  const code = `${requestsURI.split('/api/v1')[0]}/signup/?key=${referCode}`

  return (
    <Grid container spacing={5} mt={0} height={'100%'}>
      <CardBoxSingle sx={{ paddingY: 3, width: '100%', height: '100%', borderRadius: 1 }}>
        <Box width={'100%'}>
          <Typography variant='h6' color={'#ffff'}>
            Invite Friends
          </Typography>
          <Typography variant='body2' pb={5} color={'#fff'}>
            You can invite your friend to the platform
          </Typography>
          <Grid container alignItems={'center'} justifyContent={'space-between'}>
            <Grid pt={10}>
              <AvatarGroup
                total={0}
                sx={{
                  width: '150px',
                  overflowX: 'scroll',
                  '::-webkit-scrollbar': {
                    height: '2px'
                  }
                }}
              >
                {!store?.studentEntity?.referralList?.length ? (
                  <Typography variant='h5' sx={{ mb: 4.5 }} color={'#fff'}>
                    Not Found
                  </Typography>
                ) : (
                  store?.studentEntity?.referralList?.map((referral: IReferral) => {
                    return renderClient(referral?.profile_picture, referral?.first_name + ' ' + referral?.last_name)
                  })
                )}
                {/* <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                <Avatar alt='Agnes Walker' src='/static/images/avatar/4.jpg' />
                <Avatar alt='Trevor Henderson' src='/static/images/avatar/5.jpg' /> */}
              </AvatarGroup>
              <Typography variant='body2' py={2} color={'#fff'}>
                Your Invited Friends
              </Typography>
            </Grid>
            <Divider
              orientation='horizontal'
              flexItem
              sx={{ border: '1px solid #f1f1f1', marginLeft: 10, marginRight: 4 }}
            ></Divider>
            <Grid item>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <InviteFriendsText>Share or invite your friends</InviteFriendsText>
                <ShareIcon
                  sx={{
                    verticalAlign: 'middle',
                    marginLeft: 3,
                    color: '#fff'
                  }}
                />
              </Box>
              <Box
                display={'flex'}
                marginLeft='auto'
                style={{ marginBottom: 15, justifyContent: 'space-between', padding: 20, width: '100%' }}
              >
                <WhatsappShareButton
                  style={{ marginRight: '10px' }}
                  title={'Hey, check this out'}
                  url={code || 'wealth.alliance'}
                >
                  <Image
                    src='/images/icons/project-icons/whatsappIcon.png'
                    width={'36.37px'}
                    height='36.37px'
                    style={{ cursor: 'pointer' }}
                  />
                </WhatsappShareButton>
                <LinkedinShareButton
                  style={{ marginRight: '10px' }}
                  title={'Hey, check this out'}
                  url={code || 'wealth.alliance'}
                >
                  <Image
                    src='/images/icons/project-icons/linkedInIcon.png'
                    width={'36.37px'}
                    height='36.37px'
                    style={{ cursor: 'pointer' }}
                  />
                </LinkedinShareButton>
                <EmailShareButton title={'Hey, check this out'} url={code || 'wealth.alliance'}>
                  <Image
                    src='/images/icons/project-icons/emailIcon.png'
                    width={'36.37px'}
                    height='36.37px'
                    style={{ cursor: 'pointer' }}
                  />
                </EmailShareButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardBoxSingle>
    </Grid>
  )
}

export default InviteFriends
