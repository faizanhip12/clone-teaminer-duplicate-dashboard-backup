import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, Skeleton, Typography, useTheme } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useEffect } from 'react'
import { GraphBox } from 'src/@core/constants/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { ILiveEvents } from 'src/types/apps/dashboard'

const LiveEventsOfTheDay = () => {
  const { getAllLiveEventsOfTheDay, liveEventsStatus, liveEventsOftheDay, setLiveEventsOftheday } = useDashboard()

  useEffect(() => {
    getAllLiveEventsOfTheDay()

    return () => {
      setLiveEventsOftheday([])
    }
  }, [])

  const theme = useTheme()

  return (
    <GraphBox
      sx={{
        height:
          (liveEventsStatus === 'Success' && !liveEventsOftheDay?.length) || liveEventsStatus === 'Error' ? 150 : 260,
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
        Live Events Of The Day
      </Typography>
      {liveEventsStatus === 'Pending' ? (
        <Skeleton
          variant='rectangular'
          sx={{ height: '90%', width: '100%', background: theme.palette.customColors.skeletongrey }}
        />
      ) : liveEventsStatus === 'Success' && !liveEventsOftheDay?.length ? (
        <Grid container spacing={5} mt={0} justifyContent={'center'}>
          <Typography mt={5} color={theme.palette.customColors.white}>
            No Events For Today
          </Typography>
        </Grid>
      ) : liveEventsStatus === 'Error' ? (
        <Grid container spacing={5} mt={0} justifyContent={'center'}>
          <Typography mt={5} color={theme.palette.customColors.white}>
            An Error Occurred
          </Typography>
        </Grid>
      ) : (
        liveEventsOftheDay?.map((liveEvent: ILiveEvents) => {
          return (
            <Grid container spacing={5} mt={0} justifyContent={'space-between'} key={liveEvent?.event?.videoId}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography
                  variant='h6'
                  display={'flex'}
                  alignItems={'center'}
                  color={theme.palette.customColors.white}
                >
                  {`${liveEvent?.event?.title} ` || 'Technical law'}
                  <Typography
                    variant='subtitle1'
                    fontSize={13}
                    mt={1}
                    ml={2}
                  >{`(${liveEvent?.event?.description})`}</Typography>
                </Typography>
                <Typography variant='body2' color={theme.palette.customColors.white}>
                  {liveEvent?.event?.start
                    ? formatDistanceToNow(new Date(liveEvent?.event?.start || '17 Sep 2023'), { addSuffix: true })
                    : '17 Sep 2023'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12} ml={'auto'} textAlign={'right'}>
                <Link href={`course/${liveEvent?.event?.playlistId}/video/${liveEvent?.event?.videoId}`}>
                  <LoadingButton loadingPosition='end' size='large' variant='contained' color='primary'>
                    View Live Event
                  </LoadingButton>
                </Link>
              </Grid>
            </Grid>
          )
        })
      )}
    </GraphBox>
  )
}

export default LiveEventsOfTheDay
