// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
// import { Dispatch } from 'redux'
import { SendMsgParamsType } from 'src/types/apps/chatTypes'

import { ApiParams } from 'src/types/api'
import { Redux } from 'src/store'
import { chatService } from 'src/services'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

interface ConversationParams {
  name: string
  participants: string[]
  status?: 'idle' | 'pending' | 'success' | 'error'
}

// Api Error
const ApiError = (error: any, dispatch: any, rejectWithValue: (reasaon: string) => void) => {
  dispatch(appChatSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  try {
    const response = await axios.get('/apps/chat/users/profile-user')
    return response.data
  } catch (error) { }
})

// ** Fetch Chats & Contacts
// export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
//   const response = await axios.get('/apps/chat/chats-and-contacts')
//   return response.data
// })

export const fetchChatsContacts = createAsyncThunk(
  'appChat/fetchChatsContacts',
  // @ts-ignore
  async (id?: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appChatSlice.actions.handleStatus('pending'))
      const response = await chatService.getAll(id as string)
      dispatch(appChatSlice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// Get All Statuses

export const updateStatusOfAUser: any = createAsyncThunk(
  'appChat/updateStatusOfAUser',
  async ({ data }: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appChatSlice.actions.handleStatus('pending'))
      const response = await chatService.updateStatus(data.id, data?.status)
      dispatch(appChatSlice.actions.handleStatus('success'))
      toast.success("Updated Successfully")
      data.setIsUpdate(true)
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Select Chat
export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (chat: any, { dispatch }: { dispatch: Dispatch<any> }) => {
    return chat
  }
)

export const startConversation = createAsyncThunk(
  'appChat/startConversation',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appChatSlice.actions.handleStatus('pending'))
      const response = await chatService.startConversation(id)
      dispatch(appChatSlice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const conversationStart = createAsyncThunk(
  'appChat/conversationStart',
  async (participants: ConversationParams | any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appChatSlice.actions.handleStatus('pending'))
      const response = await chatService.conversationStart(participants)
      dispatch(appChatSlice.actions.handleStatus('success'))
      toast.success("Added to chat successfully")
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Send Msg
export const sendMsg = createAsyncThunk(
  'appChat/sendMsg',
  async (data: { data: SendMsgParamsType }, { dispatch, rejectWithValue }) => {
    try {
      // @ts-ignore
      let id = data.id
      // @ts-ignore
      delete data.id
      const response = await chatService.sendMsg(id, data)
      return response.data
    } catch (error) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const deleteChat = createAsyncThunk('appChat/delete', async (id: string, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appChatSlice.actions.handleStatus('pending'))
    const response = await chatService.delete(id)
    // @ts-ignore
    dispatch(fetchChatsContacts())
    dispatch(appChatSlice.actions.handleStatus('success'))
    toast.success("Deleted Successfully")
    dispatch(appChatSlice.actions.removeSelectedChat())
    return response.data
  } catch (error) {
    return ApiError(error, dispatch, rejectWithValue)
  }
})

export const deleteChannelChat = createAsyncThunk('appChat/deleteChannelChat', async ({ channelId, id }: { channelId: string, id: string }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appChatSlice.actions.handleStatus('pending'))
    const response = await chatService.delete(id)
    dispatch(fetchChatsContacts(channelId))
    dispatch(appChatSlice.actions.handleStatus('success'))
    toast.success("Deleted Successfully")
    dispatch(appChatSlice.actions.removeSelectedChat())
    return response.data
  } catch (error) {
    return ApiError(error, dispatch, rejectWithValue)
  }
})

export const blockChat = createAsyncThunk('appChat/blockChat', async ({ id, blockedUser }: { id?: string, blockedUser: {} }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appChatSlice.actions.handleStatus('pending'))
    const response = await chatService.block(id as string, blockedUser)
    // @ts-ignore
    dispatch(fetchChatsContacts())
    dispatch(appChatSlice.actions.handleStatus('success'))
    toast.success(`${response.data.data.conversation.status === "BLOCK" ? "Block" : "Unblock"} Successfully`)
    return response.data
  } catch (error) {
    return ApiError(error, dispatch, rejectWithValue)
  }
})

export const blockChannelChat = createAsyncThunk('appChat/blockChannelChat', async ({ channelId, id, blockedUser }: { channelId?: string, id?: string, blockedUser: {} }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(appChatSlice.actions.handleStatus('pending'))
    const response = await chatService.block(id as string, blockedUser)
    dispatch(fetchChatsContacts(channelId as string | any))
    dispatch(appChatSlice.actions.handleStatus('success'))
    toast.success(`${response.data.data.conversation.status === "BLOCK" ? "Block" : "Unblock"} Successfully`)
    return response.data
  } catch (error) {
    return ApiError(error, dispatch, rejectWithValue)
  }
})

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: null,
    contacts: null,
    userProfile: null,
    selectedChat: null,
    conversation: [],
    status: 'idle',
    userStatuses: [],
  },
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    removeSelectedChat: state => {
      state.selectedChat = null
    },
    eventMsgListener: (state: any, action) => {
      state.conversation = [...state.conversation, action?.payload]
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload
    })
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      const { data } = action?.payload
      state.contacts = data?.contacts.map((user: any) => {
        return {
          fullName: `${user?.first_name} ${user?.last_name}`,
          ...user
        }
      })
      state.chats = data?.chats?.map((user: any) => {
        return {
          fullName: `${user?.first_name} ${user?.last_name}`,
          ...user
        }
      })
    })
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
    })
    builder.addCase(blockChat.fulfilled, (state, action) => {
      const { data } = action.payload
      state.selectedChat = data?.conversation
    })
    builder.addCase(blockChannelChat.fulfilled, (state, action) => {
      const { data } = action.payload
      state.selectedChat = data?.conversation
    })
    builder.addCase(startConversation.fulfilled, (state, action) => {
      const { data } = action?.payload
      state.conversation = data?.sendMsg
    })
    // builder.addCase(updateStatusOfAUser.fulfilled, (state, action) => {
    //   const { data } = action?.payload
    //   console.log(data);

    //   // state.conversation = data?.sendMsg
    // })
    // builder.addCase(conversationStart.fulfilled, (state, action) => {
    //   const { data } = action?.payload
    //   state.selectedChat = data
    // })
  }
})

export const { removeSelectedChat } = appChatSlice.actions

export default appChatSlice.reducer
