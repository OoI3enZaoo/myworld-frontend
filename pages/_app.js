import { createGlobalStyle } from 'styled-components'
import useEagerConnect from 'hooks/useEagerConnect'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from 'utils/web3React'
import { MoonProvider } from 'context/MoonContext'
import 'antd/dist/antd.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', sans-serif !important;
    font-weight: normal;
    overflow-x: hidden;
    line-height: 1.5;
  }
  html, body {
    height: 100vh;
  }
  .ant-drawer-body {
    padding: 0;
  }
  .ant-tabs-nav-list {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .ant-tabs-tab {
    width: -webkit-fill-available;
    text-align: center;
    font-weight: bold;
    width: 100%;
    display: block;
  }

  .ant-list-item-meta-title {
    margin-bottom: 8px;
  }

  .ant-tabs-nav {
    margin: 0 !important;
  }

  .ant-tabs-content {
    max-height: 75vh;
    overflow: hidden auto;
  }

  .ant-tabs-nav-operations {
    display: none;
  }

  ::-webkit-scrollbar {
      width: 10px;
  }
  
  ::-webkit-scrollbar-track {
      background-color: #ebebeb;
      -webkit-border-radius: 10px;
      border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: #6d6d6d; 
  }
  .ant-drawer-header {
    height: 80px;
  }
  .ant-tabs-nav-operations {
    display: none;
  }
`

function EagerConnect({ children }) {
  useEagerConnect()
  return (
    <div>
      {children}
    </div>
  )
}

export default function App({ Component, pageProps }) {
    return (
    <>
        <GlobalStyle />
        <Web3ReactProvider getLibrary={getLibrary}>
          <EagerConnect>
            <MoonProvider>
              <Component {...pageProps} />
            </MoonProvider>
          </EagerConnect>
        </Web3ReactProvider>
    </>
  )
}
