import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getCustomeContract,
  getGachaponContract
} from 'utils/contractHelpers'
import ERC20_ABI from 'config/abi/erc20.json'
import { getContract } from 'utils'

export const useERC20 = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}

function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export const useTokenContract = (tokenAddress, withSignerIfPossible) => {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export const useGachaponContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getGachaponContract(library.getSigner()), [library])
}

export const useCustomeContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getCustomeContract(library.getSigner()), [library])
}

