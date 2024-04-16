import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { dashboardService } from 'src/services'
import Services from 'src/services/event.service'
import { AppDispatch, RootState } from 'src/store'
import { AdminFetchOneAction, TeacherFetchOneAction, studentFetchOneAction } from 'src/store/apps/dashboard'

export const useDashboard = () => {

  // ** Hook
  const [weeksData, setWeeksData] = useState('')
  const [weeklyPercentage, setWeeklyPercentage] = useState(0)
  const [monthlyPercentage, setMonthlyPercentage] = useState(0)
  const [monthsData, setMonthsData] = useState('')
  const [topInstructors, setTopInstructors] = useState([])
  const [yearlyRepresentation, setYearlyRepresentation] = useState([])
  const [totalSalesWeekly, setTotalSalesWeekly] = useState<{
    sumOfPricesWeekly: number
    percentageChange: number
  } | null>(null)
  const [totalSalesMonthly, setTotalSalesMonthly] = useState<{
    percentageChange: number
    totalSales: number
  } | null>(null)
  const [liveEventsStatus, setLiveEventsStatus] = useState<"Pending" | "Success" | "Idle" | "Error">("Idle")
  const [myEventsStatus, setMyEventsStatus] = useState<"Pending" | "Success" | "Idle" | "Error">("Idle")
  const [liveEventsOftheDay, setLiveEventsOftheday] = useState([])
  const [myEventsOftheDay, setMyEventsOftheday] = useState([])
  const [studentMilestones, setStudentMilestones] = useState([])
  const [milestoneStatus, setMilestoneStatus] = useState<"Pending" | "Success" | "Idle" | "Error">("Idle")

  const dispatch = useDispatch<AppDispatch>()

  const store = useSelector((state: RootState) => state.dashboard)

  const getWeeks = async () => {
    const { data }: any = await dashboardService.getAllWeeks()
    setWeeksData(data?.data?.users)
  }

  const getMonths = async () => {
    const { data }: any = await dashboardService.getAllMonths()
    setMonthsData(data?.data?.users)
  }

  const getAllTopInstructors = async () => {
    const { data }: any = await dashboardService.getAllTopInstructors()
    if (data?.statusCode === '10000') {
      setTopInstructors(data?.data?.entities)
    }
  }

  const getAllEnrollmentInWeeks = async () => {
    const { data }: any = await dashboardService.getAllEnrollmentInWeeks()
    if (data?.statusCode === '10000') {
      setWeeklyPercentage(data?.data?.percentageChange)
    }
  }

  const getAllEnrollmentInMonths = async () => {
    const { data }: any = await dashboardService.getAllEnrollmentInMonths()
    if (data?.statusCode === '10000') {
      setMonthlyPercentage(data?.data?.percentageChange)
    }
  }

  const getAllGraphicalRepresentation = async () => {
    const { data }: any = await dashboardService.getAllGraphicalRepresentation()
    if (data?.statusCode === '10000') {
      setYearlyRepresentation(data?.data?.yearlyRegistrations)
    }
  }

  const getAllLiveEventsOfTheDay = async () => {
    setLiveEventsStatus("Pending")
    const { data }: any = await Services.getAllLiveEvents()
    if (data?.statusCode === '10000') {
      setLiveEventsStatus("Success")
      setLiveEventsOftheday(data?.data?.entity)
    } else {
      setLiveEventsStatus("Error")
    }
  }

  const getAllMyEventsOfTheDay = async () => {
    setMyEventsStatus("Pending")
    const { data }: any = await Services.getAllMyEvents()
    if (data?.statusCode === '10000') {
      setMyEventsStatus("Success")
      setMyEventsOftheday(data?.data?.events)
    } else {
      setMyEventsStatus("Error")
    }
  }

  const getAllWeeklySales = async () => {
    const { data }: any = await dashboardService.getAllSalesWeekly()
    if (data?.statusCode === '10000') {
      setTotalSalesWeekly(data?.data)
    }
  }

  const getAllMonthlySales = async () => {
    const { data }: any = await dashboardService.getAllSalesMonthly()
    if (data?.statusCode === '10000') {
      setTotalSalesMonthly(data?.data)
    }
  }

  const getStudentMilestones = async () => {
    setMilestoneStatus('Pending')
    const { data }: any = await dashboardService.getAllMilestones()
    if (data?.statusCode === '10000') {
      setStudentMilestones(data?.data?.milestones)
      setMilestoneStatus('Success')
    } else {
      setMilestoneStatus('Error')
    }
  }

  const getTeacherDashboardData = async () => {
    dispatch(TeacherFetchOneAction(''))
  }

  const getStudentDashboardData = async () => {
    dispatch(studentFetchOneAction(''))
  }
  const getAdminDashboardData = async () => {
    dispatch(AdminFetchOneAction(''))
  }

  return {
    getWeeks,
    getMonths,
    getAllTopInstructors,
    getAllEnrollmentInWeeks,
    getAllGraphicalRepresentation,
    getAllEnrollmentInMonths,
    getAllWeeklySales,
    getAllMonthlySales,
    getTeacherDashboardData,
    getStudentDashboardData,
    getAdminDashboardData,
    getAllLiveEventsOfTheDay,
    getAllMyEventsOfTheDay,
    getStudentMilestones,
    weeksData,
    monthsData,
    topInstructors,
    weeklyPercentage,
    monthlyPercentage,
    yearlyRepresentation,
    totalSalesWeekly,
    totalSalesMonthly,
    store,
    liveEventsStatus,
    liveEventsOftheDay,
    setLiveEventsOftheday,
    myEventsOftheDay,
    myEventsStatus,
    setMyEventsOftheday,
    setStudentMilestones,
    studentMilestones,
    milestoneStatus,
    setMilestoneStatus
  }
}
