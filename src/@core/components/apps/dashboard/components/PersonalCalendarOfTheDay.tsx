import { useEffect } from 'react'
import { Grid, Skeleton, Typography, useTheme } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { GraphBox } from 'src/@core/constants/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { IMyEvents } from 'src/types/apps/dashboard'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'

const PersonalCalendarOfTheDay = () => {
  const theme = useTheme()

  const { push } = useRouter()

  const { getAllMyEventsOfTheDay, myEventsOftheDay, myEventsStatus, setMyEventsOftheday } = useDashboard()

  useEffect(() => {
    getAllMyEventsOfTheDay()

    return () => {
      setMyEventsOftheday([])
    }
  }, [])

  function redirection({ eventType, playlistId, videoId }: IMyEvents) {
    if (eventType === 'COURSE') {
      push(`course/${playlistId}/event`)
    } else if (eventType === 'GENERAL') {
      push('/calendar')
    } else if (playlistId && videoId) {
      push(`course/${playlistId}/video/${videoId}`)
    } else {
      push('/calendar')
    }
  }

  return (
    <GraphBox
      sx={{
        height: (myEventsStatus === 'Success' && !myEventsOftheDay?.length) || myEventsStatus === 'Error' ? 150 : 260,
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
          width: '2px'
        },
        '&:empty': {
          height: 'auto'
        },
        borderRadius: 1
      }}
    >
      <Typography variant='h6' color={theme.palette.customColors.white}>
        My Events Of The Day
      </Typography>
      {myEventsStatus === 'Pending' ? (
        <Skeleton
          variant='rectangular'
          sx={{ height: '90%', width: '100%', background: theme.palette.customColors.skeletongrey }}
        />
      ) : (myEventsStatus === 'Success' && !myEventsOftheDay?.length) || myEventsStatus === 'Error' ? (
        <Grid container spacing={5} mt={0} justifyContent={'center'}>
          <Typography mt={5} color={theme.palette.customColors.white}>
            No Events For Today
          </Typography>
        </Grid>
      ) : (
        myEventsOftheDay?.map((personalEvent: IMyEvents) => {
          return (
            <Grid container spacing={5} mt={0} justifyContent={'space-between'} key={personalEvent.id}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography
                  variant='h6'
                  display={'flex'}
                  alignItems={'center'}
                  color={theme.palette.customColors.white}
                >
                  {`${personalEvent?.title} ` || 'Technical law'}
                  <Typography
                    variant='subtitle1'
                    fontSize={13}
                    ml={2}
                    mt={1}
                  >{`(${personalEvent.description})`}</Typography>
                </Typography>
                <Typography variant='body2' color={theme.palette.customColors.white}>
                  {personalEvent?.start
                    ? formatDistanceToNow(new Date(personalEvent?.start || '17 Sep 2023'), { addSuffix: true })
                    : '17 Sep 2023'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12} ml={'auto'} textAlign={'right'}>
                <LoadingButton
                  loadingPosition='end'
                  size='large'
                  variant='contained'
                  color='primary'
                  onClick={() => redirection(personalEvent)}
                >
                  View Event
                </LoadingButton>
              </Grid>
            </Grid>
          )
        })
      )}
    </GraphBox>
  )
}

export default PersonalCalendarOfTheDay
