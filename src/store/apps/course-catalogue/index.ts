// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { courseCatalogueService } from 'src/services'

// ** Types Imports
import { ICatalogue } from 'src/types/apps/course-catalogue'
import { Redux } from 'src/store'
import { ApiParams } from 'src/types/api'

interface InitialState {
  entities: ICatalogue[] | []
  entity: ICatalogue | {}
  total: number
  params: ApiParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: any, rejectWithValue: (reasaon: string) => void) => {
  dispatch(Slice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

export const QueryAction = createAsyncThunk('course-catalogue/query', async (query: string, { getState, dispatch }: Redux) => {
  dispatch(Slice.actions.handleQuery(query))
  return query
})

export const fetchOneAction = createAsyncThunk('course-catalogue/fetchOne', async (id: string, { dispatch, rejectWithValue }) => {
  try {
    dispatch(Slice.actions.handleStatus('pending'))
    const response = await courseCatalogueService.getById(id)
    dispatch(Slice.actions.handleStatus('success'))
    return response.data
  } catch (error) {
    return ApiError(error, dispatch, rejectWithValue)
  }
})

export const fetchAllAction = createAsyncThunk(
  'course-catalogue/fetchAll',
  async (params: ApiParams, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const { query } = params
      const response = await courseCatalogueService.getAll({ query })
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const addAction = createAsyncThunk(
  'course-catalogue/add',
  async (data: { [key: string]: number | string }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await courseCatalogueService.add(data)
      dispatch(fetchAllAction({ query: "" }))
      toast.success('Added successfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const updateAction = createAsyncThunk(
  'course-catalogue/update',
  async ({ id, data }: { id: string; data: ICatalogue }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await courseCatalogueService.update(id, data)
      dispatch(fetchAllAction({ query: "" }))
      toast.success('updated successfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const deleteAction = createAsyncThunk(
  'course-catalogue/delete',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(Slice.actions.handleStatus('pending'))
      const response = await courseCatalogueService.delete(id)
      dispatch(fetchAllAction({ query: "" }))
      toast.success('deleted successfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const Slice = createSlice({
  name: 'course-catalogue',
  initialState: {
    entities: [],
    entity: {},
    total: 0,
    params: {}
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleQuery: (state, action) => {
      state.params.query = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload

      state.entities = data.entities || []
      state.total = data.entities.length || 0
      // state.entities = []
      // state.total = 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data.entity || {}
    })
  }
})

export default Slice.reducer
