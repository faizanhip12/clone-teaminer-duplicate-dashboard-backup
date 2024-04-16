// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Table from 'src/@core/components/apps/review/components/Table'
import Drawer from 'src/@core/components/apps/review/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useReview } from 'src/@core/hooks/apps/useReview'
import { Typography } from '@mui/material'

const Page = () => {
  // ** Hooks

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { deleteReview, getAllReviews } = useReview(null)

  useEffect(() => {
    getAllReviews({ query: '' })
    return () => {}
  }, [])

  const handleDelete = () => {
    serviceId && deleteReview(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' textAlign={'center'} mb={10}>
          Teachers Details
        </Typography>
        <Table />
      </Grid>
      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='Teachers Details' onAgree={handleDelete} />
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'teachers-page'
}

export default Page
