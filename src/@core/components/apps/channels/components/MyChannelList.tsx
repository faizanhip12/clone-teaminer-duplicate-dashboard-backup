import { Box, Skeleton, Typography } from '@mui/material'
import React from 'react'
import useAsync from 'src/@core/hooks/useAsync'
import { ChannelService } from 'src/services'
import { IChannels } from 'src/types/apps/channels'
import { useAuth } from 'src/hooks/useAuth'
import { textOverflow } from 'src/@core/helper/text'
import { useTheme } from '@mui/material/styles'
import { renderClient } from 'src/@core/components/common/renderClient'
import toast from 'react-hot-toast'

const MyChannelList = ({ handleDropdownClose }: any) => {
  const auth = useAuth()

  const theme = useTheme()

  const { status, data } = useAsync(ChannelService.getByUser)

  const switchChannel = (id: number) => {
    toast.success("Channel Switching In Progress...")
    handleDropdownClose()
    auth.handleSwitchChannel(id)
  }

  const currentActiveChannel = auth?.user?.activeChannel?.channel?.id

  return (
    <>
      {auth?.user?.role?.code === 'SUPER_ADMIN' || auth?.user?.role?.code === 'STUDENT' ? null : (
        <>
          <Typography
            noWrap
            component='a'
            variant='subtitle2'
            sx={{ color: 'text.primary', textDecoration: 'none', margin: 'auto', marginTop: 1, marginBottom: 0, height: "100%" }}
          >
            Switch Channel
          </Typography>
          <Box borderBottom={`2px solid ${theme.palette.customColors.bodyBg}`} width={"100%"} />
        </>
      )}
      {status === 'pending' && auth.user?.role.code === 'TEACHER' ? (
        <Skeleton
          variant='rounded'
          width={'100%'}
          height={'5vh'}
          sx={{ bgcolor: theme.palette.customColors.skeletongrey }}
        />
      ) : (
        data?.data?.entities?.map((item: IChannels) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              cursor: 'pointer',
              margin: 2,
              padding: 2,
              width: '95%',
              borderRadius: 4
            }}
            onClick={
              currentActiveChannel === item?.id ? () => toast.error("Already On This Channel")
                : data?.data?.entities?.length > 1 ? () => switchChannel(item?.id as number)
                  : () => toast.error('You only have a single channel')
            }
            key={item.id}
          >
            {renderClient(item?.thumnail_url, item?.name)}
            <Typography
              noWrap
              component='a'
              variant='subtitle2'
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                fontWeight:
                  data?.data?.entities?.length > 1 ? (currentActiveChannel === item?.id ? 'bold' : 'normal') : null,
                // borderBottom: data?.data?.entities?.length > 1 && (currentActiveChannel === item?.id) ? `2px solid ${theme.palette.customColors.border}` : "none"
                borderBottom:
                  data?.data?.entities?.length > 1 ? (currentActiveChannel === item?.id ? `2px solid ${theme.palette.customColors.bodyBg}` : 'none') : null,
                // data?.data?.entities?.length > 1
                //   ? currentActiveChannel === item?.id
                //     ? `2px solid ${theme.palette.customColors.border}`
                //     : 'none'
                //   : 'none'
              }}
            >
              {textOverflow(item?.name as string, 15)}
            </Typography>
          </Box>
        ))
      )}
    </>
  )
}

export default MyChannelList
