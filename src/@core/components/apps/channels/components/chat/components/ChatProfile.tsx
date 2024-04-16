import React, { useMemo, useState } from 'react'
import { Avatar, Badge, Box, ListItemText, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { Chat, ChatSidebarLeftType } from 'src/types/apps/chatTypes'
import { UserDataType } from 'src/context/types'
import { AccountGroup } from 'mdi-material-ui'

import MuiAvatar from '@mui/material/Avatar'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { renderClient } from 'src/@core/components/common/renderClient'

interface Props {
  chat: Chat
  user: UserDataType
  activeCondition: Boolean
  statusObj: ChatSidebarLeftType['statusObj']
  getInitials: (val: string) => string
}

const ChatProfile: React.FC<Props> = ({ chat, user, activeCondition, getInitials, statusObj }) => {
  let name: string = 'TEMP'
  let profile_picture
  // : string | any = null
  let fullName: string | null | ''

  if (chat.name === 'ONE_TO_ONE') {
    const participant = chat?.participants.find((participant: any) => participant.userId !== user.id)
    name = `${participant?.user?.first_name} ${participant?.user?.last_name}`
    profile_picture = participant?.user?.profile_picture || null
  } else {
    name = chat.name
    profile_picture = chat?.participants?.map((item: any) => item?.user?.profile_picture) || null
  }

  fullName = chat?.participants[0]?.user?.first_name + ' ' + chat?.participants[0]?.user?.last_name
  let [firstName, lastName] = fullName.split(' ')

  return (
    <ListItemAvatar sx={{ m: 0 }}>
      <Badge
        overlap='circular'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        badgeContent={
          <Box
            component='span'
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              color: `${statusObj[chat.status]}.main`,
              background: (theme: Theme) => (activeCondition ? theme.palette.customColors.themeColor : ''),
              boxShadow: (theme: Theme) =>
                `0 0 0 2px ${!activeCondition ? theme.palette.background.paper : theme.palette.common.white}`
            }}
          />
        }
      >
        <Avatar alt='avatar' src={profile_picture as string}>
          {firstName?.charAt(0) + lastName?.charAt(0)}
        </Avatar>
      </Badge>
    </ListItemAvatar>
  )
}

export default ChatProfile

{
  /* <ListItemAvatar sx={{ m: 0 }}>
                  <Badge
                    overlap='circular'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    badgeContent={
                      <Box
                        component='span'
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          color: `${statusObj[chat.status]}.main`,
                          backgroundColor: `${statusObj[chat.status]}.main`,
                          boxShadow: (theme: Theme) =>
                            `0 0 0 2px ${!activeCondition ? theme.palette.background.paper : theme.palette.common.white
                            }`
                        }}
                      />
                    }
                  >
                    <ChatProfile chat={chat} user={user} activeCondition={activeCondition} getInitials={getInitials} />
                  </Badge>
                </ListItemAvatar> */
}
