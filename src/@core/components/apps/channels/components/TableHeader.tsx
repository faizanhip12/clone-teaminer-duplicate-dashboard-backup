// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icons Imports
import { useContext } from 'react'
import { AlignRight } from 'src/@core/constants/styles'
import { AbilityContext } from 'src/layouts/components/acl/Can'

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
        {ability.can('itsHaveAccess', 'create-channel-button') ? (
          <Button variant='contained' onClick={() => toggle()} color='primary'>
            Create Channel
          </Button>
        ) : null}
      </AlignRight>
    </>
  )
}

export default TableHeader
