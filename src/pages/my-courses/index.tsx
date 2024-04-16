import React, { useEffect } from 'react'
import { Box, BoxProps, Card, Icon, Tooltip, Typography, styled } from '@mui/material'
import { Grid } from '@mui/material'
import Link from 'next/link'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import LoadingButton from '@mui/lab/LoadingButton'
import ProgressBox from 'src/@core/components/apps/current-course/components/ProgressBox'
import { IUser } from 'src/types/apps/user'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useAuth } from 'src/hooks/useAuth'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { ICourses } from 'src/types/apps/courses'
import { useRouter } from 'next/router'
import { textOverflow } from 'src/@core/helper/text'
import { useTheme } from '@mui/material/styles'

const ProfileBox = styled('div')<BoxProps>(({ theme }) => ({
  textAlign: 'center',
  color: '#000',
  marginBottom: '50px',

  [`${theme.breakpoints.down('md')}`]: {}
}))

const ProfileImage = styled('div')<BoxProps>(({ theme }) => ({
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  [`${theme.breakpoints.down('md')}`]: {}
}))

const CourcesFlex = styled('div')<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
  [`${theme.breakpoints.down('md')}`]: {}
}))
const CourcesLink = styled('div')<BoxProps>(({ theme }) => ({
  borderRadius: '12px',
  background: ' #131313',
  padding: '18px',
  width: '100%',
  maxWidth: '48%',
  textAlign: 'left',
  [`${theme.breakpoints.down('md')}`]: {}
}))

const HeadingBox = styled('div')<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
  [`${theme.breakpoints.down('md')}`]: {}
}))

// ** renders client column
export const renderClient = (row: IUser) => {
  if (row && row?.profile_picture) {
    return <CustomAvatar src={row?.profile_picture} sx={{ width: 73, height: 73 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={row.avatarColor || 'primary'} sx={{ width: 73, height: 73 }}>
        {getInitials(row?.first_name + ' ' + row?.last_name || 'UnKnown')}
      </CustomAvatar>
    )
  }
}

const Page = () => {
  const { getAllMyCourses, store } = useCourses(null)
  const theme = useTheme()
  useEffect(() => {
    getAllMyCourses({ query: '4' })
  }, [])

  const { user } = useAuth()

  const { push } = useRouter()

  return (
    <>
      <Box>
        <Grid container spacing={10}>
          <Grid item md={4}>
            <Card sx={{ padding: 10, paddingBottom: 40 }}>
              <ProfileBox>
                <ProfileImage>{renderClient(user as IUser)}</ProfileImage>
                <Typography variant='h5' color='white' fontWeight='bold'>
                  {user?.first_name + ' ' + user?.last_name}
                </Typography>
                <Typography variant='body1' color='white'>
                  {/* Member Since 2022{' '} */}
                </Typography>
              </ProfileBox>
              <CourcesFlex>
                <Tooltip title='Click to view all courses'>
                  <CourcesLink onClick={() => push('/my-courses/all')} sx={{ cursor: 'pointer' }}>
                    <Typography variant='h6' color={theme.palette.customColors.grey} marginBottom='10px'>
                      {store.entities[0]?.courseCount > 1 ? 'Courses' : 'Course'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='h6' fontWeight='bold' fontSize='16px' color='white'>
                        {store.entities[0]?.courseCount < 10
                          ? '0' + store.entities[0]?.courseCount
                          : store.entities[0]?.courseCount || 0}
                      </Typography>
                      <Icon
                        style={{
                          background: '#fff',
                          height: '25px',
                          width: '25px',
                          borderRadius: '50%',
                          color: '#000',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          pointerEvents: 'none'
                        }}
                      >
                        <ArrowForwardIosIcon style={{ fontSize: '15px', fontWeight: 'bold' }} />
                      </Icon>
                    </Box>
                  </CourcesLink>
                </Tooltip>
                <Tooltip title='Click to view all certificates'>
                  <CourcesLink onClick={() => push('/my-courses/allCertificates')} sx={{ cursor: 'pointer' }}>
                    <Typography variant='h6' color={theme.palette.customColors.grey} marginBottom='10px'>
                      Certificates
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='h6' fontWeight='bold' fontSize='16px' color='white'>
                        {store.entities?.[0]?.certificateCount < 10
                          ? '0' + store.entities[0]?.certificateCount
                          : store.entities[0]?.certificateCount || 0}
                      </Typography>
                      <Link style={{ display: 'block' }} href=''>
                        <Icon
                          style={{
                            background: '#fff',
                            height: '25px',
                            width: '25px',
                            borderRadius: '50%',
                            color: '#000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowForwardIosIcon style={{ fontSize: '15px', fontWeight: 'bold' }} />
                        </Icon>
                      </Link>
                    </Box>
                  </CourcesLink>
                </Tooltip>
              </CourcesFlex>

              <Box>
                <Typography variant='h5' color='white' marginBottom='20px'>
                  Bio
                </Typography>
                <Typography variant='body1' color='white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Typography>
                <Typography variant='body1' color='white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item md={8}>
            <HeadingBox>
              <Typography variant='h3' color={theme.palette.customColors.themeColor}>
                Current Courses
              </Typography>
              <LoadingButton variant='contained' onClick={() => push('/my-courses/all')} color='primary'>
                View All Courses
              </LoadingButton>
            </HeadingBox>
            <Grid container spacing={8} sx={{
              justifyContent:"center"
            }}>
              {store?.entities?.map((item: ICourses) => {
                return (
                  <Grid item md={6} key={item?.id}>
                    <ProgressBox
                      key={item?.id}
                      channelId={item?.channelId}
                      class={textOverflow(item?.name as string, 18) || 'UI Design Beginner'}
                      totalcourses={`${item?.totalVideosCompletedCount || 0}/${item?.courseCompletePercentage || 100}`}
                      courseCompletePercentage={item?.courseCompletePercentage}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'my-courses-page'
}

export default Page
