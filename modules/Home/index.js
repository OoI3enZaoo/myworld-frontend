import MainLayout from 'layouts'
import styled from 'styled-components'
import { maxWidth } from 'utils/breakpoint'

const Wrapper = styled('div')`
  width: 100%;
  height: calc(120vh);
  overflow-y: auto;
`

const MainImage = styled('img')`
  width: -webkit-fill-available;
`

const HomeModule = () => {
  return (
    <MainLayout>
      <Wrapper>
        <MainImage src='/images/pic01.png' />
      </Wrapper> 
    </MainLayout>
  )
}

export default HomeModule
