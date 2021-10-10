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
  height: calc(100vh - 56px);
  overflow-y: auto;
`

const CardContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`


const MarketPlaceModule = () => {
  const marketplaceContract = useMarketplaceContract()
  const custumeContract = useCustomeContract()
  console.log('marketplaceContract', marketplaceContract)
  const [custumes, setCustumes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCustumes()
  }, [marketplaceContract])

  const fetchCustumes = async () => {
    try {
      setIsLoading(true)
      console.log('marketplaceContract.address', marketplaceContract.address)
      let numberOfItems = await marketplaceContract.sizeOfItems(custumeContract.address)
      console.log('numberOfItems', numberOfItems)
      const items = ethersToSerializedBigNumber(numberOfItems)
      console.log('items', items)

      let _custumes = []
      for (let i = 0; i < items; i++) {
        let item = await marketplaceContract.itemByIndex(custumeContract.address, i);
        console.log(item)
        const tokenId = ethersToSerializedBigNumber(new BigNumbers(item.tokenId.toString()))
        console.log('tokenId', tokenId)
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
      console.log('hello', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <MainLayout>
      <Layout>
        <Sider
          style={{ backgroundColor: 'white', borderRight: '1px solid #dcdcdc' }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Wrapper>
          <div>hello</div>
            </Wrapper>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <Tabs defaultActiveKey="1"  size='large'>
              <TabPane tab="Marketplace" key="1">
              {
                isLoading ? 
                <Skeleton /> 
                :
                  <Row gutter={[24, 24]}>
                    {
                      custumes.map((item, index) => (
                        <Col xs={12} lg={8} key={index}>
                          <Card>
                            <CardContent>
                              <img src={item.appearanceSrc} width='150px' />
                              <Balance
                                value={item.price}
                                unit=' MOON'
                                decimal={2}
                              />
                            </CardContent>
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
              }
              </TabPane>
              <TabPane tab="History" key="2">
                history page
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Layout>
    </MainLayout>
  )
}

export default MarketPlaceModule
