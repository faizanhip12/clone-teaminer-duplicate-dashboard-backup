'use client'

import useToken from 'src/@core/hooks/apps/useToken'

const MessagingToken = () => {
  const [token, loading, error] = useToken()

  return (
    <div>
      <p>
        {token && <h1> Notification permission enabled 👍🏻 </h1>}
        {!token && <h1> Need notification permission ❗️ </h1>}

        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading token...</span>}
        {token && <span>Token:{token}</span>}
      </p>
    </div>
  )
}

export default MessagingToken
