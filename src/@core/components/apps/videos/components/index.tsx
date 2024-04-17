import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Typography,
  CardMedia,
  Stack,
  Button,
  Box,
  Avatar,
  Grid,
  Skeleton,
  BoxProps,
  IconButton,
  IconButtonProps,
  Tooltip
} from '@mui/material'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import CheckIcon from '@mui/icons-material/Check'
import { convertToTimestamp } from 'src/@core/helper/convertToTimestamp'
import CommentSection from 'src/@core/components/apps/videos/components/CommentSection'
import ShareVideo from 'src/@core/components/apps/videos/components/VideoShare'
import { useDispatch } from 'react-redux'
import { emptyVideo, emptyVideosOfCurrentChannel } from 'src/store/apps/video'
import Link from 'next/link'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import LoadingButton from '@mui/lab/LoadingButton'
import { textOverflow } from 'src/@core/helper/text'
import { IVideo } from 'src/types/apps/video'
import { styled } from '@mui/material/styles'
import LiveIcon from '@mui/icons-material/LiveTv'
import toast from 'react-hot-toast'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { AuthContext } from 'src/context/AuthContext'
import dynamic from 'next/dynamic'
import { add, format, formatDistanceToNow } from 'date-fns'
import SocialMediaButtons from 'src/@core/components/apps/videos/components/SocialMediaButtons'
import { ModalType } from 'src/types'
import { useTheme } from '@mui/material/styles'
import { VideoService } from 'src/services'

const LiveVideoSDK = dynamic(() => import('src/@core/components/apps/liveVideoSdk/LiveVideoSDK'), {
  ssr: false // Disable server-side rendering
})

const ThumbnailBox = styled(Box)<BoxProps>(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative'
}))

const IconButtonWrapper = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  position: 'absolute',
  right: 0
}))

const LiveStartAtBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  left: 0,
  padding: '4px 10px',
  background: theme.palette.common.black,
  borderRadius: 5,
  lineHeight: 0,
  margin: '10px',
  width: 'auto',
  boxShadow: `-1px 3px 3px 4px ${theme.palette.customColors.dark}`
}))

