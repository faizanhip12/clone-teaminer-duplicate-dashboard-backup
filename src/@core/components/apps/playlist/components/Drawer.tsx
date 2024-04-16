// @ts-nocheck
import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { FormLabel, Grid } from '@mui/material'
import { CountrySelect, InputField, TimeZone } from 'src/@core/components/form'
import FileUploaderRestrictions from './FileUploader'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import CataloguesMultiSelect from './CataloguesMultiSelect'
import { ICatalogue } from 'src/types/apps/course-catalogue'
import { makeStyles } from '@mui/styles'
import toast from 'react-hot-toast'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import LanguageSelect from 'src/@core/components/form/Select/LanguageSelect'
const CKeditor = dynamic(() => import('./CKEditor'), {
  ssr: false // Set ssr to false to avoid server-side rendering for this component
})

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const useStyles = makeStyles((theme: Theme) => ({
  customTimezone: {
    '& div.MuiAutocomplete-root': {
      border: '1px solid #07c',
      borderRadius: '8px'
    }
  }
}))

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const CategoryDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: {
      control,
      reset,
      handleSubmit,
      getValues,
      formState: {
        errors: { thumbnail, description }
      },
      setValue
    },
    addPlaylist,
    updatePlaylist,
    getAllPlaylist,
    store
  } = usePlaylist(serviceId)

  const theme = useTheme()

  const classes = useStyles()

  const [editorLoaded, setEditorLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const {
    query: { id }
  } = useRouter()

  const playlistId = typeof id !== 'undefined' ? id.toString() : ''

  const onSubmit = async (data: any) => {
    if (data.catalogs.length) {
      if (serviceId) {
        await updatePlaylist(serviceId, data)
      } else {
        const response = await addPlaylist(data)
        if (response) {
          getAllPlaylist(playlistId)
        }
      }
    } else {
      toast.error('Catalogues are mendatory')
    }
  }

  const handleClose = () => {
    reset()
    toggle()
  }

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
          <Typography variant='h6'>{!serviceId ? 'Add Course' : 'Update Course'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <InputField name='name' label='Enter Name' placeholder='Enter Name' control={control} />
            </Grid>
          </Grid>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} sm={12}>
              <CountrySelect name='country' control={control} defaultValue={'US'} />
            </Grid>
          </Grid>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} sm={12}>
              <LanguageSelect name='language' control={control} />
            </Grid>
          </Grid>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} sm={12} className={classes.customTimezone}>
              <TimeZone name='timeZone' control={control} />
            </Grid>
          </Grid>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} sm={12}>
              <FormLabel sx={{ fontSize: 15, mb: 2, display: 'block' }}>Description</FormLabel>
              <CKeditor editorLoaded={editorLoaded} setValue={setValue} serviceId={serviceId as any} />
              {description && (
                <Typography mt={2} fontWeight={'400'} color={theme.palette.error.main} fontSize={'0.75rem'}>
                  {description?.message}
                </Typography>
              )}
              <Grid container spacing={4} mt={2}>
                <Grid item xs={12} sm={12}>
                  <FormLabel sx={{ fontSize: 15, mb: 2, display: 'block' }}>Course Catalogues</FormLabel>
                  <CataloguesMultiSelect
                    catalogues={getValues('catalogs')}
                    setCourseCatalogue={(selectedCatalogue: []) => {
                      setValue(
                        'catalogs',
                        selectedCatalogue.map((catalogues: ICatalogue) => catalogues?.id)
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} sm={12}>
              <FileUploaderRestrictions
                name='thumbnail'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                maxFiles={1}
                maxSize={10000000000}
                minSize={1}
                control={control}
              />
              {thumbnail && (
                <Typography mt={2} fontWeight={'400'} color={theme.palette.error.main} fontSize={'0.75rem'}>
                  {thumbnail?.message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        <Footer>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            sx={{ mr: 3 }}
            loading={store.status === 'pending'}
            disabled={store.status === 'pending'}
            loadingPosition='end'
            size='large'
            variant='contained'
            type='submit'
            color='primary'
          >
            Submit
          </LoadingButton>
        </Footer>
      </form>
    </Drawer>
  )
}

export default CategoryDrawer
