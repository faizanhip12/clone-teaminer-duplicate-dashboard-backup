import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TableHeader from 'src/@core/components/apps/course-catalogue/components/TableHeader'
import Table from 'src/@core/components/apps/course-catalogue/components/Table'
import Drawer from 'src/@core/components/apps/course-catalogue/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { Typography } from '@mui/material'
import { useCourseCatalogue } from 'src/@core/hooks/apps/useCourseCatalogue'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { getCourseCatalogues, deleteCourseCatalogue } = useCourseCatalogue(null)

  useEffect(() => {
    getCourseCatalogues({ query: '' })
  }, [])

  const handleDeleteCourseCatalogue = () => {
    serviceId && deleteCourseCatalogue(serviceId)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h3' textAlign={'center'} mb={10}>
            Course Catalogue
          </Typography>
          <TableHeader value={''} handleFilter={() => {}} toggle={() => handleDrawer(null)} />
          <Table />
        </Grid>
        <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      </Grid>
      <DeleteAlert title='Catalogue' type={ModalType.COURSE_CATALOGUE} onAgree={() => handleDeleteCourseCatalogue()} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'course-catalogue-page'
}

export default Page
