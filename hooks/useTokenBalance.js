import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBep20Contract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'

export const FetchStatus = {
  NOT_FETCHED: 'not-fetched',
  SUCCESS: 'success',
  FAILED: 'failed'
}

const useTokenBalance = (tokenAddress) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED
  })
  const { account, library } = useWeb3React()
  const fetchBalance = async () => {
    try {
      const contract = getBep20Contract(tokenAddress, library)
      console.log('contract', contract)
      console.log('tokenAddress', tokenAddress)
      const res = await contract.balanceOf(account)
      console.log('fetchBalance', res)
      setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS })
    } catch (e) {
      setBalanceState((prev) => ({
        ...prev,
        fetchStatus: FAILED
      }))
    }
  }

  useEffect(() => {
    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, SUCCESS, FAILED])

  // return { fetchBalance, balanceState }
  return { balance: balanceState.balance, fetchBalance }
}

export default useTokenBalance
