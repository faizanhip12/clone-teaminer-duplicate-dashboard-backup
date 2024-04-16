import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import FileUploaderRestrictions from './FileUploader'
import { InputField } from 'src/@core/components/form'
import { Grid, FormLabel } from '@mui/material'
import FormCheckbox from 'src/@core/components/form/Checkbox'
import { Close } from 'mdi-material-ui'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'

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

const ChannelDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
      reset
    },
    addChannel,
    store,
    getAllChannels,
    updateChannelById
  } = useChannels(serviceId)

  const theme = useTheme()

  const onSubmit = async (body: any) => {
    if (body.isAgreed == undefined) {
      body.isAgreed = false
    } else if (!body?.introVideo) {
      delete body?.introVideo
    }
    if (serviceId) {
      await updateChannelById(serviceId, body)
    } else {
      const { statusCode } = await addChannel(body)
      if (statusCode === '10000') {
        getAllChannels({ query: '' })
      }
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
      sx={{ '& .MuiDrawer-paper': { width: 800, [theme.breakpoints.down('sm')]: {width: '80%'} } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>{!serviceId ? 'Create Channel' : 'Update Channel'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ padding: 5 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12}>
              <InputField name='name' label='Channel Name' placeholder='Enter Name' control={control} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField name='slug' label='Channel Slug' placeholder='Enter Slug' control={control} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField
                type='text-area'
                rows={6}
                fullWidth
                name='about'
                label='Channel About'
                placeholder='Enter About'
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormLabel sx={{ display: 'block', marginBottom: 2, color: theme.palette.customColors.white }}>
                Channel Thumbnail
              </FormLabel>
              <FileUploaderRestrictions
                name='thumnail_url'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                maxFiles={1}
                maxSize={10000000000}
                minSize={1}
                control={control}
              />
              {errors?.thumnail_url && (
                <Typography mt={2} fontWeight={'400'} color={theme.palette.error.main} fontSize={'0.75rem'}>
                  {errors?.thumnail_url?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormLabel sx={{ display: 'block', marginBottom: 2, color: theme.palette.customColors.white }}>
                Intro Video
              </FormLabel>
              <FileUploaderRestrictions
                name='intro_video'
                accept={{ 'video/*': ['.mp4'] }}
                maxFiles={1}
                maxSize={10000000000}
                minSize={1}
                control={control}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12}>
            <Grid item xs={12} display={'flex'} alignItems='center'>
              <FormCheckbox
                control={control}
                name='isAgreed'
                sx={{ color: theme.palette.customColors.white }}
                color='primary'
              />
              <Typography
                component={'p'}
                textAlign={'left'}
                lineHeight={1.3}
                fontSize={14}
                sx={{ width: '100%', mt: 5, color: theme.palette.customColors.white }}
              >
                <Box component='span' color={theme.palette.customColors.white} sx={{ textDecoration: 'underLine' }}>
                  Term & Conditions
                </Box>{' '}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries,
              </Typography>
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

export default ChannelDrawer
