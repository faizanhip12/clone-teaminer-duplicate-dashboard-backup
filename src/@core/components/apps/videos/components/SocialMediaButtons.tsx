import React, { Fragment } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import ThumbUp from '@mui/icons-material/ThumbUp'
import { Share, Download } from 'mdi-material-ui'
import SaveIcon from '@mui/icons-material/Save'
import { Box, Button, Tooltip } from '@mui/material'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

const SocialMediaButtons = ({ currentVideoId }: { currentVideoId: string }) => {
  const { store, getVideoBySlug, likeVideoById, saveVideoById, startVideoStreaming, status } = useVideo(null)

  const { handleModal } = useToggleDrawer()

  const getLikedByVideoId = (id: string) => {
    likeVideoById(id)
  }

  const handleDelete = async () => {
    handleModal(null)
    // handleRowOptionsClose()
  }

  const onSave = (id: string) => {
    saveVideoById(id)
  }
  const theme = useTheme()

  const { push } = useRouter()

  if (store.entity?.file?.public_source_url) {
    return (
      <Fragment>
        <Tooltip title={`Click to ${store.videoForLikes?.isLiked ? 'unlike' : 'like'} this video`}>
          <LoadingButton
            loading={status === 'pending'}
            disabled={status === 'pending'}
            loadingPosition='end'
            style={{
              border: theme.palette.customColors.grey,
              borderRadius: '90px',
              // marginRight: '20px',
              marginBottom: '10px',
              width: '150px'
            }}
            aria-label='Like'
            variant='contained'
            color={store.videoForLikes?.isLiked ? 'success' : 'primary'}
            startIcon={<ThumbUp style={{ backgroundColor: 'transparent' }} />}
            onClick={() => getLikedByVideoId(currentVideoId)}
          >
            {store.videoForLikes &&
              'isLiked' in store.videoForLikes &&
              (store.videoForLikes?.isLiked ? 'Liked' : 'Like')}
            <Box component={'span'} ml={2}>
              {store.videoForLikes && 'likes_count' in store.videoForLikes && store.videoForLikes?.likes_count}
            </Box>
          </LoadingButton>
        </Tooltip>
        <Tooltip title={`Click to share this video`}>
          <Button
            style={{
              // marginRight: '20px',

              border: theme.palette.customColors.grey,
              borderRadius: '90px',
              marginBottom: '10px',
              width: '150px'
            }}
            aria-label='Share'
            variant='contained'
            color='primary'
            startIcon={<Share />}
            onClick={handleDelete}
          >
            Share
          </Button>
        </Tooltip>
        <Tooltip title={`Click to ${store.videoForLikes?.isSaved ? 'unsave' : 'save'} this video`}>
          <LoadingButton
            loading={status === 'pending' && store.videoForLikes?.isSaved}
            disabled={status === 'pending'}
            loadingPosition='end'
            style={{
              border: theme.palette.customColors.grey,
              borderRadius: '90px',
              marginBottom: '10px',
              width: '150px'
            }}
            color={store.videoForLikes?.isSaved ? 'success' : 'primary'}
            aria-label='Save'
            variant='contained'
            startIcon={<SaveIcon style={{ backgroundColor: 'transparent' }} />}
            onClick={() => onSave(currentVideoId)}
          >
            {store.videoForLikes &&
              'isSaved' in store.videoForLikes &&
              (store.videoForLikes?.isSaved ? 'Saved' : 'Save')}
          </LoadingButton>
        </Tooltip>
        <Tooltip title={`Click to download this video`}>
          <LoadingButton
            style={{
              border: theme.palette.customColors.grey,
              borderRadius: '90px',
              marginBottom: '10px',
              marginLeft: 0,
              width: '150px'
            }}
            aria-label='Download'
            variant='contained'
            startIcon={<Download style={{ backgroundColor: 'transparent' }} />}
            onClick={() => push(store?.entity?.file?.public_source_url)}
          >
            Download
          </LoadingButton>
        </Tooltip>
      </Fragment>
    )
  }
  return null
}

export default SocialMediaButtons
