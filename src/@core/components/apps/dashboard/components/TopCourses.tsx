import { Box, Tooltip, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { FlexBoxes, GraphBox, RightBox, SmallGrayText } from 'src/@core/constants/styles'
import { textOverflow } from 'src/@core/helper/text'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { ICourses } from 'src/types/apps/courses'
import { IPlaylist } from 'src/types/apps/playlist'

const Page = () => {
  const { getAllTopCourses, topCourses } = useCourses(null)
  const { store } = useDashboard()
  const theme = useTheme()
  useEffect(() => {
    // getAllTopCourses()
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
        <Typography variant='h6' color={theme.palette.customColors.white}>
          Top Courses
        </Typography>
        {/* <Typography variant='caption'>View All</Typography> */}
      </Box>
      <Box
        sx={{
          height: !store?.adminEntity?.popularCourses?.length && store.status === 'success' ? '50px' : '260px',
          overflowY: 'scroll',
          '::-webkit-scrollbar': {
            width: '2px'
          },
          '&:empty': {
            height: 'auto'
          }
        }}
      >
        {!store?.adminEntity?.popularCourses?.length && store.status === 'success' ? (
          <Typography variant='h6'>No Records Found</Typography>
        ) : (
          store?.adminEntity?.popularCourses?.map((item: ICourses) => {
            return (
              <FlexBoxes key={item.id}>
                <Link href={`channels/${item?.channelId}/courses`}>
                  <Tooltip title={`Click to view ${item?.courseName}`}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Image
                        src={item?.thumbnail_url || '/images/avatars/dummy.png'}
                        alt='dummy'
                        height={'29px'}
                        width={'30px'}
                      />
                      <Typography
                        variant='caption'
                        sx={{ marginLeft: '10px' }}
                        color={theme.palette.customColors.white}
                      >
                        {textOverflow(item?.courseName, 40)}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Link>

                {/* <RightBox>
              <Typography variant='body1' sx={{ display: 'block', color: 'white' }}>
                $2,125.00
              </Typography>
              <SmallGrayText>25 Sold</SmallGrayText>
            </RightBox> */}
              </FlexBoxes>
            )
          })
        )}
      </Box>
    </GraphBox>
  )
}

export default Page
