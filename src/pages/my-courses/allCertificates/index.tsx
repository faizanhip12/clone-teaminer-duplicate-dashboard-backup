import { Box, Card, CardContent, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { DotsVertical } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'
import ProgressBox from 'src/@core/components/apps/current-course/components/ProgressBox'
import { textOverflow } from 'src/@core/helper/text'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { useAuth } from 'src/hooks/useAuth'
import { ICertificate } from 'src/types/apps/certificate'
import { ICourses } from 'src/types/apps/courses'

const RowOptions = ({ courseID }: { courseID: string }) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const router = useRouter()

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => router.push(`/course/${courseID}/certification`)

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleClick}>View Certificates</MenuItem>
      </Menu>
    </>
  )
}

const Page = () => {
  const { getAllMyCertificates, store } = useCourses(null)

  useEffect(() => {
    getAllMyCertificates({ query: '' })
  }, [])

  const { user } = useAuth()

  return (
    <>
      <Typography variant='h3' mb={5} textAlign={'center'}>
        All Certificates Of {user?.first_name} {user?.last_name}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Stack>
          <Box sx={{ mt: 5 }} />
          <Stack direction='row' gap={5}>
            {!store?.entities?.length ? (
              <Card sx={{ mt: 2, maxWidth: 300, maxHeight: 300 }}>
                <DataNotFound />
              </Card>
            ) : (
              store?.entities?.map((item: ICertificate) => {
                return (
                  <Card sx={{ mt: 2, minWidth: 400 }} key={item.playList?.id}>
                    <CardContent>
                      <Stack direction='row' justifyContent='space-between'>
                        <Box>
                          <Typography variant='h6'>{textOverflow(item.playList?.name as string, 20)}</Typography>
                          <Typography variant='caption'>{user?.email}</Typography>
                        </Box>
                        <Box marginLeft={'auto'}>
                          <RowOptions courseID={item.playList?.id || ''} />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'my-certificates-page'
}

export default Page
