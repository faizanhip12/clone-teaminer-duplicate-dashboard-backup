// ** React Imports
import React, { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Table from 'src/@core/components/apps/points/components/Table'
import { useStudents } from 'src/@core/hooks/apps/useStudents'
import { MenuItem, Typography, Select, InputLabel, useTheme, FormControl, } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchPoints } from 'src/store/apps/students'

const Page = () => {
  // ** Hooks
  const { getAllStudentsPoints, store } = useStudents(null)

  const {
    palette: {
      customColors: { tableHeaderBg }
    }
  } = useTheme()

  const dispatch = useDispatch<AppDispatch>()

  const [points, setPoints] = React.useState('All')

  useEffect(() => {
    getAllStudentsPoints({ query: '' })
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid
        item
        xs={12}
        display={'flex'}
        justifyContent={'space-between'}
        sx={{
          background: tableHeaderBg,
          marginBottom: '20px !important',
          alignItems: 'center',
          padding: '20px 20px',
          borderRadius: '5px'
        }}
      >
        <Typography variant='h4' mt={2} mb={2} color={'white'}>
          Receive Points
        </Typography>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id='demo-simple-select-label'>Points</InputLabel>
          <Select
            disabled={store.status === "pending"}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={points}
            label='Filter Points'
            onChange={e => {
              setPoints(e.target.value)
              dispatch(fetchPoints(e.target.value))
            }}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Daily'}>Daily</MenuItem>
            <MenuItem value={'Weekly'}>Weekly</MenuItem>
            <MenuItem value={'Monthly'}>Monthly</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Table />
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'points-page'
}

export default Page
