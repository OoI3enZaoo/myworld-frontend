import tokens from 'config/constants/tokens'
import addresses from 'config/constants/contracts'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const getAddress = (address) => {
  const chainId = publicRuntimeConfig.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[4]
}

export const getMoonAddress = () => {
  return getAddress(tokens.moon.address)
}

export const getGachaponAddress = () => {
  return getAddress(addresses.gachapon)
}

export const getCustumeAddress = () => {
  return getAddress(addresses.custume)
}