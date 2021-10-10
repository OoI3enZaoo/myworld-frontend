import { useMarketplaceContract } from 'hooks/useContract'
import MainLayout from 'layouts'
import styled from 'styled-components'

const Wrapper = styled('div')`
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: auto;
`

const MarketPlaceModule = () => {
  const marketplaceContract = useMarketplaceContract()
  console.log('marketplaceContract', marketplaceContract)
  return (
    <MainLayout>
      <Wrapper>
          MarketPlaceModule 
      </Wrapper>
    </MainLayout>
  )
}

export default MarketPlaceModule
