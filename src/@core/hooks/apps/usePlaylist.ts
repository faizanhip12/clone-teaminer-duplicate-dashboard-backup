import { useEffect, useMemo, useState } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { playListSchema } from 'src/@core/schema'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import {
  fetchAllAction,
  fetchOneAction,
  addAction,
  updateAction,
  deleteAction,
  fetchOneActionEnroll,
  fetchAllStudentsAction,
  fetchAllActionOfEveryCourse
} from 'src/store/apps/playlist'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useRouter } from 'next/router'
import { IPlaylist } from 'src/types/apps/playlist'
import { GetParams } from 'src/services/service'

const defaultValues = {
  name: '',
  description: '',
  country: '',
  timeZone: '',
  language: '',
  thumbnail: '',
  catalogs: []
}

export const usePlaylist = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state?.playlist)
  const dispatch = useDispatch<AppDispatch>()

  const {
    query: { id: channelId }
  } = useRouter()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(playListSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store?.entity && serviceId) {
      'name' in store.entity && form.setValue('name', store.entity.name)
      'description' in store.entity && form.setValue('description', store.entity.description)
      'country' in store.entity && form.setValue('country', store.entity.country)
      'thumbnail' in store.entity && form.setValue('thumbnail', store.entity.thumbnail)
      'language' in store.entity && form.setValue('language', store.entity.language)
      'timeZone' in store.entity && form.setValue('timeZone', store.entity.timeZone)
      'catalogs' in store.entity && form.setValue('catalogs', store.entity.catalogs?.map((ele: IPlaylist) => ele.id))
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getPlaylistById = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllPlaylist = async (id: string) => {
    dispatch(fetchAllAction(id))
  }

  const getAllPlaylistOfEveryChannel = async ({ query }: GetParams) => {
    dispatch(fetchAllActionOfEveryCourse({ query }))
  }

  const getAllPlaylistStudents = async (id: string) => {
    dispatch(fetchAllStudentsAction(id))
  }

  const enrollInAPlaylist = async (body: any) => {
    const { payload } = await dispatch(fetchOneActionEnroll(body))
    if (payload?.statusCode === '10000') {
      return payload
    }
  }

  const addPlaylist = async (body: any) => {
    const { payload } = await dispatch(addAction({ ...body }))
    if (payload?.statusCode === '10000') {
      form.reset()
      form.setValue("description", '')
      handleDrawer(null)
      return payload
    }
    // dispatch(addAction({ ...data })).then(({ payload }: any) => {
    //   if (payload?.statusCode === '10000') {
    //     console.log(payload, 'PAyload')
    //     form.reset()
    //     handleDrawer(null)
    //     return payload
    //   } else {
    //     // console.log('============API_ERROR===============')
    //     // console.log(payload)
    //     // console.log('====================================')
    //   }
    // })
  }

  const updatePlaylist = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
        getAllPlaylist(channelId as string)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deletePlaylist = async (id: string) => {
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

  const exportPlaylist = async () => {
    csvDownload('playlist', store.entities)
  }

  return {
    form,
    store,
    getPlaylistById,
    getAllPlaylist,
    getAllPlaylistOfEveryChannel,
    addPlaylist,
    updatePlaylist,
    deletePlaylist,
    exportPlaylist,
    enrollInAPlaylist,
    getAllPlaylistStudents
  }
}
