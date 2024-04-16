import * as React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useReview } from 'src/@core/hooks/apps/useReview'
import { Divider, FormControl, Rating, TextareaAutosize, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { IReview } from 'src/types/apps/review'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import LoadingButton from '@mui/lab/LoadingButton'
import CustomModal from './ReviewModal'
import { useTheme } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

export const renderClient = (row: IReview) => {
  const {
    palette: {
      customColors: { buttonGradient }
    }
  } = useTheme()

  if (row?.user && row?.user?.profile_picture) {
    return (
      <CustomAvatar
        src={row?.user?.profile_picture}
        sx={{ mr: 3, width: 40, height: 40, background: buttonGradient }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem', background: buttonGradient }}
      >
        {getInitials(`${row?.user?.first_name} ${row?.user?.last_name}`)}
      </CustomAvatar>
    )
  }
}

const ReviewComp = () => {
  // ** Props

  const { isDrawerOpen, handleDrawer } = useToggleDrawer()

  const {
    query: { id, slug }
  } = useRouter()

  // ** Hooks
  const { getAllReviewsByPlaylistId, store } = useReview(slug as string)

  const { user } = useAuth()

  const {
    palette: {
      customColors: { bodyBg }
    }
  } = useTheme()

  React.useEffect(() => {
    getAllReviewsByPlaylistId(id as any)
  }, [id])

  return (
    <Box sx={{ '& .MuiDrawer-paper': { width: 700 }, background: 'transparent' }}>
      <Header>
        <Typography variant='h6'>Reviews</Typography>
        <LoadingButton onClick={() => handleDrawer(null)} variant='contained' size='small'>
          Write a review
        </LoadingButton>
      </Header>
      {!store?.reviews?.length && store.status === 'success' ? (
        <Typography variant='h5' textAlign={'center'} mt={10}>
          No Reviews Found
        </Typography>
      ) : (
        <Box sx={{ height: '500px', overflowY: 'scroll' }}>
          {store?.reviews?.map((item: IReview) => {
            return (
              <React.Fragment key={item?.id}>
                <Divider sx={{ mt: 0, mb: 1, width: '100%', marginTop: 10 }} />
                <Box sx={{ display: 'flex', p: 7 }}>
                  <Tooltip
                    title={`${
                      item?.user?.id === user?.id ? 'You' : item?.user?.first_name + ' ' + item?.user?.last_name
                    }`}
                  >
                    {renderClient(item)}
                  </Tooltip>
                  <Box marginTop={'2px'}>
                    <Typography fontSize={'15px'}>
                      {item?.user?.first_name + ' ' + item?.user?.last_name || 'Not Found'}
                    </Typography>
                    <Rating name='half-rating-read' defaultValue={item?.reviews} precision={0.5} readOnly />
                  </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                  <FormControl variant='standard' sx={{ width: '100%', marginX: 7, mb: 5 }}>
                    <TextareaAutosize
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100px',
                        borderRadius: '5px',
                        minHeight: '70px',
                        minWidth: '100%',
                        padding: '10px',
                        maxWidth: '100%',
                        color: bodyBg,
                        fontSize: '16px',
                        lineHeight: '1.4',
                        overflowY: 'scroll',
                        width: '100%'
                      }}
                      defaultValue={item?.description}
                      value={item?.description}
                      disabled
                    />
                  </FormControl>
                </Box>
              </React.Fragment>
            )
          })}
        </Box>
      )}
      <CustomModal open={isDrawerOpen} serviceId={slug as string} toggle={() => handleDrawer(null)} />
    </Box>
  )
}

export default ReviewComp
