import React, { useState, useMemo, useEffect } from 'react'

// ** MUI
import Radio from '@mui/material/Radio'
import Autocomplete from '@mui/material/Autocomplete'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'

// Third Party
import { Controller } from 'react-hook-form'

// ** types
import { ICatalogue } from 'src/types/apps/course-catalogue'

// Hooks
import { useTheme } from '@mui/material/styles'
import { useCourseCatalogue } from 'src/@core/hooks/apps/useCourseCatalogue'

interface CataloguesSingleSelect extends BaseTextFieldProps {
  execute?: boolean
  catalogues: ICatalogue | {} | any
  setCatalogues: (project: ICatalogue) => void
  isCatalogueSubmitted?: any
  setIsCatalogueSubmitted?: any
}

export default function CatalogueSingleSelect({
  execute = false,
  catalogues,
  setCatalogues,
  isCatalogueSubmitted,
  setIsCatalogueSubmitted,
  ...props
}: CataloguesSingleSelect) {
  const [selected, setSelected] = useState<ICatalogue | {}>(catalogues)

  const { getCourseCatalogues, store } = useCourseCatalogue(null)

  useEffect(() => {
    execute && getCourseCatalogues({ query: '' })
  }, [])

  useMemo(() => {
    if (typeof selected === 'string') {
      const select = store.entities.find(el => el.id === selected)
      if (select) {
        setSelected(select)
      }
    } else {
      selected && 'id' in selected && setCatalogues(selected)
    }
  }, [selected])

  useEffect(() => {
    if (isCatalogueSubmitted) {
      setSelected({})
      setIsCatalogueSubmitted(false)
    }
  }, [isCatalogueSubmitted])

  const theme = useTheme()

  return (
    <Autocomplete
      fullWidth
      id='catalogue-single-select'
      options={store.entities}
      autoHighlight
      getOptionLabel={(option: ICatalogue) => {
        if (option && 'title' in option) return option.title
        else return ''
      }}
      value={(selected as ICatalogue) || {}}
      onChange={(r, e: any) => setSelected(e)}
      renderOption={(props, option: ICatalogue, { selected }) => (
        <li {...props} style={{ background: theme.palette.customColors.dark }}>
          <Radio checked={selected} />
          {option.title}
        </li>
      )}
      renderInput={params => <TextField {...params} {...props} label='Select Catalogue' placeholder='Catalogue' />}
    />
  )
}

interface CataloguesSingleSelectWithFormProps {
  control: any
  name: string
}

export const CataloguesSingleSelectWithForm: React.FC<CataloguesSingleSelectWithFormProps> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <CatalogueSingleSelect
          execute={false}
          error={Boolean(error)}
          catalogues={value}
          setCatalogues={catalogues => onChange(catalogues.id)}
        />
      )}
    />
  )
}
