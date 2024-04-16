// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'
import { useContext } from 'react'
import { AlignRight } from 'src/@core/constants/styles'
import { AbilityContext } from 'src/layouts/components/acl/Can'

import CanViewTable from 'src/layouts/components/acl/CanViewTable'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, toggle } = props

  const ability = useContext(AbilityContext)

  return (
    <>
      <AlignRight>
        {ability.can('itsHaveAccess', 'create-playlist-button') ? (
          <Button variant='contained' onClick={() => toggle()} color='primary'>
            Create Courses
          </Button>
        ) : null}
      </AlignRight>
    </>
  )
}

export default TableHeader
