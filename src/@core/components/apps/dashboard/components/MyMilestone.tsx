// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid, { GridProps } from '@mui/material/Grid'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAuth } from 'src/hooks/useAuth'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { Fragment, useEffect } from 'react'
import { Skeleton } from '@mui/material'
import { IMilestone } from 'src/types/apps/milestone'

// Styled CardContent component
const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(7, 7.5)} !important`,
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  }
}))

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

const CardCongratulationsDaisy = () => {
  // ** Hook
  const { settings } = useSettings()

  const { user } = useAuth()

  const { getStudentMilestones, studentMilestones, setStudentMilestones, milestoneStatus } = useDashboard()

  useEffect(() => {
    getStudentMilestones()

    return () => {
      setStudentMilestones([])
    }
  }, [])

  const theme = useTheme()

  return (
    <Card sx={{ position: 'relative', mt: 5 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
        <Box
          sx={{
            height: 150,
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              width: '2px'
            },
            '&:empty': {
              height: 'auto'
            }
          }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5' sx={{ mb: 4.5 }} color={theme.palette.customColors.white}>
                {' '}
                <Box component='span' sx={{ fontWeight: 'bold' }}>
                  Achieved Milestones
                </Box>
                ! 🎉
              </Typography>
              {milestoneStatus === 'Success' && studentMilestones.length ? (
                <Typography variant='h5' sx={{ mb: 4.5 }} color={theme.palette.customColors.white}>
                  Congratulations{' '}
                  <Box component='span' sx={{ fontWeight: 'bold' }}>
                    {user?.first_name + ' ' + user?.last_name}
                  </Box>
                  ! 🎉
                </Typography>
              ) : null}
              {milestoneStatus === 'Pending' ? (
                <Skeleton
                  variant='rectangular'
                  sx={{ height: '90%', width: '100%', background: theme.palette.customColors.skeletongrey }}
                />
              ) : milestoneStatus === 'Success' && !studentMilestones.length ? (
                <Typography variant='h5' sx={{ mb: 4.5 }} color={theme.palette.customColors.white}>
                  <Box component='span' sx={{ fontWeight: 'bold' }}>
                    You Haven't Achieved Any Milestones Yet!😕
                  </Box>
                </Typography>
              ) : (
                studentMilestones.map(({ milestone }: IMilestone, index: number) => {
                  return (
                    <Fragment key={milestone.id}>
                      <Typography variant='body2' color={theme.palette.customColors.white}>
                        {index + 1 + ') ' + milestone.name + ' (' + milestone.bonus_points} Points) 😍
                      </Typography>
                      <Typography sx={{ mb: 4.5 }} variant='body2' color={theme.palette.customColors.white}>
                        {milestone.description}
                      </Typography>
                    </Fragment>
                  )
                })
              )}
            </Grid>
            <StyledGrid item xs={12} sm={6}>
              <Img
                alt='Congratulations Daisy'
                src={`/images/cards/illustration-${user?.gender === 'MALE' ? 'john-' : 'daisy-'}${settings.mode}.png`}
              />
            </StyledGrid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardCongratulationsDaisy
