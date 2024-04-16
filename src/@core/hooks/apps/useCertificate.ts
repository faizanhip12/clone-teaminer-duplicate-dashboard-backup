import { useEffect, useMemo, useState } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

// import { studentSchema } from 'src/@core/schema'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { certificateService } from 'src/services'

// const defaultValues = {
//   role: 'STUDENT',
//   first_name: '',
//   last_name: '',
//   email: '',
//   // password: '',
//   phone: '',
//   gender: ''
// }

export const useCertificate = (serviceId: string | null) => {
  // ** Hook

  const [certificateData, setCertificateData] = useState<{
    playList?: {
      name?: string
    }
    user?: {
      first_name?: string
      last_name?: string
    }
    createdAt: Date
  } | null>(null)

  const form = useForm({
    mode: 'onChange'
  })

  const getCertificate = async (id: string, studentId: string) => {
    const { data } = await certificateService.getById(id, studentId)
    if (data?.statusCode === '10000') {
      setCertificateData(data?.data?.certificate)
    }
  }

  const getAllCertificates = async ({ query }: ApiParams) => {
    const { data } = await certificateService.getAll({ query: '' })
    console.log(data)
  }

  return {
    form,
    getAllCertificates,
    getCertificate,
    certificateData
  }
}
