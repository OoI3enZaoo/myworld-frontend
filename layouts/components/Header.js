import styled from 'styled-components'
import Link from 'next/link'

const NavBar = styled('div')`
  height: 56px;
  background-color: #945745;
  background-image: url(/images/bg_navigate_desktop.svg);
  background-repeat: repeat;
  background-size: cover;
  background-position: top;
  box-shadow: 0 1px 20px #764839;
  justify-content: center;
  border-bottom: 4px solid #764839;
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
`


const Container = styled('div')`
  display: flex;
  width: 100%;
`

const Menus = styled('ul')`
  display: flex;
  padding: 0 32px;
  align-items: center;
  width: 100%;
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
  a {
    color: #fff;
    text-decoration: none;
  }
`

const Header = () => {
  return (
    <NavBar>
      <Wrapper>
        <Logo></Logo>
        <MenuWrapper>
          <Container>
            <Menus>
              <Menu>
                <Link href='#'>
                  <a>Home</a>
                </Link>
              </Menu>
              <Menu>
                <Link href='#'>
                  <a>Marketplace</a>
                </Link>
              </Menu>
              <Menu>
                <Link href='#'>
                  <a>Gachapon</a>
                </Link>
              </Menu>
            </Menus>
          </Container>
        </MenuWrapper>
      </Wrapper>
    </NavBar>
  )
}

export default Header