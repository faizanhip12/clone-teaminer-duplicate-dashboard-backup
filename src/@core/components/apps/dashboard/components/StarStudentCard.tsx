// import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'
// // ** Next Import
// import Link from 'next/link'
// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Menu from '@mui/material/Menu'
// import Grid from '@mui/material/Grid'
// import { DataGrid, GridToolbar } from '@mui/x-data-grid'
// import MenuItem from '@mui/material/MenuItem'
// import { styled } from '@mui/material/styles'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import InputLabel from '@mui/material/InputLabel'
// import FormControl from '@mui/material/FormControl'
// import CardContent from '@mui/material/CardContent'
// import Select, { SelectChangeEvent } from '@mui/material/Select'
// // ** Icons Imports
// import Laptop from 'mdi-material-ui/Laptop'
// import ChartDonut from 'mdi-material-ui/ChartDonut'
// import CogOutline from 'mdi-material-ui/CogOutline'
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
// import { ImageEdit } from 'mdi-material-ui'

// import AccountOutline from 'mdi-material-ui/AccountOutline'
// // ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'
// // ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'
// // ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'
// // ** Actions Imports
// import { useTeacher } from 'src/@core/hooks/form/useTeachers'
// // ** Import Custom hooks
// import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
// // ** Types Imports
// import { ITeacher } from 'src/types/apps/teacher'
// import { RootState, AppDispatch } from 'src/store'
// import Image from 'next/image'
// import { useReview } from 'src/@core/hooks/apps/useReview'
// import { Rating } from '@mui/material'
// import { GraphBox } from 'src/@core/constants/styles'

// interface CellType {
//   row: ITeacher
// }

// // ** renders client column
// export const renderClient = (row: ITeacher) => {
//   if (row?.user?.profile_picture) {
//     return <CustomAvatar src={row?.user?.profile_picture} sx={{ mr: 3, width: 34, height: 34 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={row.avatarColor || 'primary'}
//         sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
//       >
//         {getInitials(row?.user?.first_name + ' ' + row?.user?.last_name)}
//       </CustomAvatar>
//     )
//   }
// }

// const columns = [
//   {
//     flex: 0.2,
//     minWidth: 230,
//     field: 'teacher_name',
//     headerName: 'Teachers',
//     renderCell: ({ row }: CellType) => {
//       return (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
//             {renderClient(row)}
//             <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
//               {row.playlist.channel.name} {row.playlist.channel.slug}
//             </Typography>
//           </Box>
//         </Box>
//       )
//     }
//   },
//   {
//     flex: 0.2,
//     minWidth: 150,
//     field: 'course_name',
//     headerName: 'Course Name',
//     renderCell: ({ row }: CellType) => {
//       return (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
//             <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
//               {row.playlist.name || 'John Doe'}
//             </Typography>
//           </Box>
//         </Box>
//       )
//     }
//   },
//   {
//     flex: 0.2,
//     minWidth: 150,
//     field: 'description',
//     headerName: 'Review',
//     renderCell: ({ row }: CellType) => {
//       return (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
//             <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
//               {row.description || 123}
//             </Typography>
//           </Box>
//         </Box>
//       )
//     }
//   }
//   // {
//   //   flex: 0.2,
//   //   minWidth: 250,
//   //   field: 'Payment',
//   //   headerName: 'Payment',
//   //   renderCell: ({ row }: CellType) => {
//   //     return (
//   //       <Typography noWrap variant='body2'>
//   //         {row.stripe_customerId || 'null'}
//   //       </Typography>
//   //     )
//   //   }
//   // },
//   // {
//   //   flex: 0.1,
//   //   minWidth: 110,
//   //   field: 'status',
//   //   headerName: 'Status',
//   //   renderCell: ({ row }: CellType) => {
//   //     return (
//   //       <CustomChip
//   //         skin='light'
//   //         size='small'
//   //         label={row.email_status}
//   //         color={row.email_status === 'VERIFIED' ? 'success' : 'error'}
//   //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
//   //       />
//   //     )
//   //   }
//   // },
// ]

// const StarStudentCard = () => {
//   // ** State
//   const [pageSize, setPageSize] = useState<number>(10)

//   const { getAllReviews } = useReview(null)

//   useEffect(() => {
//     getAllReviews({ query: '' })
//     return () => {}
//   }, [])

//   // ** Hooks
//   const store = useSelector((state: RootState) => state?.review)

//   return (
//     <GraphBox>
//       <Typography variant='h6'>Star Students</Typography>

//       <DataGrid
//         autoHeight
//         rows={store.entities.slice(0, 2) || []}
//         columns={columns}
//         // checkboxSelection
//         pageSize={pageSize}
//         disableSelectionOnClick
//         rowsPerPageOptions={[10, 25, 50]}
//         sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
//         onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
//       />
//     </GraphBox>
//   )
// }

// export default StarStudentCard

import { Grid, Rating, Typography } from '@mui/material'
import { GraphBox } from 'src/@core/constants/styles'
import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { ILatestReviews } from 'src/types/apps/dashboard'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'

const PopularCoursesCard = () => {
  const {
    palette: {
      customColors: { bodyBg, themeColor, white }
    }
  } = useTheme()

  const { store } = useDashboard()

  const { push } = useRouter()

  return (
    <>
      <GraphBox
        sx={{
          borderRadius: 1
        }}
      >
        <Typography variant='h6'>Latest Reviews</Typography>
        {store.status === 'success' && !store.teacherEntity?.popularCourses?.length ? (
          <Grid container spacing={5} mt={0} justifyContent={'center'}>
            <Typography mt={5}>No Records Exists</Typography>
          </Grid>
        ) : !store.teacherEntity?.latestReviews?.length && store.status === 'success' ? (
          <Grid container spacing={5} mt={0} justifyContent={'space-between'}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography variant='h6' color={bodyBg} textAlign={'right'}>
                No Reviews Found
              </Typography>
            </Grid>
          </Grid>
        ) : (
          store.teacherEntity?.latestReviews?.map((latestReviews: ILatestReviews) => {
            return (
              <Grid container spacing={5} mt={0} justifyContent={'space-between'} key={latestReviews.createdAt}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant='h6' color={white}>
                    {latestReviews?.courseName || 'Technical law'}
                  </Typography>
                  <Rating
                    name='half-rating-read'
                    defaultValue={latestReviews?.starCount}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                  <Typography variant='body2' color={white}>
                    {latestReviews?.createdAt
                      ? formatDistanceToNow(new Date(latestReviews?.createdAt), { addSuffix: true })
                      : '17 Sep 2023'}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} ml={'auto'} textAlign={'right'}>
                  <LoadingButton
                    loadingPosition='end'
                    size='large'
                    variant='contained'
                    color='primary'
                    onClick={() => push(`/channels/${latestReviews?.channelId}/courses/`)}
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
