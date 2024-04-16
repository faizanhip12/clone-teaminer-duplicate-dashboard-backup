// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

import { ModalType } from 'src/types'
import Link from 'next/link'
import { Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { add, format, formatDistanceToNow } from 'date-fns'
import { textOverflow } from 'src/@core/helper/text'

const DeleteAlert = ({
  title = 'records',
  type = ModalType.DEFAULT,
  fullEvent
}: {
  title?: string
  type?: ModalType
  fullEvent: any
}) => {
  // ** hooks
  const { isModalOpen, handleModal, modalType } = useToggleDrawer()
  const handleClose = () => handleModal(null)
  const { push } = useRouter()
  const theme = useTheme()

  return (
    <Dialog
      open={isModalOpen && modalType === type}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' minWidth={500} color={theme.palette.customColors.white}>
        {title}
      </DialogTitle>
      <DialogContent>
        {fullEvent?._def?.extendedProps?.contentType === 'STREAM' &&
        fullEvent?._def?.extendedProps?.playlistId !== null &&
        fullEvent?._def?.extendedProps?.videoId !== null ? (
          <>
            <DialogContentText id='alert-dialog-description' color={theme.palette.customColors.white}>
              Event Title: {fullEvent?._def?.title}
            </DialogContentText>
            <DialogContentText id='alert-dialog-description' color={theme.palette.customColors.white}>
              Event Description:{' '}
              {textOverflow(fullEvent?._def?.extendedProps?.description as string, 25) || 'Description Here'}
            </DialogContentText>
            <Typography color={theme.palette.customColors.white}>
              Join This Live Event
              <br />
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  marginTop: '20px'
                }}
                onClick={() => {
                  push(
                    `/course/${fullEvent?._def?.extendedProps?.playlistId}/video/${fullEvent?._def?.extendedProps?.videoId}`
                  )
                  handleModal(null)
                }}
              >
                Join Meeting
              </Button>
            </div>
          </>
        ) : fullEvent?._def?.extendedProps?.eventType === 'SCHEDULED' &&
          fullEvent?._def?.extendedProps?.playlistId !== null &&
          !fullEvent?._def?.extendedProps?.videoId ? (
          <>
            <DialogContentText id='alert-dialog-description' color={theme.palette.customColors.white}>
              Event Title: {fullEvent?._def?.title}
            </DialogContentText>
            <DialogContentText id='alert-dialog-description' color={theme.palette.customColors.white}>
              Event Description: {fullEvent?._def?.extendedProps?.description || 'Description Here'}
            </DialogContentText>
            <DialogContentText id='alert-dialog-description' color={theme.palette.customColors.white}>
              This event is closed
            </DialogContentText>
          </>
        ) : (
          <>
            <DialogContentText id='alert-dialog-description' color={theme.palette.customColors.white}>
              Event Title: {fullEvent?._def?.title}
            </DialogContentText>
            <DialogContentText id='alert-dialog-description' color={theme.palette.customColors.white}>
              Event Description: {fullEvent?._def?.extendedProps?.description || 'Description Here'}
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleClose} variant='outlined' color='error'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAlert
