import { Grid, Typography } from '@mui/material'
import { GraphBox } from 'src/@core/constants/styles'
import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { IPopularCourse } from 'src/types/apps/dashboard'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'

const PopularCoursesCard = () => {
  // Hooks
  const theme = useTheme()
  const { store } = useDashboard()
  const { push } = useRouter()

  return (
    <>
      <GraphBox
        sx={{
          borderRadius: 1
        }}
      >
        <Typography variant='h6'>Popular Courses</Typography>
        {store.status === 'success' && !store.teacherEntity?.popularCourses?.length ? (
          <Grid container spacing={5} mt={0} justifyContent={'center'}>
            <Typography mt={5}>No Records Exists</Typography>
          </Grid>
        ) : (
          store.teacherEntity?.popularCourses?.map((popularCourse: IPopularCourse) => {
            return (
              <Grid container spacing={5} mt={0} justifyContent={'space-between'} key={popularCourse.createdAt}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant='h6' color={theme.palette.customColors.white}>
                    {popularCourse?.courseName || 'Technical law'}
                  </Typography>
                  <Typography variant='body2' color={theme.palette.customColors.white}>
                    {popularCourse?.createdAt
                      ? formatDistanceToNow(new Date(popularCourse?.createdAt || '17 Sep 2023'), { addSuffix: true })
                      : '17 Sep 2023'}
                    , View {popularCourse?.viewsCount || 0} people
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} ml={'auto'} textAlign={'center'}>
                  <LoadingButton
                    loadingPosition='end'
                    size='large'
                    variant='contained'
                    color='primary'
                    onClick={() => push(`/channels/${popularCourse?.channelId}/courses/`)}
                  >
                    View Course
                  </LoadingButton>
                </Grid>
              </Grid>
            )
          })
        )}
      </GraphBox>
    </>
  )
}

export default PopularCoursesCard
