import { useMarketplaceContract, useCustomeContract } from 'hooks/useContract'
import MainLayout from 'layouts'
import styled from 'styled-components'
import { Tabs, Layout, Menu, Skeleton } from 'antd'
import { useState, useEffect } from 'react'
import { ethersToSerializedBigNumber, ethersToBigNumber } from 'utils/bigNumber'
import { getMarketplaceAddress } from 'utils/addressHelpers'
import marketplaceAbi from 'config/abi/marketplace.json'
import BigNumbers from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { Card, Row, Col } from 'antd'
import { Balance, Text } from 'components'

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;

const Wrapper = styled('div')`
  width: 100%;
  min-height: calc(100vh - 56px);
`

const CardContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`


const Container = styled('div')`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 0;
`

const CustumCard = styled(Card)`
  cursor: pointer;
`

const MarketPlaceModule = () => {
  const marketplaceContract = useMarketplaceContract()
  const custumeContract = useCustomeContract()
  const [custumes, setCustumes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCustumes()
  }, [marketplaceContract])

  const fetchCustumes = async () => {
    try {
      setIsLoading(true)
      let numberOfItems = await marketplaceContract.sizeOfItems(custumeContract.address)
      const items = ethersToSerializedBigNumber(numberOfItems)

      let _custumes = []
      for (let i = 0; i < items; i++) {
        let item = await marketplaceContract.itemByIndex(custumeContract.address, i);
        const tokenId = ethersToSerializedBigNumber(new BigNumbers(item.tokenId.toString()))
        let priceRes = await marketplaceContract.priceOf(custumeContract.address, tokenId)
        const price = ethersToSerializedBigNumber(new BigNumbers(priceRes.toString()))
        let appearanceRes = await custumeContract.appearanceOf(tokenId)
        const appearance = ethersToSerializedBigNumber(new BigNumbers(appearanceRes.toString()))
        const appearanceSrc = `/images/costumes/${appearance}.png`
        const obj = {
          tokenId,
          appearanceSrc,
          price: getBalanceNumber(price),
        }
        _custumes.push(obj)
      }
      setCustumes(_custumes)

     
      // setCustumes()
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <MainLayout>
      <Wrapper>

        <Container>
          <Content style={{ margin: '24px 16px 0' }}>
            {
              isLoading ? 
              <Skeleton paragraph={{ rows: 12 }} /> 
              :
                <Row gutter={[24, 24]} style={{ marginTop: '34px' }}>
                  {
                    custumes.map((item, index) => (
                      <Col xs={12} sm={8} md={6} lg={4} key={index}>
                        <CustumCard>
                          <CardContent>
                            <img src={item.appearanceSrc} width='150px' />
                            <Text mt='16px' bold>Costume: #{item.tokenId}</Text>
                            <Balance
                              mt='8px'
                              value={item.price}
                              unit=' $MOON'
                              decimals={2}
                            />
                          </CardContent>
                        </CustumCard>
                      </Col>
                    ))
                  }
                </Row>
            }
          </Content>
        </Container>
      </Wrapper>
    </MainLayout>
  )
}

export default MarketPlaceModule
