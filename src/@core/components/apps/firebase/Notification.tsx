'use client'
import useMessaging from 'src/@core/hooks/apps/useMessaging'
import { useState } from 'react'

function Notification() {
  const { notifications } = useMessaging()
  console.log('====================================')
  console.log(notifications)
  console.log('====================================')

  return (
    <div>
      {/* {
                show ? (
                    <>
                        <h1>{notification.title}</h1>
                        <h4>{notification.body}</h4>
                    </>
                ) : null
            } */}
    </div>
  )
}

export default Notification
