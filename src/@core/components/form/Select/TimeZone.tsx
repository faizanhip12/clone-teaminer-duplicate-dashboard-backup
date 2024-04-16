import React, { useEffect, useState, useId } from 'react'

// ** MUI
import Box from '@mui/material/Box'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** form handling lib
import { useController, UseControllerProps } from 'react-hook-form'

interface ITimeZone {
  offset: number
  value: string
  abbr: string
  isdst: boolean
  text: string
  utc: []
}

interface IField extends UseControllerProps, BaseTextFieldProps {
  name: string
  control: UseControllerProps['control']
}

export default function TimeZone({ control, ...props }: IField) {
  // ** States
  const [timezone, setTimeZone] = useState<ITimeZone[] | []>([])

  // ** Hooks
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields }
  } = useController({
    ...props,
    control
  })

  const loadJson = (): Promise<any> => {
    return new Promise((res, rej) => {
      import(`src/@fake-db/countries/timezone.json`).then(data => {
        res(data?.default)
      })
    })
  }

  const loadJsonAsync = async () => {
    const messages = await loadJson()
    // onChange(messages[0].name)
    setTimeZone(messages)
  }

  useEffect(() => {
    loadJsonAsync()
  }, [])

  return (
    <Autocomplete
      id={`timeZone-select-${useId()}`}
      fullWidth
      options={timezone}
      autoHighlight
      getOptionLabel={option => (typeof option === 'string' ? option : option.value)}
      isOptionEqualToValue={() => true}
      value={value || ''}
      // ts-ignore
      onChange={(event: any, newValue: { iso2: string; value: string }) => {
        newValue && onChange(newValue.value)
      }}
      renderOption={(props, option) => (
        <Box component='li' key={option.value} sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.value}
        </Box>
      )}
      renderInput={params => {
        return (
          <FormControl fullWidth>
            <TextField
              {...params}
              label='Select Time Zone'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password' // disable autocomplete and autofill
              }}
            />
            {error && (
              <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-${name}`}>
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
