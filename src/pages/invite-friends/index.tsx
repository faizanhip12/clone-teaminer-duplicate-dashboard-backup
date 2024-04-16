import { Box, Button, Chip, Grid, Stack, Tooltip, Typography } from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import React, { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'
import requests from 'src/services/httpService'
import { useTheme } from '@mui/material/styles'

const Page = () => {
  const theme = useTheme()
  const {
    user: { referCode }
  }: any = useAuth()

  const requestsURI = requests.getUri()

  const code = `${requestsURI.split('/api/v1')[0]}/signup/?key=${referCode}`

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }

  return (
    <>
      <Typography variant={'h5'} paddingBottom={10} paddingTop={10}>
        Invite Friends
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ background: theme.palette.linear_gradient.cardGradient }}>
            <Typography variant='h6' paddingTop={15} textAlign='center' color={'#fff'}>
              Invite your friends and get $6 each
            </Typography>
            <Box width={'650px'} margin='auto' textAlign='center' paddingBottom={15}>
              <Typography component={'p'} color={'#fff'}>
                Share the code below or ask them to enter it during they signup, Earn when your friends signs up on our
                app
              </Typography>
            </Box>
            <Box sx={{ width: '50%', margin: 'auto', display: 'flex', paddingBottom: 15, justifyContent: 'center' }}>
              <Stack direction='row' spacing={1} display='flex' justifyContent={'center'}>
                <Chip
                  label={`${requestsURI.split('/api/v1')[0]}/signup/?key=${referCode}`}
                  sx={{ padding: 5, color: '#fff' }}
                />
              </Stack>
              <CopyToClipboard text={code} onCopy={() => copyToClipboard()}>
                <Tooltip title={`${'Click to copy the link'}`}>
                  <Button
                    variant='contained'
                    sx={{ width: 'auto', color: 'white' }}
                    type='submit'
                    startIcon={<ContentCopyIcon />}
                  >
                    Copy Link
                  </Button>
                </Tooltip>
              </CopyToClipboard>
              {copySuccess ? (
                <Typography mt={2} sx={{ color: '#fff' }}>
                  Copied
                </Typography>
              ) : null}
            </Box>
            <Typography variant='h6' textAlign={'center'} paddingBottom={10} color={'#fff'}>
              OR
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 15 }}>
              <Link href='/invite-friends/share'>
                <Button variant='contained' type='submit'>
                  Invite Friends
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'invite-friends-page'
}

export default Page
