import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/course-catalogue'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { courseCatalogueSchema } from 'src/@core/schema'

const defaultValues = {
  title: '',
  thumbnail: '',
}

export const useCourseCatalogue = (serviceId: string | null) => {
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(courseCatalogueSchema.add)
  })

  // ** Hook

  const { handleDrawer, handleModal } = useToggleDrawer()

  const store = useSelector((state: RootState) => state.course_catalogue)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])


  useMemo(() => {
    if (store?.entity && serviceId) {
      'title' in store?.entity && form.setValue('title', store?.entity?.title as string)
      'thumbnail' in store?.entity && form.setValue('thumbnail', store?.entity?.thumbnail as string)
    } else {
      form.reset()
    }
  }, [store?.entity, serviceId])

  const getCourseCatalogue = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getCourseCatalogues = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addCourseCatalogue = async (data: any) => {
    dispatch(addAction({ ...data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleDrawer(null)
        form.reset()
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const updateCourseCatalogue = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleDrawer(null)
        form.reset()
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deleteCourseCatalogue = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleModal(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const exportCourseCatalogues = async () => {
    csvDownload('CourseCatalogues', store.entities)
  }

  return {
    form,
    store,
    getCourseCatalogue,
    getCourseCatalogues,
    addCourseCatalogue,
    updateCourseCatalogue,
    deleteCourseCatalogue,
    exportCourseCatalogues
  }
}
