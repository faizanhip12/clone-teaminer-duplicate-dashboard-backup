export interface IDashboard {
  [key: string]: any
  teacherStudentsCount?: number
  monthRaisePercentage: number
  thisMonthSale: number
  thisWeekSale: number
  weekSaleRaisePercentage: number
  monthSaleRaisePercentage: number
  thisMonthEnrollmentsCount: number
  studentPoints?: {
    totalPoints?: any
    monthlyBasis?: []
  }
  teacherCoursesCount?: any
  teacherStudentCertificatesCount?: any
  popularCourses?: []
  studentVideosWatched?: []
  referralList?: []
  latestReviews?: []
  popularCourses?: []
}

export interface IPopularCourse {
  courseName?: string
  createdAt?: string
  reviewCount?: number
  channelId?: string
  viewsCount?: number
}

export interface ILiveEvents {
  event: {
    start: Date | string
    title: string
    description: string
    videoId: string
    playlistId: string
  }
}

export interface IMyEvents {
  id: string
  start: Date | string
  description: string
  title: string
  videoId: string
  playlistId: string
  eventType: 'SCHEDULED' | "GENERAL" | "COURSE"
}

export interface ILatestReviews {
  courseName?: string
  reviewContent?: string
  reviewedBy?: string
  createdAt?: string
  channelId?: string
  starCount?: number
}

export interface IWatchedVideo {
  channelId?: string
  playlistId?: string
  channelName?: string
  thumbnail_url?: string
  title: string
  videoId?: string
}

export interface IReferral {
  profile_picture: string
  first_name?: string
  last_name?: string
  referredUserId?: string
}

export interface IMonthlyData {
  monthName: string
  totalPoints?: number
}
