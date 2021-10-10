const ChainId = {
  MAINNET: 56,
  TESTNET: 97
}

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com',
}

export const BASE_URL = 'https://pancakeswap.finance'

export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]

export const BASE_LEPRICON_SCAN_URL = 'https://explorer.leprichain.blockwell.ai'