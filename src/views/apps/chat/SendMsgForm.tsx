// ** React Imports
import { useState, SyntheticEvent, useContext } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icons Imports
import Microphone from 'mdi-material-ui/Microphone'
import Paperclip from 'mdi-material-ui/Paperclip'

// ** Types
import { SendMsgComponentType } from 'src/types/apps/chatTypes'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { startConversation } from 'src/store/apps/chat'
import { useAuth } from 'src/hooks/useAuth'
import { SocketContext } from 'src/context/SocketContext'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: 8,
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: 'space-between',
  backgroundColor: 'transparent'
}))

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 5, 5)
}))

const SendMsgForm = (props: SendMsgComponentType | any) => {
  // ** Props
  const { store, dispatch, sendMsg, data }: any = props

  // ** State
  const [msg, setMsg] = useState<string>('')

  const [status, setStatus] = useState<'idle' | 'pending' | 'success'>('idle')

  const { user } = useAuth()

  const { socket } = useContext(SocketContext)

  let conversationId = data?.id

  const handleSendMsg = async (e: SyntheticEvent) => {
    e.preventDefault()
    let data = {
      message: msg,
      id: conversationId
    }
    setStatus('pending')
    if (store && store.selectedChat && msg.trim().length) {
      const { payload } = await dispatch(sendMsg(data))
      if (payload?.statusCode === '10000') {
        socket.emit(
          'SEND_MESSAGE_ROOM',
          JSON.stringify({
            id: conversationId,
            user: user?.id,
            message: msg
          })
        )
      }
    }
    setStatus('success')
    setMsg('')
  }

  return (
    <Form onSubmit={handleSendMsg}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            value={msg}
            size='small'
            placeholder='Type your message here…'
            onChange={e => setMsg(e.target.value)}
            disabled={(store.selectedChat?.status === 'BLOCK' && store.selectedChat?.isBlocked) || store.selectedChat.status === 'BLOCK' && !store.selectedChat?.isBlocked}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <IconButton size='small' sx={{ mr: 1.5, color: 'text.primary' }}>
            <Microphone sx={{ fontSize: '1.375rem' }} />
          </IconButton>
          <IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 2.75, color: 'text.primary' }}>
            <Paperclip sx={{ fontSize: '1.375rem' }} />
            <input hidden type='file' id='upload-img' />
          </IconButton> */}
          <LoadingButton
            loading={status === 'pending'}
            disabled={status === 'pending' || (store.selectedChat?.status === 'BLOCK' && store.selectedChat?.isBlocked) || (store.selectedChat.status === 'BLOCK' && !store.selectedChat?.isBlocked)}
            loadingPosition='end'
            variant='contained'
            type='submit'
            sx={{ mb: 0, ml: 5 }}
          >
            Send
          </LoadingButton>
        </Box>
      </ChatFormWrapper>
    </Form>
  )
}

export default SendMsgForm
