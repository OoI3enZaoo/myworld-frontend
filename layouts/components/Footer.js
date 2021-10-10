import styled from 'styled-components'
import { Space } from 'antd'
import { Text } from 'components'
import Link from 'next/link'

const Wrapper = styled('div')`
  position: relative;
`


const BgFooter = styled('img')`
  width: -webkit-fill-available;
`

const FooterContent = styled('div')`
  background-color: #3c9cb4;
  margin: 0;
  padding: 0;
  width: 100%;
`
  
const FooterContainer = styled('div')`
  max-width: 1200px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  a {
    color: white;
  }
`


const FooterComponent = () => {
  return (
    <Wrapper>
      <BgFooter src='/images/bg_footer.png' />
      <FooterContent>
        <FooterContainer>
          <Space size={32}>
            <Link href='#'>
              <a>Talk with us</a>
            </Link>
            <Space size={16}>
              <img src='/images/twitter.png' width='24px' style={{ cursor: 'pointer' }} />
              <img src='/images/facebook.png' width='24px' style={{ cursor: 'pointer' }} />
              <img src='/images/discord.png' width='24px' style={{ cursor: 'pointer' }} />
            </Space>
          </Space>
        </FooterContainer>
      </FooterContent>
    </Wrapper>
  )
}

export default FooterComponent
