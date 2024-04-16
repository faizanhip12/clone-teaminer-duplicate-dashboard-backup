import React, { useContext, useEffect } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import AdminDashboard from './AdminDashboard'
import TeacherDashboard from './TeacherDashboard'
import StudentDashboard from './StudentDashboard'

const RootLandingDashboard = () => {
  // Hooks

  const { getAllWeeklySales } = useDashboard()

  const ability = useContext(AbilityContext)

  useEffect(() => {
    // getAllWeeklySales()
  }, [])

  return (
    <>
      {ability.can('itsHaveAccess', 'admin-dashboard') ? <AdminDashboard /> : null}
      {ability.can('itsHaveAccess', 'teacher-dashboard') ? <TeacherDashboard /> : null}
      {ability.can('itsHaveAccess', 'student-dashboard') ? <StudentDashboard /> : null}
    </>
  )
}

export default RootLandingDashboard
