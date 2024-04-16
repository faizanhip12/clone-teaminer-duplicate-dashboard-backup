import { Box, Grid, Skeleton, useTheme } from '@mui/material'
import * as React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import CommunityCard from 'src/@core/components/apps/communityPortal/Card'
import CommunityHeader from 'src/@core/components/apps/communityPortal/CommunityHeader'
import NoFeedFound from 'src/@core/components/apps/communityPortal/NoFeedFound'
import { useCommunityFeed } from 'src/@core/hooks/apps/useCommunityFeed'
import { RootState } from 'src/store'
import { ICommunityFeed } from 'src/types/apps/community-feed'

const Page = () => {
  const { getAllCommunityFeeds } = useCommunityFeed(null)

  React.useEffect(() => {
    getAllCommunityFeeds({ query: '' })
  }, [])

  const store = useSelector((state: RootState) => state?.communityFeed)

  const theme = useTheme()

  return (
    <>
      <Grid item xs={12} md={12} lg={12} sx={{ width: '100%', minWidth: '60%', maxWidth: '80%', margin: '0 auto' }}>
        <Box display={'block'} margin='0  auto'>
          <CommunityHeader />
        </Box>
        {store.status === 'success' ? (
          !store.entities.length ? (
            <NoFeedFound />
          ) : store.status === ('error' as any) ? (
            toast.error('An Error Occurred')
          ) : (
            store?.entities?.map((feeds: ICommunityFeed) => {
              return <CommunityCard feeds={feeds} key={feeds.feeds?.id} />
            })
          )
        ) : (
          <Box display={'block'} margin='0  auto' borderRadius={20}>
            <Skeleton
              variant='rectangular'
              sx={{ height: '30vh', width: '100%', background: theme.palette.customColors.skeletongrey }}
            />
          </Box>
        )}
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'community-page'
}

export default Page
