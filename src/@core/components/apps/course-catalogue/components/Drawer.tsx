import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { InputField, Select } from 'src/@core/components/form'
import Close from 'mdi-material-ui/Close'
import { Divider, FormLabel, Grid, MenuItem, useTheme } from '@mui/material'
import { useCourseCatalogue } from 'src/@core/hooks/apps/useCourseCatalogue'
import { ICatalogue } from 'src/types/apps/course-catalogue'
import FileUploaderRestrictions from './FileUploader'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const CatalogueDrawer = (props: SidebarAddUserType) => {
  const { open, toggle, serviceId } = props

  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors }
    },
    addCourseCatalogue,
    updateCourseCatalogue,
    store
  } = useCourseCatalogue(serviceId)

  const onSubmit = async (data: ICatalogue) => {
    if (serviceId) {
      await updateCourseCatalogue(serviceId, data)
    } else {
      await addCourseCatalogue(data)
    }
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  const theme = useTheme()

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 700, [theme.breakpoints.down('sm')]: {width: '80%'} } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>{!serviceId ? 'Create Course Catalogue' : 'Update Course Catalogue'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ padding: 5 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12}>
              <InputField name='title' label='Catalogue Title' placeholder='Enter Title' control={control} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormLabel sx={{ display: 'block', marginBottom: 2, color: theme.palette.customColors.white }}>
                Catalogue Thumbnail
              </FormLabel>
              <FileUploaderRestrictions
                name='thumbnail'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                maxFiles={1}
                maxSize={10000000000}
                minSize={1}
                control={control}
              />
              {errors?.thumbnail && (
                <Typography mt={2} fontWeight={'400'} color={theme.palette.error.main} fontSize={'0.75rem'}>
                  {errors?.thumbnail?.message}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <LoadingButton
              loading={store.status === 'pending'}
              disabled={store.status === 'pending'}
              loadingPosition='end'
              variant='contained'
              type='submit'
            >
              {store.status === 'pending' ? 'Submitting' : 'Submit'}
            </LoadingButton>
          </Grid>
        </Box>
      </form>
    </Drawer>
  )
}

export default CatalogueDrawer
