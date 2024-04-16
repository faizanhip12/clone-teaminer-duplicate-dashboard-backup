import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import React, { ReactNode, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'
import requests from 'src/services/httpService'
import { useTheme } from '@mui/material/styles'
import { UserDataType } from 'src/context/types'
import UserLayout from 'src/layouts/UserLayout'
import ChannelLayout from 'src/@core/layouts/ChannelLayout'
import { useChannels } from 'src/@core/hooks/apps/useChannels'

const Page = () => {
  const theme = useTheme()

  const {
    user: { referCode }
  }: any = useAuth()

  const {
    store: { entity }
  } = useChannels(null)

  const requestsURI = requests.getUri()

  const code = `${requestsURI.split('/api/v1')[0]}/channels/${entity?.id}`

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ background: theme.palette.linear_gradient.cardGradient }}>
            <Typography variant='h6' paddingTop={15} textAlign='center' color={'#fff'}>
              Invite your friends to {entity?.name}
            </Typography>
            <Box width={'80%'} margin='auto' textAlign='center' paddingBottom={3}>
              <Typography component={'p'} color={'#fff'}>
                Share the link below to ask them visit {entity?.name}
              </Typography>
            </Box>
            <Stack direction='row' spacing={1} display='flex' justifyContent={'center'}>
              <Chip
                label={`${requestsURI.split('/api/v1')[0]}/channels/${entity?.id}`}
                sx={{ padding: 5, color: '#fff' }}
              />
            </Stack>
            <Box display={'flex'} justifyContent={'center'} paddingBottom={15}>
              <CopyToClipboard text={code} onCopy={() => copyToClipboard()}>
                <Button
                  variant='contained'
                  sx={{ width: 'auto', color: 'white' }}
                  type='submit'
                  startIcon={<ContentCopyIcon />}
                >
                  Copy Link
                </Button>
              </CopyToClipboard>
              {copySuccess ? (
                <Typography mt={3} ml={3} sx={{ color: '#fff' }}>
                  Copied
                </Typography>
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <ChannelLayout>{page}</ChannelLayout>
  </UserLayout>
)
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'channels-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page
