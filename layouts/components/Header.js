import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import { maxWidth } from 'utils/breakpoint'
import { AlignRightOutlined, CloseOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { useState } from 'react'

const NavBar = styled('div')`
  height: 56px;
  background-color: #3c9cb4;
  background-image: url(/images/bg_navigate_desktop.png);
  background-repeat: repeat;
  background-size: cover;
  background-position: top;
  box-shadow: 0 1px 20px #3c9cb4;
  justify-content: center;
  border-bottom: 4px solid #3c9cb4;
  display: flex;
`

const Wrapper = styled('div')`
  display: flex;
  flex: 1;
  padding: 0 16px;
  max-width: 1200px;
`

const Logo = styled('div')`

`

const MenuWrapper = styled('div')`
  display: flex;
  padding: 0 32px;
  align-items: center;
  width: 100%;
  ${maxWidth.sm`
    ${props => props.menuActive === true ?`
      width: 100%;
      top: 53px;
      padding: 0;
      position: absolute;
      z-index: 100;
      height: calc(100vh - 53px);
      background-color: rgba(0,0,0,.15);
      right: 0;
      display: flex;
      justify-content: flex-end;
    ` : `
        width: unset;
        top: 53px;
        display: none;
        padding: 0;
        position: absolute;
        z-index: 100;
        height: calc(100vh - 53px);
        background-color: rgba(0,0,0,.15);
        right: 0;
        justify-content: flex-end;
    `}
  `}
`


const Container = styled('div')`
  display: flex;
  width: 100%;
  ${maxWidth.sm`
    
    height: 100%;
    background-color: #3c9cb4;
    transition: all .5s ease-in-out;
    background: url(/images/bg_navigate.png);
    ${props => props.menuActive === true ? `
      width: 250px;
    ` : `
      width: 0;
    `}
  `}
`

const Menus = styled('ul')`
  display: flex;
  padding: 0 32px;
  align-items: center;
  width: 100%;
  margin: 0;
  ${maxWidth.sm`
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    padding: 0;
  `}
`

const Menu = styled('li')`
  list-style: none;
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  flex: 1;
  text-align: center;
  cursor: pointer;
  margin-top: 2px;
  ${props => props.active === true && `
      a {
        color: #FFB500 !important;
      }
  `};
  a {
    color: #fff;
    text-decoration: none;
  }
  ${maxWidth.sm`
    list-style: none;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    padding: 16px 0;
    width: 100%;
    text-align: center;
    cursor: pointer;
  `}
`

const Hammerber = styled('div')`
  display: none;
  ${maxWidth.sm`
    display: block;
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    right: 16px;
    top: 10px;
    z-index: 3;
  `}
`

const Header = () => {
  const router = useRouter()
  const { account } = useWeb3React()
  const { login, logout } = useAuth()

  const menus = [
    {
      name: 'Home',
      key: 'home',
      href: '/'
    },
    {
      name: 'Marketplace',
      key: 'marketplace',
      href: '/marketplace'
    },
    {
      name: 'Gachapon',
      key: 'gachapon',
      href: '/gachapon'
    },
    // {
    //   name: 'My Account',
    //   key: 'myaccount',
    //   href: '/account'
    // }
  ]
  const [menuActive, setMenuActive] = useState(false)
  return (
    <NavBar>
      <Wrapper>
        {/* <Logo>
          Moon
        </Logo> */}
        <MenuWrapper menuActive={menuActive}>
          <Container menuActive={menuActive}>
            <Menus>
              {
                menus.map((item, index) => (
                  <Menu key={index} active={item.href === router.asPath}>
                    <Link href={item.href}>
                      <a>{item.name}</a>
                    </Link>
                  </Menu>
                ))
              }
              <Menu>
                <Button
                  shape='round'
                  type='primary'
                  style={{ width: '150px' }}
                  onClick={() => {
                    if (account) {
                      logout()
                    } else {
                      login()
                    }
                  }}
                >{!account ? 'Connect wallet' : 'Logout'}</Button>
              </Menu>
            </Menus>
          </Container>
        </MenuWrapper>
        <Hammerber onClick={() => setMenuActive(!menuActive)}>
          {
            menuActive ?
            <CloseOutlined style={{ color: 'white' }} /> 
            :
              <AlignRightOutlined  style={{ color: 'white' }} />
          }
        </Hammerber>
      </Wrapper>
    </NavBar>
  )
}

export default Header