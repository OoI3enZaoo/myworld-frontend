import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { Button } from 'antd'
// import useTokenBalance from 'hooks/useTokenBalance'
// import { getMoonAddress } from 'utils/addressHelpers'
import { ethersToSerializedBigNumber } from 'utils/bigNumber'
import useMoon from 'hooks/useMoon'
import { useEffect } from 'react'

const IndexPage = () => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  // const { balance } = useTokenBalance(getMoonAddress())
  const { balance } = useMoon()

  // useEffect(() => {
  //   fetchBalance()
  // }, [])

  console.log('moon balance', ethersToSerializedBigNumber(balance))
  return (
    <>
      <Button onClick={() => login()}>login</Button>
      <Button onClick={() => logout()}>logout</Button>
      <div>index page {account}</div>
    </>
  )
}

export default IndexPage
