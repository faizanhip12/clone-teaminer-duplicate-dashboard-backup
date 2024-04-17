import { Grid, Theme } from '@mui/material'
import { useId, useState } from 'react'
import { AlignRight } from 'src/@core/constants/styles'
import { CountrySelect, TimeZone } from '../../form'
import LanguageSelect from '../../form/Select/LanguageSelect'
import LoadingButton from '@mui/lab/LoadingButton'
import { makeStyles } from '@mui/styles'
import { IPlaylist } from 'src/types/apps/playlist'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CatalogueSingleSelect from './CatalogueSingleSelect'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

const useStyles = makeStyles(
  ({
    palette: {
      common: { black },
      customColors: { white }
    }
  }: Theme) => ({
    customSelect: {
      border: '1px solid #0c0c0c',
      borderRadius: '8px',
      '& label': {
        color: `${black} !important`,
        background: white
      },
      '& div': {
        background: 'transparent !important',
        borderRadius: '8px',
        color: black
      }
    },
    customLanguage: {
      '& div.MuiAutocomplete-root': {
        border: '1px solid #0c0c0c',
        borderRadius: '8px',
        '& label': {
          color: `${black} !important`,
          background: white
        },
        '& .MuiInputBase-root': {
          background: 'transparent !important',
          color: `${black} !important`
        }
      }
    }
  })
)

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { control, handleSubmit, reset, getValues, setValue } = useForm()

  const [isCatalogueSubmitted, setIsCatalogueSubmitted] = useState(false)

  const [isSearched, setIsSearched] = useState(false)

  const { store, getAllPlaylistOfEveryChannel } = usePlaylist(null)

  const classes = useStyles()

  function onSubmit(body: IPlaylist | any) {
    for (const key in body) {
      if (!body[key]) {
        delete body[key]
      }
    }
    if (JSON.stringify(body) === '{}') {
      return toast.error('Please fill the fields to use filter')
    } else {
      getAllPlaylistOfEveryChannel({ query: body })
      setIsSearched(true)
    }
    reset()
    setIsCatalogueSubmitted(true)
  }

  async function handleResetFilter() {
    setIsSearched(false)
    getAllPlaylistOfEveryChannel({ query: '' })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AlignRight>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} sm={4}>
              <CountrySelect
                control={control}
                key={`country-select-${useId()}`}
                className={classes.customSelect}
                name='country'
                value={getValues('country')}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.customLanguage}>
              <LanguageSelect name='language' control={control} />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.customLanguage}>
              <CatalogueSingleSelect
                execute={false}
                catalogues={getValues('catalogueId')}
                setCatalogues={e => setValue('catalogueId', e?.id)}
                isCatalogueSubmitted={isCatalogueSubmitted}
                setIsCatalogueSubmitted={setIsCatalogueSubmitted}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} mt={2} justifyContent={'center'} gap={10}>
            <LoadingButton
              loading={store.status === 'pending'}
              disabled={store.status === 'pending'}
              loadingPosition='end'
              color={'success'}
              variant='contained'
              type='submit'
            >
              {store?.status === 'pending' ? 'Searching...' : 'Search'}
            </LoadingButton>
            {/* <LoadingButton variant='contained' color='primary' about='#000' type='submit'>
              Search
            </LoadingButton> */}
            <LoadingButton
              variant='contained'
              color='success'
              type='button'
              disabled={!isSearched}
              onClick={() => handleResetFilter()}
            >
              Reset
            </LoadingButton>
          </Grid>
        </AlignRight>
      </form>
    </>
  )
}

export default TableHeader
