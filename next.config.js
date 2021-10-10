const withAntdLess = require('next-plugin-antd-less')

module.exports = withAntdLess({
  reactStrictMode: true,
  modifyVars: {
    '@primary-color': '#FFB500',
    '@border-radius-base': '4px',
    '@text-color': '#0D0101',
    '@btn-font-weight': '900'
  },
  publicRuntimeConfig: {
    REACT_APP_CHAIN_ID: process.env.REACT_APP_CHAIN_ID,
    USER_BRANCH: process.env.USER_BRANCH
  }
})
