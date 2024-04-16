import { Box, Grid, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { IChannels } from 'src/types/apps/channels'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { unset } from 'lodash'
import { FlexBoxes, GraphBox, RightBox, SmallGrayText } from 'src/@core/constants/styles'
import { useTheme } from '@mui/material/styles'

export const renderClient = (row: IChannels) => {
  if (row?.profile_picture) {
    return <CustomAvatar src={row?.profile_picture} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '1rem' }}
      >
        {getInitials(row?.first_name + ' ' + row?.last_name)}
      </CustomAvatar>
    )
  }
}

const Page = () => {
  const { getAllTopInstructors, topInstructors } = useDashboard()
  const theme = useTheme()
  useEffect(() => {
    getAllTopInstructors()
  }, [])

  return (
    <GraphBox
      sx={{
        borderRadius: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h6'>Top Instructors</Typography>
        {/* <Typography variant='caption' sx={{ cursor: 'pointer' }}>
          View All
        </Typography> */}
      </Box>
      <Box
        sx={{
          height: !topInstructors?.length ? '50px' : '260px',
          overflowY: 'scroll',
          '::-webkit-scrollbar': {
            width: '2px'
          },
          '&:empty': {
            height: 'auto'
          }
        }}
      >
        {!topInstructors?.length ? (
          <Typography variant='h6'>No Records Found</Typography>
        ) : (
          topInstructors?.map((instructors: IChannels) => {
            return (
              <FlexBoxes key={instructors.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {renderClient(instructors)}
                  <Box display={'flex'} flexDirection={'column'} marginLeft={'10px'}>
                    <Typography variant='caption' color={theme.palette.customColors.white}>
                      {instructors?.first_name + ' ' + instructors?.last_name || 'No Name Found'}
                    </Typography>
                    <Typography variant='caption'>{instructors?.email}</Typography>
                  </Box>
                </Box>
                <RightBox sx={{ marginRight: 2 }}>
                  <Box sx={{ color: 'white' }}>
                    <Rating
                      name='read-only'
                      value={parseInt(instructors.reviews as string) || 0}
                      readOnly
                      size='small'
                    />
                  </Box>
                  <SmallGrayText>25 Reviews</SmallGrayText>
                </RightBox>
              </FlexBoxes>
            )
          })
        )}
      </Box>
    </GraphBox>
  )
}

export default Page
