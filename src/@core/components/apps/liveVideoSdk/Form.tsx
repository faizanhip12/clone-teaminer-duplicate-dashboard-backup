import * as React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { Card, CardProps, FormHelperText, Grid, Theme } from '@mui/material'
import { InputField } from '../../form'
import FileUploaderRestrictions from './FileUploader'
import PlayListSingleSelect from '../courses/components/Video/SelectPlaylist'
import { IPlaylist } from 'src/types/apps/playlist'
import { useTheme } from '@mui/material/styles'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import { makeStyles } from '@mui/styles'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

const useStyles = makeStyles((theme: Theme) => ({
  titleField: {
    borderRadius: '8px'
  },
  mainTitle: {
    color: '#fff'
  }
}))

export const inputStyle = {
  font: 'inherit',
  border: '1px solid #07c',
  borderRadius: '8px',
  // background: 'none',
  height: '1.4375em',
  margin: '1.25rem 0',
  display: 'block',
  width: '100%',
  padding: '26px 14px',
  fontFamily: 'Inter,sans-serif,-apple-system,BlinkMacSystemFont',
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '1.4375em',
  letterSpacing: '0.15px',
  color: 'rgba(234, 234, 255, 0.87)',
  colorScheme: 'dark'
}

const Header = styled(Card)<CardProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(5, 10),
  justifyContent: 'space-between',
  borderBottom: 1
}))

const GoLiveForm = () => {
  const {
    form: {
      control,
      handleSubmit,
      getValues,
      setValue,
      formState: { errors },
      reset
    },
    store
  } = useCourses(null)

  const { store: playlistStore } = usePlaylist(null)

  const classes = useStyles()

  const { createLiveVideoEvent, store: videoStore } = useVideo(null)

  const [isOpen, setIsOpen] = React.useState(false)

  const [startAt, setStartAt] = React.useState('')

  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false)

  const theme = useTheme()

  const onSubmit = async (data: any) => {
    delete data.subtitles
    delete data.assignment
    delete data.fileId
    delete data.visibility

    data.startAt = new Date(startAt)

    const { statusCode } = await createLiveVideoEvent(data)
    if (statusCode) {
      setIsFormSubmitted(true)
      reset()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        background: theme.palette.customColors.darkBg,
        borderRadius: 10
      }}
    >
      <Header>
        <Typography className={classes.mainTitle} variant='h6'>
          {'Schedule Live Streaming'}
        </Typography>
        <LoadingButton
          loading={videoStore.status === 'pending'}
          disabled={videoStore.status === 'pending' || !playlistStore.entities?.length}
          loadingPosition='end'
          size='large'
          variant='contained'
          color='primary'
          type='submit'
        >
          Create
        </LoadingButton>
      </Header>
      {!playlistStore.entities?.length && (
        <Typography color={theme.palette.customColors.white} variant='body2' textAlign={'center'} mt={5}>
          Please create a course first in which you want to create a live event
        </Typography>
      )}
      <Grid container>
        <Grid item xs={12} sx={{ padding: 5 }}>
          <InputField
            name='title'
            label='Title (required)'
            placeholder='final wo music'
            rows={3}
            type='text-area'
            control={control}
            disabled={!playlistStore.entities?.length}
            className={classes.titleField}
          />
          <InputField
            sx={{ marginTop: 5, mb: 5 }}
            name='description'
            label='Description'
            placeholder='Tell viewers about your video'
            type='text-area'
            rows={5}
            disabled={!playlistStore.entities?.length}
            control={control}
          />
          <PlayListSingleSelect
            execute={true}
            playlist={getValues('playlistId')}
            setPlaylist={e => setValue('playlistId', e?.id as string)}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isFormSubmitted={isFormSubmitted}
            setIsFormSubmitted={setIsFormSubmitted}
          />
          {isOpen && playlistStore.entities?.length ? (
            <React.Fragment>
              <Box marginBottom={20}></Box>
            </React.Fragment>
          ) : null}
          <input
            style={inputStyle}
            type='datetime-local'
            id='birthdaytime'
            name='birthdaytime'
            onChange={e => {
              setStartAt(e.target.value)
            }}
            disabled={!playlistStore.entities?.length}
            required
          />
        </Grid>
        <Grid sx={{ padding: 5 }} textAlign={'start'}>
          <Typography variant='h6' fontSize={'19px'} color={theme.palette.customColors.white}>
            Thumbnail
          </Typography>
          <Typography component={'p'} fontSize={'15px'} color={theme.palette.customColors.white}>
            Select or upload a picture that shows what's in your content. A good thumbnail stands out and draws viewers'
            attention.{' '}
            <Box component={'span'} color={theme.palette.customColors.themeColor}>
              Learn more
            </Box>
          </Typography>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} paddingBottom={'12px'}>
            <Box sx={{ flexGrow: 1, margin: 10 }}>
              <FileUploaderRestrictions
                name='thumbnail_url'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                maxFiles={1}
                maxSize={10000000000}
                minSize={1}
                control={control}
              />
              {errors.thumbnail_url && (
                <FormHelperText sx={{ color: theme.palette.error.main, mt: 5 }}>
                  {errors.thumbnail_url?.message}
                </FormHelperText>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default GoLiveForm
