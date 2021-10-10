
import React, { createContext, useState, useEffect, useCallback } from 'react'
import { getMoonAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
// import { getBep20Contract } from 'utils/contractHelpers'
import { useWeb3React } from '@web3-react/core'
import { useTokenContract } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

export const MoonContext = createContext({})

export const MoonProvider = ({ children }) => {
  const [balance, setBalance] = useState(0)
  const { account, library } = useActiveWeb3React()
  const moonAddress = getMoonAddress()
  const contract = useTokenContract(moonAddress)

  const fetchBalance = useCallback(async () => {
    try {
      if (account) {
        const res = await contract.balanceOf(account)
        setBalance(new BigNumber(res.toString()))
        return new BigNumber(res.toString())
      }
    } catch (e) {
      console.error('***************************0', e)
    }
  }, [account, moonAddress, library])
  
  useEffect(() => {
    if (account) {
      fetchBalance()
    }
  }, [account, moonAddress, contract, setBalance])

  return (
    <MoonContext.Provider value={{
      fetchBalance,
      balance
    }}
    >
      {children}
    </MoonContext.Provider>
  )
}
