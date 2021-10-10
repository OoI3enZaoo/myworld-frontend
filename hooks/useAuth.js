import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
  InjectedConnector
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import { message } from 'antd'
import { connectorLocalStorageKey, ConnectorNames } from 'config/connectors'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const injected = new InjectedConnector({
  supportedChainIds: [publicRuntimeConfig.REACT_APP_CHAIN_ID]
})

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(
    async (connectorID = ConnectorNames.Injected) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        console.log('injected', injected)
        window.localStorage.setItem(connectorLocalStorageKey, connectorID)
        await activate(injected)
        await activate(injected, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            console.log('should setup network')
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              message.error('Provider Error No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector
                walletConnector.walletConnectProvider = null
              }
              message.error('Authorization Error - Please authorize to access your account')
            } else {
              message.error(`${error.name} - ${error.message}`)
            }
          }
        })
      } else {
        message.error('Unable to find connector - The connector config is wrong')
      }
    },
    [activate]
  )

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
    window.localStorage.removeItem(connectorLocalStorageKey)
  }, [deactivate])

  return { login, logout }
}

export default useAuth
