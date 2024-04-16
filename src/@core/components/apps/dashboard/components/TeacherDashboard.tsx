import React, { Fragment, useEffect } from 'react'
import TeacherDashboardCard from './TeacherDashboardCard'
import { Grid, Typography } from '@mui/material'
import StarStudentCard from './StarStudentCard'
import PopularCoursesCard from './PopularCoursesCard'
import { useAuth } from 'src/hooks/useAuth'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import LiveEventsOfTheDay from './LiveEventsOfTheDay'
import PersonalCalendarOfTheDay from './PersonalCalendarOfTheDay'

const TeacherDashboard = () => {
  // Hooks
  const { user } = useAuth()

  const { getTeacherDashboardData, store } = useDashboard()

  useEffect(() => {
    getTeacherDashboardData()
  }, [])

  return (
    <Fragment>
      <Typography variant='h6' textTransform={'capitalize'}>
        {`${user?.first_name} ${user?.last_name}` || 'Sleave Johnson'}
      </Typography>
      <Typography variant='h3'>Dashboard</Typography>
      <TeacherDashboardCard />
      <Grid container spacing={5} mt={0} justifyContent={'center'}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LiveEventsOfTheDay />
        </Grid>
      </Grid>
      <Grid container spacing={5} mt={0} justifyContent={'center'}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <PersonalCalendarOfTheDay />
        </Grid>
      </Grid>
      <Grid container spacing={5} mt={0} justifyContent={'center'}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <StarStudentCard />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PopularCoursesCard />
        </Grid>
      </Grid>
      {/* <Grid mt={5}>
        <WatchTimeCard />
      </Grid> */}
    </Fragment>
  )
}

export default TeacherDashboard
