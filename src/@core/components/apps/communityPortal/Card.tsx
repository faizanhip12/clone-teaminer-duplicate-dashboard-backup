import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Skeleton from '@mui/material/Skeleton'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { ModalType } from 'src/types'
import { DeleteOutline, DotsVertical, ImageEdit, Share, ThumbUp, Comment } from 'mdi-material-ui'
import { Box, Button, Grid, Menu, MenuItem, Tooltip } from '@mui/material'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { useCommunityFeed } from 'src/@core/hooks/apps/useCommunityFeed'
import LoadingButton from '@mui/lab/LoadingButton'
import { ICommunityFeed } from 'src/types/apps/community-feed'
import { format, compareAsc, formatDistanceToNow } from 'date-fns'
import { AvatarWithImageLink, AvatarWithoutImageLink } from '../../mui/avatar'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useAuth } from 'src/hooks/useAuth'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import PublicIcon from '@mui/icons-material/Public'
import CommentSection from './CommentSection'
import { useRouter } from 'next/router'
import { numFormatter } from '../../numFormatter'
import { useTheme } from '@mui/material/styles'

const RowOptions = ({ id }: { id: string }) => {
  const { handleModal, handleDrawer } = useToggleDrawer()

  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    handleRowOptionsClose()
    handleModal(id, ModalType.COMMUNITYFEED)
  }

  const handleUpdate = () => handleDrawer(id)

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        {/* <MenuItem onClick={handleUpdate}>
          <ImageEdit fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}
      </Menu>
      <DeleteAlert title='client' onAgree={handleDelete} />
    </>
  )
}

// ** renders client column
export const renderClient = (row: ICommunityFeed) => {
  if (row && row?.user?.profile_picture) {
    return <CustomAvatar src={row?.user?.profile_picture} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
        {getInitials(row?.user?.first_name || 'UnKnown')}
      </CustomAvatar>
    )
  }
}

const CommunityCard = ({ feeds }: ICommunityFeed) => {
  const { push, pathname } = useRouter()
  const theme = useTheme()
  const [showComments, setShowComments] = React.useState(false)

  const { user } = useAuth()

  const { serviceId } = useToggleDrawer()

  const { deleteCommunityFeed, store, likePostById, postId } = useCommunityFeed(null)

  const handleDeletePost = () => {
    serviceId && deleteCommunityFeed(serviceId)
  }

  return (
    <Box display={'block'} margin='0  auto'>
      <Card sx={{ maxWidth: '100%', m: 2, minWidth: '100%' }}>
        <CardHeader
          sx={{ cursor: 'pointer' }}
          avatar={
            store.status === 'pending' ? (
              <Skeleton
                animation='wave'
                variant='circular'
                width={40}
                height={40}
                sx={{ background: theme.palette.customColors.skeletongrey }}
              />
            ) : feeds?.user?.profile_picture ? (
              <Tooltip
                title={
                  pathname === '/community-portal/[id]'
                    ? ''
                    : `Want To See ${
                        feeds?.userId === user?.id
                          ? 'Your Posts?'
                          : feeds?.user?.first_name + ' ' + feeds?.user?.last_name + "'s Posts?"
                      }`
                }
                onClick={
                  pathname === '/community-portal/[id]'
                    ? () => console.log('')
                    : () => push(`/community-portal/${feeds?.user?.id}`)
                }
              >
                <CustomAvatar
                  src={feeds?.user?.profile_picture}
                  sx={pathname === '/community-portal/[id]' ? {} : { mr: 3, width: 34, height: 34, cursor: 'pointer' }}
                />
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  pathname === '/community-portal/[id]'
                    ? ''
                    : `Want To See ${
                        feeds?.userId === user?.id
                          ? 'Your Posts?'
                          : feeds?.user?.first_name + ' ' + feeds?.user?.last_name + "'s Posts?"
                      }`
                }
                onClick={
                  pathname === '/community-portal/[id]'
                    ? () => console.log('')
                    : () => push(`/community-portal/${feeds?.user?.id}`)
                }
              >
                <CustomAvatar
                  skin='light'
                  color={'primary'}
                  sx={
                    pathname === '/community-portal/[id]'
                      ? {}
                      : { mr: 3, width: 34, height: 34, fontSize: '1rem', cursor: 'pointer' }
                  }
                  onClick={() => push(`/community-portal/${feeds?.user?.id}`)}
                >
                  {getInitials(feeds?.user?.first_name + ' ' + feeds?.user?.last_name || 'UnKnown')}
                </CustomAvatar>
              </Tooltip>
            )
          }
          action={feeds?.userId === user?.id ? <RowOptions id={feeds?.id as string} /> : null}
          title={feeds?.user?.first_name + ' ' + feeds?.user?.last_name || 'John Doe'}
          subheader={
            feeds?.createdAt ? (
              <>
                {formatDistanceToNow(new Date(feeds?.createdAt), { addSuffix: true })}
                <PublicIcon style={{ marginLeft: 10, verticalAlign: 'middle' }} />
              </>
            ) : null
          }
          // subheader={feeds?.createdAt ? (formatDistanceToNow(new Date(feeds?.createdAt), { addSuffix: true })) + (<PublicIcon />) : null}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary' component='p'>
            {feeds?.content || 'No Content Found'}
          </Typography>
        </CardContent>
        {!feeds?.image ? null : <CardMedia component='img' height='300' image={feeds?.image} alt={feeds?.content} />}
        <Grid md={6} xs={12} sm={12} marginTop={5} marginLeft={5}>
          <Box display={'flex'} flexWrap={'wrap'}>
            <Tooltip title={`Click to ${feeds?.isLiked ? 'unlike' : 'like'} the post`}>
              <LoadingButton
                disabled={postId === feeds?.id}
                loading={postId === feeds?.id}
                style={{
                  border: theme.palette.customColors.grey,
                  marginRight: '10px',
                  marginBottom: '10px'
                }}
                aria-label='Like'
                variant='outlined'
                startIcon={feeds?.isLiked ? <ThumbUp /> : <ThumbUpOffAltIcon />}
                onClick={() => likePostById(feeds?.id)}
              >
                {feeds?.isLiked ? 'Liked' : 'Like'}
                <Box component={'span'} ml={2}>
                  {feeds?.likes_count > 0 ? numFormatter(feeds?.likes_count) : null}
                </Box>
              </LoadingButton>
            </Tooltip>
            <Tooltip title='Click to view comment section'>
              <Button
                style={{
                  border: theme.palette.customColors.grey,
                  marginBottom: '10px'
                }}
                aria-label='Comment'
                variant='outlined'
                startIcon={<Comment />}
                onClick={() => setShowComments(!showComments)}
              >
                Comment
              </Button>
            </Tooltip>
          </Box>
        </Grid>
        {showComments && <CommentSection postId={feeds?.id} />}
      </Card>
      <DeleteAlert title='Feed' type={ModalType.COMMUNITYFEED} onAgree={() => handleDeletePost()} />
    </Box>
  )
}

export default CommunityCard
