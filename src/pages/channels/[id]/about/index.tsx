// @ts-nocheck
import { Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
// import CKeditor from 'src/@core/components/apps/playlist/components/CKEditor'
const CKeditor = dynamic(() => import('src/@core/components/apps/channels/components/AboutEditor'), {
  ssr: false // Set ssr to false to avoid server-side rendering for this component
})
import { useChannels } from 'src/@core/hooks/apps/useChannels'

// ** Component Imports
import ChannelLayout from 'src/@core/layouts/ChannelLayout'
import UserLayout from 'src/layouts/UserLayout'

const Page = () => {
  // Hooks

  const {
    getChannelsAbout,
    store: { entity }
  } = useChannels(null)

  const {
    query: { id }
  } = useRouter()

  useEffect(() => {
    getChannelsAbout(id as any)
  }, [])

  const [editorLoaded, setEditorLoaded] = useState<boolean>(false)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  return (
    <>
      <Typography variant='h5' mb={5}>
        {entity?.name}'s About
      </Typography>
      <CKeditor editorLoaded={editorLoaded} />
    </>
  )
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <ChannelLayout>{page}</ChannelLayout>
  </UserLayout>
)
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'channels-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page
