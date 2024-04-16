import React, { useState, useMemo, useEffect } from 'react'
import _ from 'lodash'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useCourseCatalogue } from 'src/@core/hooks/apps/useCourseCatalogue'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** types
import { ICatalogue } from 'src/types/apps/course-catalogue'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

interface ILabelMultiSelect {
  courseCatalogue: ICatalogue[]
  setCourseCatalogue: (catalogue: ICatalogue[]) => void
}

export default function MultiSelect({ courseCatalogue, setCourseCatalogue }: ILabelMultiSelect) {
  const [selected, setSelected] = useState<ICatalogue[] | []>([])
  const { getCourseCatalogues, store } = useCourseCatalogue(null)
  const { isDrawerOpen } = useToggleDrawer()
  const [autocompleteKey, setAutocompleteKey] = useState(0)

  useEffect(() => {
    getCourseCatalogues({ query: '' })
  }, [])

  useMemo(() => {
    setSelected(courseCatalogue)
  }, [courseCatalogue])

  useMemo(() => {
    if (_.isArray(selected)) {
      setCourseCatalogue(selected)
    }
  }, [selected])

  useEffect(() => {
    if (!isDrawerOpen) {
      setSelected([])
      setAutocompleteKey(prevKey => prevKey + 1) // Force remounting Autocomplete by changing the key
    }
  }, [isDrawerOpen])

  return (
    <Autocomplete
      key={autocompleteKey}
      fullWidth
      multiple
      id='label-multi-select'
      options={store?.entities}
      getOptionLabel={(option: ICatalogue) => option?.title}
      value={selected}
      onChange={(r, e) => setSelected(e as ICatalogue[])}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option?.title}
        </li>
      )}
      renderInput={params => <TextField {...params} label='Select Course Catalogue' placeholder='Course Catalogues' />}
    />
  )
}
