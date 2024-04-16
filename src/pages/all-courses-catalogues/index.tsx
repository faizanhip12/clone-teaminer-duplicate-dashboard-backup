import React, { Fragment, useEffect } from 'react'
import { Card, Grid } from '@mui/material'
import { PlayList } from 'src/@core/components/apps/all-courses-catalogue/Playlist'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import TableHeader from 'src/@core/components/apps/all-courses-catalogue/TableHeader'
import Drawer from 'src/@core/components/apps/all-courses-catalogue/Drawer'
import { ModalType } from 'src/types'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

const Page = () => {
  // Hooks

  const { serviceId, handleDrawer, isDrawerOpen } = useToggleDrawer()
  const { deletePlaylist, getAllPlaylistOfEveryChannel } = usePlaylist(null)

  useEffect(() => {
    getAllPlaylistOfEveryChannel({ query: '' })
  }, [])

  const handleDeleteCourse = () => {
    serviceId && deletePlaylist(serviceId)
  }

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ background: 'none', boxShadow: 'none', borderRadius: 0 }}>
            <TableHeader value={''} handleFilter={() => {}} toggle={() => handleDrawer(null)} />
          </Card>
        </Grid>
      </Grid>
      <Grid container item rowSpacing={1} columnSpacing={1} width='100%'>
        <Grid display={'flex'} flexWrap={'wrap'} maxWidth={'100%'} width={'100%'} marginTop={5}>
          <PlayList />
        </Grid>
      </Grid>
      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='Course' type={ModalType.ALL_COURSES_CATALOGUE} onAgree={handleDeleteCourse} />
    </Fragment>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'all-courses-catalogues-page'
}

export default Page
