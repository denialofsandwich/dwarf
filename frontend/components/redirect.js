import React from 'react';
import { useRouter } from 'next/router'

export function Redirect({
  href="/",
}) {
  const router = useRouter()
  React.useEffect(() => {
    router.replace(href)
  }, [])

  return <div />
}

export default Redirect