const VideoComp = ({ videoIndex }: { videoIndex: number }) => {
  const ability = useContext(AbilityContext)
  const { user } = useContext(AuthContext)
  const theme = useTheme()
  const {
    query: { id, slug },
    pathname,
    push
  } = useRouter()

  const videoRef: any = useRef(null)

  const { handleModal } = useToggleDrawer()

  const handleDelete = async () => {
    handleModal(null)
    // handleRowOptionsClose()
  }

  const [flag, setFlag] = useState(false)

  const dispatch = useDispatch()

  const { store, getVideoBySlug, likeVideoById, saveVideoById, startVideoStreaming, status } = useVideo(null)
  const [video, setVideo] = useState({})
  const routeSegments = pathname?.split('/')
  const lastSegment = routeSegments.pop()

  const selectedVideoIndex = store?.allVideosOfCurrentChannel?.findIndex(item => item?.id === slug)

  const [currentVideoIndex, setCurrentVideoIndex] = useState(selectedVideoIndex)

  const handleVideoEnded = () => {
    const nextIndex = currentVideoIndex + 1
    if (nextIndex < store?.allVideosOfCurrentChannel?.length) {
      const nextVideoSlug = store?.allVideosOfCurrentChannel[nextIndex]?.id
      if (user?.role?.code === 'SUPER_ADMIN') {
        setCurrentVideoIndex(nextIndex)
        push(`/course/${id}/video/${nextVideoSlug}`) // Change URL and navigate to next video
      }
      if (store?.allVideosOfCurrentChannel[nextIndex]?.isLocked) return
      setCurrentVideoIndex(nextIndex)
      push(`/course/${id}/video/${nextVideoSlug}`) // Change URL and navigate to next video
    }
  }

  useEffect(() => {
    getVideoBySlug(slug as string, id as string)
    setVideo(video)
    setCurrentVideoIndex(selectedVideoIndex)
  }, [slug])

  useEffect(() => {
    setVideo(store?.entity)
    setCurrentVideoIndex(selectedVideoIndex)
  }, [store?.entity, selectedVideoIndex])

  useEffect(() => {
    if (!store?.entity?.subtitles) return
    if (flag) return
    if (store?.entity?.status !== 'UPLOADED') return
    const VTTFile = makeVTT(store?.entity?.subtitles)
    const vid: any = videoRef.current
    const track: any = document.createElement('track')
    track.kind = 'captions'
    track.label = 'English'
    track.srclang = 'en'
    track.src = URL.createObjectURL(VTTFile)
    vid.addEventListener('loadedmetadata', (evt: any) => {
      track.mode = 'showing'
      vid.textTracks[0].mode = 'showing' // thanks Firefox
    })
    vid.append(track)
    function makeVTT(array: any) {
      setFlag(true)

      const text: any = array?.reduce((str: any, { start, end, text }: any, index: number) => {
        // you would also have to make a "seconds to timestamp" parser
        // but I leave it to the reader as an exercise

        const formatedTimeStamp = convertToTimestamp(start, end)

        // 00:00:10.500 --> 00:00:13.000

        return (
          str +
          `
        ${formatedTimeStamp}
        ${text}`
        )
      }, `WEBVTT`)

      return new Blob([text], { type: 'text/plain' })
    }

    return () => {
      vid?.removeEventListener('loadedmetadata', (evt: any) => {
        track.mode = 'showing'
        vid.textTracks[0].mode = 'showing' // thanks Firefox
      })
    }
  }, [store?.entity])

  // For User's Video Watching Time
  // API Calling After Every 5 Seconds
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef?.current?.paused) {
        setSeconds(seconds + 1)
      }
    }, 1000)

    // API Calling After Every 5 Seconds

    if (seconds % 5 === 0 && seconds !== 0 && user?.role?.code === 'STUDENT' && !videoRef?.current?.paused) {
      VideoService.addVideosWatchedTime({
        countVideosWatchTime: 5
      })
    }

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  useEffect(() => {
    return () => {
      dispatch(emptyVideo())
      dispatch(emptyVideosOfCurrentChannel())
    }
  }, [])

  const renderMediaPlayer = (video: IVideo) => {
    if (video?.status === 'UPLOADED') {
      return (
        <CardMedia
          component='video'
          key={store.allVideosOfCurrentChannel[currentVideoIndex]?.id}
          autoPlay
          muted // Add this attribute
          onEnded={lastSegment === 'assignment' ? null : (handleVideoEnded as any)}
          ref={videoRef}
          width='100%'
          height='250px'
          controls
          style={{ boxShadow: 'rgb(255 255 255 / 10%) 0px 30px 30px' }}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 0,
            borderRadius: 1,
            p: 0,
            minWidth: '30%',
            minHeight: 500,
            gap: 2,
            mt: 4,
            objectFit: 'cover'
          }}
        >
          <source
            src={
              store?.allVideosOfCurrentChannel[currentVideoIndex]?.file?.public_source_url ||
              video?.file?.public_source_url
            }
            type='video/mp4'
          />
        </CardMedia>
      )
    } else if (video?.status === 'WAITING_FOR_LIVE') {
      return (
        <ThumbnailBox>
          <IconButtonWrapper color='error'>
            <LiveIcon />
          </IconButtonWrapper>
          <LiveStartAtBox>
            <Typography variant='caption' color={theme.palette.customColors.white}>
              Live
              <Box component={'span'}> {formatDistanceToNow(new Date(video.startAt), { addSuffix: true })}</Box>
              <Box component={'br'} />
              <Box component={'span'}> At {format(add(new Date(video.startAt), { days: 7 }), 'p (zzzz)')}</Box>
            </Typography>
          </LiveStartAtBox>
          <CardMedia
            component='img'
            image={video?.thumbnail_url}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 0,
              borderRadius: 1,
              p: 0,
              minWidth: '30%',
              minHeight: 200,
              maxHeight: 500,
              gap: 2,
              mt: 4,
              objectFit: 'cover'
            }}
          />
        </ThumbnailBox>
      )
    } else if (video.status === 'IS_LIVED') {
      return <LiveVideoSDK roomId={video.roomId} video={video} />
    } else if (video?.status === 'END') {
      return (
        <Typography variant='h4' textAlign={'center'}>
          This live session has ended
        </Typography>
      )
    } else
      return (
        <Typography variant='h4' textAlign={'center'}>
          Video not found
        </Typography>
      )
  }

  const startStreaming = async (video: any) => {
    await startVideoStreaming(video.id)
  }

  if (store?.status === 'pending') {
    return <Skeleton width={'100%'} height={600} sx={{ background: theme.palette.customColors.skeletongrey }} />
  }

  return (
    <>
      <Box sx={{ width: '100% ', overflow: 'hidden' }}>
        <>
          {renderMediaPlayer(store?.entity)}
          <Typography variant='h5' mb={5} mt={10}>
            {store?.allVideosOfCurrentChannel?.length
              ? store?.allVideosOfCurrentChannel[currentVideoIndex]?.title
              : store?.entity?.title || 'Not Found'}
          </Typography>
          <Grid md={12} xs={12}>
            <Stack direction='row' spacing={10} mt={3} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Grid md={6} xs={12} sm={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center',gap:'10px' }}>
                  <Link href={`/channels/${store?.entity?.channel?.id}`}>
                    <Tooltip title={`Click to view ${store?.entity?.channel?.name} channel`}>
                      <Avatar
                        src={store?.entity?.channel?.thumnail_url || '/images/avatars/Group.png'}
                        sx={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50px',
                          cursor: 'pointer'
                        }}
                      />
                    </Tooltip>
                  </Link>
                  <Stack direction='column' >
                    {/* <Typography variant='h4' margin={0} mt={2}></Typography> */}
                    <Box display={'flex'} m={'auto'} flexWrap={'wrap'}>
                      <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'}>
                        <Typography variant='body1' sx={{
                          lineHeight:"5px"
                        }}>
                          {store?.entity &&
                            'channel' in store?.entity &&
                            'name' in (store?.entity?.channel as { name: string }) &&
                            (textOverflow((store?.entity?.channel as { name: string }).name, 22) || 'John Doe')}
                          <CheckIcon
                            sx={{
                              mt: '19px',
                              width: '12px',
                              height: '12px',
                              background: theme.palette.customColors.grey,
                              ml: 2,
                              borderRadius: '50%'
                            }}
                          />
                        </Typography>
                        <Typography variant='body1'>
                          {store?.entity &&
                            'channel' in store?.entity &&
                            (store?.entity?.channel?.subscribre_count > 1
                              ? store?.entity?.channel?.subscribre_count + ' Subscribers'
                              : store?.entity?.channel?.subscribre_count + ' Subscriber')}
                        </Typography>
                      </Box>
                      {/* <Typography variant='body1' marginTop={3} ml='20px'> */}
                        {/* {store?.allVideosOfCurrentChannel?.length
                            ? formatDistanceToNow(
                                new Date(store?.allVideosOfCurrentChannel[currentVideoIndex]?.createdAt)
                              )
                            : store?.entity?.createdAt
                            ? formatDistanceToNow(new Date(store?.entity?.createdAt), { addSuffix: true })
                            : null} */}
                      {/* </Typography> */}
                    </Box>
                  </Stack>
                </Box>
              </Grid>
              <Grid md={6} xs={12} sm={12}>
                <Box display={'flex'} marginLeft={'auto'} flexWrap={'wrap'} sx={{
                  gap:'10px',
                  justifyContent:'end'
                }}>
                  {ability.can('itsHaveAccess', 'START_STREAMING_BUTTON') ?
                    store?.entity?.channelId === user?.activeChannel?.channel.id ? (
                      <>
                        {
                          store?.entity?.status === 'WAITING_FOR_LIVE' ? (
                            <LoadingButton
                              loadingPosition='end'
                              variant='outlined'
                              color='success'
                              sx={{ marginRight: '20px', marginBottom: '10px' }}
                              startIcon={<LiveIcon style={{ backgroundColor: 'transparent' }} />}
                              onClick={() => startStreaming(store.entity)}
                            >
                              Start Streaming
                            </LoadingButton>
                          ) : store?.entity?.status === 'IS_LIVED' ? null : null // </LoadingButton> //   End Streaming // > //   onClick={() => toast.error('End in progress')} //   startIcon={<LiveIcon style={{ backgroundColor: 'transparent' }} />} //   sx={{ marginRight: '20px', marginBottom: '10px' }} //   color='primary' //   variant='contained' //   loadingPosition='end' // <LoadingButton
                        }
                      </>
                    ) : null : null}
                  <SocialMediaButtons
                    currentVideoId={
                      store?.allVideosOfCurrentChannel?.length
                        ? (store?.allVideosOfCurrentChannel[currentVideoIndex]?.id as string)
                        : (slug as string)
                    }
                  />
                </Box>
              </Grid>
            </Stack>
          </Grid>
        </>
        <ShareVideo title='videoShare' type={ModalType.SHARE} onAgree={handleDelete} />
      </Box>
    </>
  )
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default VideoComp
