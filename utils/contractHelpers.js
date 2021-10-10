import { ethers } from 'ethers'
import { getGachaponAddress, getCustumeAddress } from 'utils/addressHelpers'
import gachaponAbi from 'config/abi/gachapon.json'
import { simpleRpcProvider } from 'utils/providers'
import bep20Abi from 'config/abi/erc20.json'
import custumeAbi from 'config/abi/custume.json'

const getContract = (abi, address, signer) => {
  return new ethers.Contract(address, abi, signer || simpleRpcProvider)
}

export const getBep20Contract = (address, signer) => {
  return getContract(bep20Abi, address, signer)
}

export const getGachaponContract = (signer) => {
  return getContract(gachaponAbi, getGachaponAddress(), signer)
}

export const getCustomeContract = (signer) => {
  return getContract(custumeAbi, getCustumeAddress(), signer)
}
