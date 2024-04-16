import { Card, Typography, CardContent, Grid, Stack } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useTheme } from '@mui/material/styles'

const DataNotFound = () => {
  const theme = useTheme()
  return (
    <>
      <Grid item xs={12} md={3} sm={6}>
        <Card sx={{ background: theme.palette.linear_gradient.cardGradient }}>
          <Image
            src={'/images/misc/no-results-found.webp'}
            width='600px'
            height='400px'
            alt='Video Image'
            objectFit='cover'
          />
          <CardContent sx={{ position: 'relative', background: theme.palette.linear_gradient.cardGradient }}>
            <Stack direction='row' height='40px' alignItems='center' sx={{ cursor: 'pointer', textAlign: 'center' }}>
              <Typography variant='body1' color={theme.palette.customColors.white} mr='10px' lineHeight='20px'>
                No Records Found
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default DataNotFound
