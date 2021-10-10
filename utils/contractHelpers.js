import { ethers } from 'ethers'
import { getGachaponAddress } from 'utils/addressHelpers'
import gachaponAbi from 'config/abi/gachapon.json'
import { simpleRpcProvider } from 'utils/providers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const getContract = (abi, address, signer) => {
  return new ethers.Contract(address, abi, signer || simpleRpcProvider)
}

export const getBep20Contract = (address, signer) => {
  return getContract(bep20Abi, address, signer)
}

export const getGachaponContract = (signer) => {
  return getContract(gachaponAbi, getGachaponAddress(), signer)
}
