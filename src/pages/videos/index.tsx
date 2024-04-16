import React from 'react'
import VideoUploader from 'src/@core/components/apps/videos/components/VideoUploader'
import { Grid, Typography, useTheme } from '@mui/material'
import Drawer from 'src/@core/components/apps/courses/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import { Slice } from 'src/store/apps/file'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const theme = useTheme()

  const { store: playlistStore } = usePlaylist(null)

  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
    if (!isDrawerOpen) {
      dispatch(Slice.actions.handleRemoveFile({}))
    }
  }, [!isDrawerOpen])

  return (
    <>
      {!playlistStore.entities?.length && (
        <Typography color={theme.palette.customColors.dark} variant='body2' textAlign={'left'} mt={5} mb={5}>
          Please create a course first in which you want to store your videos
        </Typography>
      )}
      <Grid container>
        <Grid item xl={4} lg={5} md={7} sm={8} xs={12}>
          <VideoUploader
            name='file'
            accept={{ 'video/*': ['.mp4'] }}
            maxFiles={1}
            maxSize={10000000000}
            minSize={1}
            onUpload={file => {
              handleDrawer(null)
            }}
          />
        </Grid>
      </Grid>
      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'videos-page'
}

export default Page
