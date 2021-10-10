export const ConnectorNames = {
  Injected: 'injected',
  WalletConnect: 'walletconnect',
  BSC: 'bsc'
}

const connectors = [
  {
    title: 'Metamask',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'TrustWallet',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'MathWallet',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'TokenPocket',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'WalletConnect',
    connectorId: ConnectorNames.WalletConnect
  },
  {
    title: 'Binance Chain Wallet',
    connectorId: ConnectorNames.BSC
  },
  {
    title: 'SafePal Wallet',
    connectorId: ConnectorNames.Injected
  }
]

export default connectors

export const connectorLocalStorageKey = 'connectorId'
